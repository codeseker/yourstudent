"use client";

import { AdminPanelSkeleton } from "@/app/components/AdminPanelSkeleton";
import Sidebar from "@/app/components/Sidebar";
import { StudentDataTable } from "@/app/components/StudentData";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Student {
  id: string;
  image: string;
  name: string;
  regNo: string;
  mobileNumber: string;
  section: string;
  primaryEmailId: string;
  cgpa: string | number;
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBatchData = async () => {
      try {
        const batchData: BatchResponse = await getBatchData();

        if (!batchData.success) {
        } else {
          setStudents(batchData.students);
          toast("Batch data Fetched");
        }
      } catch (error) {
        toast("Error loading data");
      } finally {
        setLoading(false);
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
    <div>
      {loading ? (
        <AdminPanelSkeleton />
      ) : (
        <div className="min-h-screen flex flex-col md:flex-row dark:bg-background">
          <div className="border-r shadow">
            <Sidebar />
          </div>

          <div className="flex-grow p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 w-full">
              <Button
                onClick={() => (window.location.href = "/admin/upload")}
                className="p-2 px-4 rounded-lg w-full md:w-auto"
              >
                + Add New Student
              </Button>
            </div>

            <StudentDataTable data={students} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BatchDetail;
