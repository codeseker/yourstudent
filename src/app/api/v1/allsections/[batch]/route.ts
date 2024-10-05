import cache from "@/app/lib/cache";
import { getAllSections } from "@/app/lib/firebaseFunctions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { batch: string } }
) {
  const { batch } = params;

  const cachedData = await cache.get(`sections-${batch}`);
  if (cachedData) {
    return NextResponse.json(cachedData, { status: 200 });
  }

  try {
    const data = await getAllSections(batch);
    await cache.set(`sections-${batch}`, {
      message: "All sections fetched",
      success: true,
      sections: data,
    });
    return NextResponse.json(
      {
        message: "All sections fetched",
        success: true,
        sections: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch sections", success: false },
      { status: 500 }
    );
  }
}
