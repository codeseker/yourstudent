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
      console.error("No form data provided");
      return NextResponse.json(
        { message: "No Data provided", success: false },
        { status: 400 }
      );
    }

    const file: File = data.get("file") as unknown as File;
    const batch: string = data.get("batch") as string;
    const section: string = data.get("section") as string;

    if (!file) {
      console.error("No file provided");
      return NextResponse.json(
        { message: "No file provided", success: false },
        { status: 400 }
      );
    }

    if (!batch || !section) {
      console.error("Batch or section missing");
      return NextResponse.json(
        { message: "Batch or section missing", success: false },
        { status: 400 }
      );
    }

    // Convert the File object to a buffer for XLSX processing
    let fileBuffer;
    try {
      const arrayBuffer = await file.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
    } catch (fileError) {
      console.error("Error converting file to buffer", fileError);
      return NextResponse.json(
        { message: "File processing error", success: false },
        { status: 500 }
      );
    }

    // Read the Excel file from the buffer
    let workbook;
    try {
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
    } catch (readError) {
      console.error("Error reading Excel file", readError);
      return NextResponse.json(
        { message: "Failed to read Excel file", success: false },
        { status: 500 }
      );
    }

    // Extract data from each sheet
    const worksheets: WorksheetData[] = workbook.SheetNames.map((sheetName) => {
      const sheetData: ExcelRow[] = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetName],
        {
          raw: false,
        }
      );

      // Format date columns in the sheet
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

    // Firestore upload with delay
    const response: boolean = await addDataToDb(batch, section, excelData);
    if (!response) {
      console.error("Failed to add document to Firestore");
      return NextResponse.json(
        {
          success: false,
          message: "Failed to add document to Firestore",
        },
        { status: 400 }
      );
    }

    // Clear cache after successful upload
    cache.del("batches");

    return NextResponse.json(
      {
        success: true,
        message: "Document successfully added",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Internal Server Error:", errorMessage);

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
