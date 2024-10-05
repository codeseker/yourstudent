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

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const sectionData: SectionResponse = await getSectionData();

        if (!sectionData.success) {
          toast(sectionData.message);
        } else {
          setStudents(sectionData.students);
          toast("Section data Fetched");
        }
      } catch (error) {
        toast("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchSectionData();
  }, [batchYear, section]);

  const getSectionData = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/admin/batch/${batchYear}/${section}`
      );
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
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 w-full"></div>

            <StudentDataTable data={students} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BatchDetail;
