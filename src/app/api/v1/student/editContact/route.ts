import { editDetail } from "@/app/lib/firebaseFunctions";
import { NextRequest, NextResponse } from "next/server";
import cache from "@/app/lib/cache";

export async function POST(req: NextRequest) {
  try {
    const { number, batch, regNo, section } = await req.json();

    if (!number || !batch || !regNo) {
      return NextResponse.json(
        { message: "Batch or regNo not provided", success: false },
        { status: 400 }
      );
    }

    const response = await editDetail(batch, section, regNo, number);
    if (!response.success) {
      return NextResponse.json(response, { status: 500 });
    }
    cache.del(`${batch}/${regNo}`);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
