import { getBatchData } from "@/app/lib/firebaseFunctions";
import { NextRequest, NextResponse } from "next/server";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 });

export async function GET(req: NextRequest) {
  try {
    // Extract batch year from the URL
    const url = new URL(req.url);
    const pathname = url.pathname;

    const match = pathname.match(/\/admin\/batch\/(\d+)/);
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
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to fetch batch data",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
