import { assignTeacher } from "@/app/lib/firebaseFunctions";
import { NextRequest, NextResponse } from "next/server";

interface Res {
  message: string;
  success: boolean;
}

export async function POST(req: NextRequest) {
  const {
    batch,
    section,
    teacher,
  }: { batch: string; section: string; teacher: string } = await req.json();

  const res: Res = await assignTeacher(batch, section, teacher);

  if (!res.success) {
    return NextResponse.json(
      { message: res.message, success: false },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: res.message, success: true },
    { status: 200 }
  );
}
