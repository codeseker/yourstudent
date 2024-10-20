import { getBatchData } from "@/app/lib/firebaseFunctions";
import { NextRequest, NextResponse } from "next/server";
import cache from "@/app/lib/cache";

export async function GET(req: NextRequest) {
  try {
    // Extract batch year from the URL
    const url = new URL(req.url);
    const pathname = url.pathname;

    const match = pathname.match(/\/teacher\/batch\/(\d+)/);
    const batchYear = match ? match[1] : null;

    if (!batchYear) {
      return NextResponse.json(
        { message: "Batch year not provided", success: false },
        { status: 400 }
      );
    }

    const cachedData = cache.get(`${batchYear}Data`);
    if (cachedData) {
      // Return cached data
      return NextResponse.json(cachedData, { status: 200 });
    }

    const response = await getBatchData(batchYear);
    // Send the response with subcollection data
    if (!response.success) {
      return NextResponse.json(response, { status: 400 });
    }

    cache.set(`${batchYear}Data`, response);

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        message: "Error fetching section data",
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
