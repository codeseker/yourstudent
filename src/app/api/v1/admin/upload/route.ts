import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { addDataToDb } from "@/app/lib/firebaseFunctions";
import cache from "@/app/lib/cache";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    if (!data) {
      return NextResponse.json(
        { message: "No Data provided", success: false },
        { status: 400 }
      );
    }

    const file: File = data.get("file") as unknown as File;
    const batch: string = data.get("batch") as string;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided", success: false },
        { status: 400 }
      );
    }

    if (!batch) {
      return NextResponse.json(
        { message: "No batch provided", success: false },
        { status: 400 }
      );
    }

    // Convert the File object to a buffer for XLSX processing
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Read the Excel file from the buffer
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });

    // Extract data from each sheet
    const worksheets = workbook.SheetNames.map((sheetName) => {
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      return {
        sheetName,
        data: sheetData,
      };
    });
    const excelData = worksheets[0].data;

    const reponse = await addDataToDb(batch, excelData);
    if (!reponse) {
      return NextResponse.json(
        {
          success: false,
          message: "Document Failed",
        },
        { status: 400 }
      );
    }
    cache.del("batches");
    return NextResponse.json(
      {
        success: true,
        message: "Document successfully Added",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
