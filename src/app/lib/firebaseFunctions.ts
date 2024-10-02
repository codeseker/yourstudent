import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import cache from "@/app/lib/cache";
import firebaseData, {
  mapResponseToFirebaseData,
} from "@/app/lib/firebaseData";

// Upload Data
export async function addDataToDb(
  batchYear: string,
  sectionName: string,
  excelData: any
) {
  try {
    // Reference to the specific batch document
    const batchDocRef = doc(db, "batches", batchYear);
    await setDoc(batchDocRef, { created: true }, { merge: true });

    // Reference to the sections subcollection under the batch document
    const sectionDocRef = doc(collection(batchDocRef, "sections"), sectionName);
    await setDoc(sectionDocRef, { created: true }, { merge: true });

    // Loop through each student entry and store them in the students subcollection under the section
    for (const ele of excelData) {
      const mappedData = mapResponseToFirebaseData(ele);

      // Add student to the "students" subcollection under the respective section
      const studentDocRef = doc(
        collection(sectionDocRef, "students"),
        mappedData.regNo // Assuming regNo is a unique identifier for each student
      );
      await setDoc(studentDocRef, mappedData, { merge: true });
    }

    // Clear cache after updating
    cache.del("batches");
    return true;
  } catch (error) {
    console.error("Error adding data to Firestore:", error);
    return false;
  }
}

// get Batch data

export async function getBatchData(batch: string) {
  try {
    const batchDocRef = doc(db, "batches", batch);

    // Get the batch document
    const batchDoc = await getDoc(batchDocRef);

    if (!batchDoc.exists()) {
      return { message: "Batch not found", success: false };
    }

    // Reference to the sections subcollection
    const sectionsCollectionRef = collection(batchDocRef, "sections");

    // Get all sections in the batch
    const sectionsSnapshot = await getDocs(sectionsCollectionRef);

    const sectionsData = await Promise.all(
      sectionsSnapshot.docs.map(async (sectionDoc) => {
        const sectionName = sectionDoc.id;

        // Reference to the students subcollection within the section
        const studentsCollectionRef = collection(sectionDoc.ref, "students");

        // Get all students in the section
        const studentsSnapshot = await getDocs(studentsCollectionRef);

        // Return section information along with the student count and data
        return {
          sectionName: sectionName,
          studentCount: studentsSnapshot.size,
        };
      })
    );

    // Return the batch data along with all sections and their student counts
    return {
      message: "Batch data fetched successfully",
      success: true,
      batch: batchDoc.id,
      sections: sectionsData,
    };
  } catch (error: any) {
    return {
      message: "Error fetching batch data",
      success: false,
      error: error.message,
    };
  }
}

// get section data
export async function getSectionData(batchYear: string, sectionName: string) {
  try {
    // If not cached, fetch data from Firestore
    const sectionRef = collection(
      db,
      "batches",
      batchYear,
      "sections",
      sectionName,
      "students"
    );
    const sectionSnapshot = await getDocs(sectionRef);

    if (sectionSnapshot.empty) {
      return { success: false, message: "No students found for this section" };
    }

    const students = sectionSnapshot.docs.map((doc) => ({
      regNo: doc.data()[firebaseData.regNo],
      name: doc.data()[firebaseData.fullName],
      primaryEmail: doc.data()[firebaseData.primaryEmailId],
      cgpa: doc.data()[firebaseData.cgpa],
      section: doc.data()[firebaseData.section],
      id: doc.data()[firebaseData.regNo],
      mobileNumber: doc.data()[firebaseData.mobileNumber],
    }));
    return { success: true, message: "Section data fetched", students };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// get Student Details
export async function getStudentDetail(
  batch: string,
  section: string,
  regNo: string
) {
  try {
    const batchDocRef = doc(db, "batches", batch);

    const sectionDocRef = doc(batchDocRef, "sections", section);

    const studentDocRef = doc(sectionDocRef, "students", regNo);

    // Get the student's document
    const studentDoc = await getDoc(studentDocRef);

    // Check if the student's document exists
    if (!studentDoc.exists()) {
      return { message: "Student not found", success: false };
    }

    return {
      message: "Student Fetched Successfully",
      success: true,
      studentData: studentDoc.data(),
    };
  } catch (error: any) {
    return {
      message: "Error fetching student data",
      success: false,
      error: error.message,
    };
  }
}

export async function editDetail(batch: string, regNo: string, number: string) {
  try {
    const batchDocRef = doc(db, "batches", batch);

    const studentDocRef = doc(batchDocRef, "students", regNo);

    // Get the student's document
    const studentDoc = await getDoc(studentDocRef);

    // Check if the student's document exists
    if (!studentDoc.exists()) {
      return { message: "Student not found", success: false };
    }

    // Update the mobile number in the student's document
    await updateDoc(studentDocRef, {
      mobileNumber: number,
    });

    return { message: "Mobile number updated successfully", success: true };
  } catch (error: any) {
    return {
      message: "Error fetching or updating student data",
      success: false,
      error: error.message,
    };
  }
}

// Function to get the count of student documents for a given batch
export async function getStudentCount(batchYear: string) {
  const studentsCollection = collection(db, `batches/${batchYear}/students`);
  const studentsSnapshot = await getDocs(studentsCollection);
  return studentsSnapshot.size;
}

interface Student {
  id: string;
  batch: string;
  [key: string]: any; // To allow any other dynamic fields
}

export async function getAllStudents(name: string): Promise<Student[]> {
  try {
    const batchesRef = collection(db, "batches");
    const batchDocs = await getDocs(batchesRef);

    const batchYears: string[] = [];
    const matchedStudents: Student[] = [];

    batchDocs.forEach((doc) => {
      batchYears.push(doc.id);
    });

    for (const batchYear of batchYears) {
      const batchCollectionRef = collection(
        db,
        `batches/${batchYear}/students`
      );

      const q = query(
        batchCollectionRef,
        where("fullName", "==", name.toUpperCase())
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const studentData = doc.data() as DocumentData;
        matchedStudents.push({
          id: doc.id,
          batch: batchYear,
          ...studentData,
        });
      });
    }

    return matchedStudents;
  } catch (error) {
    console.error("Error querying students:", error);
    return [];
  }
}
