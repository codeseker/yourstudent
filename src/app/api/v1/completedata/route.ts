import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import cache from "@/app/lib/cache";

export async function GET(req: NextRequest) {
  try {
    // Check if data is in cache
    const cachedData = cache.get("batches");
    if (cachedData) {
      return NextResponse.json(
        {
          message: "Years fetched from cache",
          success: true,
          years: cachedData,
        },
        { status: 200 }
      );
    }

    // If not cached, fetch from Firestore
    const batchesCollection = collection(db, "batches");
    const batchesSnapshot = await getDocs(batchesCollection);
    const allYears = batchesSnapshot.docs.map((doc) => doc.id);

    // Store the data in cache
    cache.set("batches", allYears);

    return NextResponse.json(
      {
        message: "Years fetched successfully",
        success: true,
        years: allYears,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to fetch data",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
