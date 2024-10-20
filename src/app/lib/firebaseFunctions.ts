import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
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

export async function getAllSections(batch: string) {
  try {
    const sectionsCollectionRef = collection(db, `batches/${batch}/sections`);
    const querySnapshot = await getDocs(sectionsCollectionRef);

    const sections = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return sections;
  } catch (error) {
    console.error("Error fetching sections: ", error);
    return [];
  }
}

export async function assignTeacher(
  batch: string,
  section: string,
  teacher: string
) {
  try {
    // Reference to the teacher's document
    const teacherDocRef = doc(db, "teachers", teacher);
    const teacherDoc = await getDoc(teacherDocRef);

    if (teacherDoc.exists()) {
      // If the teacher already exists, update the assigned batches
      const currentBatches = teacherDoc.data()?.assigned_batches || [];

      // Check if the batch already exists in the array
      const batchIndex = currentBatches.findIndex(
        (b: any) => b.batch === batch
      );

      if (batchIndex > -1) {
        // If the batch exists, update the sections array
        const sections = currentBatches[batchIndex].sections;
        if (!sections.includes(section)) {
          sections.push(section);
        }
      } else {
        // If the batch doesn't exist, add a new entry
        currentBatches.push({ batch, sections: [section] });
      }

      // Update the teacher's document with the modified batch info
      await updateDoc(teacherDocRef, { assigned_batches: currentBatches });
    } else {
      // If the teacher doesn't exist, create a new document
      const newTeacherData = {
        email: teacher, // Replace this with actual email
        role: "Teacher",
        assigned_batches: [{ batch, sections: [section] }],
      };

      await setDoc(teacherDocRef, newTeacherData);
    }

    return {
      message: "Teacher Assigned Succesfully",
      success: true,
    };
  } catch (error) {
    return {
      message: "Error assigning teacher",
      success: false,
    };
  }
}

export async function allAssignedTeachers() {
  const teachersRef = collection(db, "teachers");
  const querySnapshot = await getDocs(teachersRef);
  const teachers = querySnapshot.docs.map((doc) => doc.data());

  if (teachers) {
    return { success: true, teachers };
  } else {
    return { success: false };
  }
}

export async function getAllStudents(batch: string, section: string) {
  try {
    const sectionsCollectionRef = collection(
      db,
      `batches/${batch}/sections/${section}/students`
    );
    const querySnapshot = await getDocs(sectionsCollectionRef);

    const students = querySnapshot.docs.map((doc) => ({
      regNo: doc.id,
    }));

    return { students, success: true };
  } catch (error) {
    console.error("Error fetching sections: ", error);
    return { students: [], success: false };
  }
}

export async function uploadMarks(
  batch: string,
  section: string,
  regNo: string,
  semester: string,
  subject: string,
  assignment: string,
  marks: string
) {
  const studentRef = doc(
    db,
    `batches/${batch}/sections/${section}/students/${regNo}`
  );
  const newAssignment = { assignment: assignment, marks };

  try {
    await updateDoc(studentRef, {
      [`assignments.${semester}.${subject}`]: arrayUnion(newAssignment),
    });

    return { message: "Assignment marks added successfully!", success: true };
  } catch (error) {
    return { message: "Error! Failed to upload marks", success: false };
  }
}

export async function getTeacherBatches(email: string) {
  try {
    // Reference to the teacher's document using their email
    const teacherDocRef = doc(db, "teachers", email);

    // Fetch the document from Firestore
    const docSnap = await getDoc(teacherDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const assignedBatches = data.assigned_batches || [];

      return {
        success: true,
        batches: assignedBatches,
      };
    } else {
      return {
        success: false,
        batches: [],
      };
    }
  } catch (error: any) {
    return {
      batches: [],
      success: false,
    };
  }
}

export async function queryStudent(name: string) {
  try {
    const batchesRef = collection(db, "batches");
    const batchDocs = await getDocs(batchesRef);
    let results = [];

    // Iterate through each batch document
    for (const batchDoc of batchDocs.docs) {
      try {
        const sectionsRef = collection(batchDoc.ref, "sections");
        const sectionDocs = await getDocs(sectionsRef);

        // Iterate through each section document
        for (const sectionDoc of sectionDocs.docs) {
          try {
            const studentsRef = collection(sectionDoc.ref, "students");
            const studentDocs = await getDocs(studentsRef);

            // Iterate through each student document
            for (const studentDoc of studentDocs.docs) {
              const studentData = studentDoc.data();

              // Check if the fullName matches the provided name
              if (
                studentData.fullName &&
                studentData.fullName === name.toUpperCase()
              ) {
                results.push({
                  id: studentDoc.id,
                  ...studentData,
                  batch: batchDoc.id,
                  section: sectionDoc.id,
                });
              }
            }
          } catch (error) {
            console.error(
              `Error fetching students from section: ${sectionDoc.id}`,
              error
            );
            return {
              success: false,
              message: `Failed to fetch students from section: ${sectionDoc.id}`,
            };
          }
        }
      } catch (error) {
        console.error(
          `Error fetching sections from batch: ${batchDoc.id}`,
          error
        );
        return {
          success: false,
          message: `Failed to fetch sections from batch: ${batchDoc.id}`,
        };
      }
    }

    return {
      success: true,
      message: results.length
        ? "Students fetched successfully."
        : "No students found.",
      data: results,
    };
  } catch (error) {
    console.error("Error querying student:", error);
    return {
      success: false,
      message: "Failed to query student. Please try again later.",
    };
  }
}
