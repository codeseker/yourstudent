import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { addDataToDb } from "@/app/lib/firebaseFunctions";
import cache from "@/app/lib/cache";

interface ExcelRow {
  [key: string]: unknown;
}

interface WorksheetData {
  sheetName: string;
  data: ExcelRow[];
}

const formatDate = (serial: number): string => {
  const date = XLSX.SSF.parse_date_code(serial);
  return `${String(date.d).padStart(2, "0")}-${String(date.m).padStart(
    2,
    "0"
  )}-${String(date.y).slice(-2)}`;
};

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
    const section: string = data.get("section") as string;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided", success: false },
        { status: 400 }
      );
    }

    if (!batch || !section) {
      return NextResponse.json(
        { message: "No data provided", success: false },
        { status: 400 }
      );
    }

    // Convert the File object to a buffer for XLSX processing
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Read the Excel file from the buffer
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });

    // Extract data from each sheet
    const worksheets: WorksheetData[] = workbook.SheetNames.map((sheetName) => {
      const sheetData: ExcelRow[] = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetName],
        {
          raw: false,
        }
      );

      const formattedData = sheetData.map((row) => {
        Object.keys(row).forEach((key) => {
          if (typeof row[key] === "number" && key.includes("DOB")) {
            row[key] = formatDate(row[key]);
          }
        });
        return row;
      });

      return {
        sheetName,
        data: formattedData,
      };
    });

    const excelData = worksheets[0].data;

    const reponse: boolean = await addDataToDb(batch, section, excelData);
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
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
