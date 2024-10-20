import cache from "@/app/lib/cache";
import { getAllStudents } from "@/app/lib/firebaseFunctions";
import { NextRequest, NextResponse } from "next/server";

interface Student {
  regNo: string;
}

interface Res {
  students: Student[];
  success: boolean;
}

const CACHE_TTL = 60 * 60;

export async function GET(
  req: NextRequest,
  { params }: { params: { batch: string; section: string } }
) {
  const { batch, section } = params;

  const cacheKey = `students_${batch}_${section}`;

  const cachedResponse = await cache.get<Res>(cacheKey);
  if (cachedResponse) {
    console.log("Returning data from cache");
    return NextResponse.json(
      { message: "All students Fetched (from cache)", ...cachedResponse },
      { status: 200 }
    );
  }

  const res: Res = await getAllStudents(batch, section);
  if (!res.success) {
    return NextResponse.json(
      { message: "Error fetching students", success: false },
      { status: 500 }
    );
  }

  await cache.set(cacheKey, res, CACHE_TTL);

  return NextResponse.json(
    { message: "All students Fetched", students: res.students, success: true },
    { status: 200 }
  );
}
