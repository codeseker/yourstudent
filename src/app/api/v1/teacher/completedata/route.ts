import cache from "@/app/lib/cache"; // In-memory cache
import { getTeacherBatches } from "@/app/lib/firebaseFunctions";
import { NextRequest, NextResponse } from "next/server";

interface Res {
  success: boolean;
  batches: Batch[];
}

interface Batch {
  batch: string;
  sections: string[];
}

interface CachedRes extends Res {
  message: string;
}

const CACHE_EXPIRATION_TIME = 60 * 5;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      console.log(email);
      return NextResponse.json(
        { message: "Email is required", success: false },
        { status: 400 }
      );
    }

    // Attempt to retrieve cached data
    const cachedData = cache.get(email) as CachedRes | undefined;

    if (cachedData) {
      return NextResponse.json(
        {
          message: "Teacher batches fetched from cache",
          success: true,
          batches: cachedData.batches,
        },
        { status: 200 }
      );
    }

    // Fetch data from Firestore if not found in cache
    const data: Res = await getTeacherBatches(email);

    if (!data.success) {
      return NextResponse.json(
        { message: "Error while fetching the data", success: false },
        { status: 500 }
      );
    }

    // Cache the response for future use
    const cacheData: CachedRes = { ...data, message: "Cached response" };
    cache.set(email, cacheData, CACHE_EXPIRATION_TIME);

    return NextResponse.json(
      {
        message: "Teacher batches fetched successfully",
        success: true,
        batches: data.batches,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
