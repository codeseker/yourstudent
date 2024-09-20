"use client";

import Sidebar from "@/app/components/Sidebar";
import { StudentDataTable } from "@/app/components/StudentData";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Student {
  id: string;
  image: string;
  name: string;
  regNo: string;
  mobileNumber: string;
  section: string;
}

interface BatchResponse {
  message: string;
  success: boolean;
  batch: string;
  students: Student[];
}

function BatchDetail() {
  const { batchYear } = useParams();
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchBatchData = async () => {
      const batchData: BatchResponse = await getBatchData();

      if (!batchData.success) {
      } else {
        setStudents(batchData.students);
      }
    };

    fetchBatchData();
  }, [batchYear]);

  const getBatchData = async () => {
    try {
      const { data } = await axios.get(`/api/v1/admin/batch/${batchYear}`);
      return data;
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "An unexpected error occurred",
        students: [],
      };
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <Sidebar />

      <div className="flex-grow p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 w-full">
          <input
            type="text"
            placeholder="Search Anything..."
            className="p-2 border rounded-lg w-full md:w-1/2 mb-4 md:mb-0"
          />
          <button className="p-2 bg-blue-500 text-white rounded-lg w-full md:w-auto">
            + Add New Student
          </button>
        </div>

        <StudentDataTable data={students} />
      </div>
    </div>
  );
}

export default BatchDetail;
