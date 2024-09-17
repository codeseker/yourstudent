import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function POST(req: NextRequest) {
  const data = await req.formData();

  if (!data) {
    return NextResponse.json(
      { message: "No Data provided", success: false },
      { status: 400 }
    );
  }

  const file: File = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json(
      { message: "No file provided", success: false },
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

  // Process this data (I can now use this data to add to in my Firebase DB)
  // Example: I can loop through the `worksheets` and store data in Firebase

  return NextResponse.json(
    { data: worksheets, message: "File processed successfully", success: true },
    { status: 200 }
  );
}
