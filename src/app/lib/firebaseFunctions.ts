import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import NodeCache from "node-cache";
import firebaseData, {
  mapResponseToFirebaseData,
} from "@/app/lib/firebaseData";

// Upload Data
export async function addDataToDb(batch: string, excelData: any) {
  const cache = new NodeCache({ stdTTL: 3600 });

  try {
    // Reference to the specific batch document
    const batchDocRef = doc(db, "batches", batch);
    await setDoc(batchDocRef, { created: true }, { merge: true });

    // Loop through each student entry and store them in the students subcollection
    for (const ele of excelData) {
      const mappedData = mapResponseToFirebaseData(ele);

      // Add student to the "students" subcollection under the respective batch
      const studentDocRef = doc(
        collection(batchDocRef, "students"),
        mappedData[firebaseData.regNo]
      );
      await setDoc(studentDocRef, mappedData, { merge: true });
    }

    // Clear cache after updating
    cache.del("batches");
    return true;
  } catch (error) {
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

    const studentsCollectionRef = collection(batchDocRef, "students");

    // Get all students in the batch
    const studentsSnapshot = await getDocs(studentsCollectionRef);

    // Extract name and regNo from each student's document
    const studentsData = studentsSnapshot.docs.map((doc) => ({
      regNo: doc.data()[firebaseData.regNo],
      name: doc.data()[firebaseData.fullName],
      mobileNumber: doc.data()[firebaseData.mobileNumber],
    }));

    // Return the batch data along with all students' information
    return {
      success: true,
      batch: batchDoc.id,
      students: studentsData,
    };
  } catch (error: any) {
    return {
      message: "Error fetching batch data",
      success: false,
      error: error.message,
    };
  }
}

// get Student Details
export async function getStudentDetail(batch: string, regNo: string) {
  try {
    const batchDocRef = doc(db, "batches", batch);

    const studentDocRef = doc(batchDocRef, "students", regNo);

    // Get the student's document
    const studentDoc = await getDoc(studentDocRef);

    // Check if the student's document exists
    if (!studentDoc.exists()) {
      return { message: "Student not found", success: false };
    }

    return {
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
