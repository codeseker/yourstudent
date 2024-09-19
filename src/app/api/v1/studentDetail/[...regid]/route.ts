import { getStudentDetail } from "@/app/lib/firebaseFunctions";
import { NextRequest, NextResponse } from "next/server";
import cache from "@/app/lib/cache";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Use regex to extract batch and regNo
  const match = pathname.match(/\/studentDetail\/(\d+)\/(.+)/);
  const batch = match ? match[1] : null;
  const regNo = match ? match[2] : null;

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
  const response = await getStudentDetail(batch, regNo);
  if (!response.success) {
    return NextResponse.json(response, { status: 500 });
  }

  cache.set(`${batch}/${regNo}`, response);
  // Return the response
  return NextResponse.json(response, { status: 200 });
}
