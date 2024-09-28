import { getAllStudents } from "@/app/lib/firebaseFunctions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name } = await req.json();

  const data = await getAllStudents(name);

  return NextResponse.json({ data });
}
