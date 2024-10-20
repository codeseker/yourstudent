import { NextRequest, NextResponse } from "next/server";
import { getSectionData } from "@/app/lib/firebaseFunctions"; // Define a function to fetch section data
import cache from "@/app/lib/cache";

export async function GET(
  req: NextRequest,
  { params }: { params: { year: string; section: string } }
) {
  const { year, section } = params;
  const cacheKey = `${year}-${section}`;
  try {
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      // If cached data exists, return it
      return NextResponse.json(cachedData, { status: 200 });
    }
    // Fetch the section data
    const sectionData = await getSectionData(year, section);

    if (!sectionData.success) {
      return NextResponse.json(
        { message: sectionData.message, success: false },
        { status: 404 }
      );
    }

    // Cache the fetched data
    cache.set(cacheKey, sectionData);
    return NextResponse.json(
      {
        message: "Section data fetched successfully",
        success: true,
        students: sectionData.students,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error fetching section data",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
