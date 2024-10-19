import cache from "@/app/lib/cache"; // In-memory cache
import { getTeacherBatches } from "@/app/lib/firebaseFunctions";
import { NextRequest, NextResponse } from "next/server";

interface Res {
  success: boolean;
  batches: Array<Batch>;
}

interface Batch {
  batch: string;
  sections: string[];
}

interface CachedRes extends Res {
  message: string;
}

const CACHE_EXPIRATION_TIME = 60 * 5; // 5 minutes in seconds

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  // Check if the data for the given email is already cached
  const cachedData: CachedRes | undefined = cache.get(email);

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

  // If not in cache, fetch the data from Firestore
  const data: Res = await getTeacherBatches(email);

  if (!data.success) {
    return NextResponse.json(
      { message: "Error while fetching the data", success: false },
      { status: 500 }
    );
  }

  // Cache the response for future requests
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
}
