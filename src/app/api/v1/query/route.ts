import cache from "@/app/lib/cache";
import { queryStudent } from "@/app/lib/firebaseFunctions";
import { NextRequest, NextResponse } from "next/server";

interface Res {
  success: boolean;
  message: string;
  data?: { batch: string; section: string; id: string }[];
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  const cacheKey = `student-${name.toUpperCase()}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return NextResponse.json(
      {
        message: "Students fetched from cache.",
        students: cachedData,
        success: true,
      },
      { status: 200 }
    );
  }

  const res: Res = await queryStudent(name);

  if (!res.success) {
    return NextResponse.json(
      { message: res.message, success: false },
      { status: 500 }
    );
  }

  cache.set(cacheKey, res.data, 3600);

  return NextResponse.json(
    { message: res.message, students: res.data, success: true },
    { status: 200 }
  );
}
