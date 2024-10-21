"use client";
import { AdminPanelSkeleton } from "@/app/components/AdminPanelSkeleton";
import { StudentDataTable } from "@/app/components/StudentData";
import TeacherSidebar from "@/app/components/TeacherSidebar";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
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

function TeacherSectionData() {
  const { year, section } = useParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getSectionData = useCallback(async (): Promise<SectionResponse> => {
    try {
      const { data } = await axios.get(
        `/api/v1/teacher/batch/${year}/${section}`
      );
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        message: "An unexpected error occurred",
        students: [],
      };
    }
  }, [year, section]);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const sectionData: SectionResponse = await getSectionData();

        if (!sectionData.success) {
          toast.error(sectionData.message);
        } else {
          setStudents(sectionData.students);
          toast.success("Section data Fetched");
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
            <TeacherSidebar />
          </div>

          <div className="flex-grow p-6">
            <StudentDataTable data={students} userRole="teacher" />
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherSectionData;
