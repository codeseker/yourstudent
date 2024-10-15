import { uploadMarks } from "@/app/lib/firebaseFunctions";
import { NextRequest, NextResponse } from "next/server";

interface Res {
  message: string;
  success: boolean;
}

export async function POST(req: NextRequest) {
  const { batch, section, regNo, semester, subject, assignment, marks } =
    await req.json();

  const res: Res = await uploadMarks(
    batch,
    section,
    regNo,
    semester,
    subject,
    assignment,
    marks
  );

  if (!res.success) {
    return NextResponse.json(
      { message: res.message, success: false },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: res.message, success: true },
    { status: 200 }
  );
}
