import { getStudentDetail } from "@/app/lib/firebaseFunctions";
import { NextRequest, NextResponse } from "next/server";
import cache from "@/app/lib/cache";

export async function GET(
  req: NextRequest,
  { params }: { params: { batch: string; section: string; regNo: string } }
) {
  const { batch, regNo, section } = params;

  if (!batch || !regNo) {
    return NextResponse.json(
      { message: "Batch or regNo not provided", success: false },
      { status: 400 }
    );
  }

  const cachedData = cache.get(`${batch}/${regNo}`);
  if (cachedData) {
    return NextResponse.json(cachedData, { status: 200 });
  }
  const response = await getStudentDetail(batch, section, regNo);
  if (!response.success) {
    return NextResponse.json(response, { status: 500 });
  }

  cache.set(`${batch}/${regNo}`, response);
  // Return the response
  return NextResponse.json(response, { status: 200 });
}
