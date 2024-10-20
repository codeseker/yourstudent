import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import cache from "@/app/lib/cache";

export async function GET() {
  try {
    // Check if data is in cache
    const cachedData = cache.get("batches");
    if (cachedData) {
      return NextResponse.json(
        {
          message: "Years and sections fetched from cache",
          success: true,
          years: cachedData,
        },
        { status: 200 }
      );
    }

    // Fetch all batches from Firestore
    const batchesCollection = collection(db, "batches");
    const batchesSnapshot = await getDocs(batchesCollection);

    // Fetch sections for each batch and count the total number of sections
    const allYears = await Promise.all(
      batchesSnapshot.docs.map(async (batchDoc) => {
        const year = batchDoc.id; // The batch year

        // Reference the 'sections' subcollection under this batch
        const sectionsCollection = collection(db, `batches/${year}/sections`);
        const sectionsSnapshot = await getDocs(sectionsCollection);

        const totalSections = sectionsSnapshot.size; // Number of sections

        return {
          year, // Batch year
          totalSections, // Total number of sections in this batch
        };
      })
    );

    // Store the data in cache
    cache.set("batches", allYears);

    return NextResponse.json(
      {
        message: "Years and sections fetched successfully",
        success: true,
        years: allYears,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        message: "Failed to fetch data",
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
