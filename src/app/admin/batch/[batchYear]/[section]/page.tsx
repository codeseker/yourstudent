"use client";

import { AdminPanelSkeleton } from "@/app/components/AdminPanelSkeleton";
import Sidebar from "@/app/components/Sidebar";
import { StudentDataTable } from "@/app/components/StudentData";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

interface Student {
  regNo: string;
  name: string;
  primaryEmail: string;
  cgpa: string | number;
  section: string;
  id: string;
  mobileNumber: string;
}

interface SectionResponse {
  message: string;
  success: boolean;
  students: Student[];
}

function BatchDetail() {
  const { batchYear, section } = useParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getSectionData = useCallback(async (): Promise<SectionResponse> => {
    try {
      const { data } = await axios.get<SectionResponse>(
        `/api/v1/admin/batch/${batchYear}/${section}`
      );
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        message:
          axiosError.response?.data?.message || "An unexpected error occurred",
        students: [],
      };
    }
  }, [batchYear, section]);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const sectionData = await getSectionData();

        if (!sectionData.success) {
          toast.error(sectionData.message);
        } else {
          setStudents(sectionData.students);
          toast.success("Section data fetched successfully");
        }
      } catch (error) {
        toast.error("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchSectionData();
  }, [getSectionData]);

  return (
    <div>
      {loading ? (
        <AdminPanelSkeleton />
      ) : (
        <div className="min-h-screen flex flex-col md:flex-row bg-background">
          <div className="border-r shadow">
            <Sidebar />
          </div>

          <div className="flex-grow p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 w-full"></div>

            <StudentDataTable data={students} userRole="admin" />
          </div>
        </div>
      )}
    </div>
  );
}

export default BatchDetail;
