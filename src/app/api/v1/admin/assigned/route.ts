import { allAssignedTeachers } from "@/app/lib/firebaseFunctions";
import { NextRequest, NextResponse } from "next/server";
import cache from "@/app/lib/cache";

const CACHE_KEY = "assignedTeachers";
const CACHE_TTL = 300;

export async function GET(req: NextRequest) {
  const cachedData = await cache.get(CACHE_KEY);

  if (cachedData) {
    return NextResponse.json(
      { message: "Fetched from cache", success: true, teachers: cachedData },
      { status: 200 }
    );
  }

  const data = await allAssignedTeachers();

  if (data.success) {
    await cache.set(CACHE_KEY, data.teachers, CACHE_TTL);
    return NextResponse.json(
      { message: "Fetched", success: true, teachers: data.teachers },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "Failed", success: false },
      { status: 500 }
    );
  }
}
