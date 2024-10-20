"use client";
import { AdminPanelSkeleton } from "@/app/components/AdminPanelSkeleton";
import { StudentDataTable } from "@/app/components/StudentData";
import TeacherSidebar from "@/app/components/TeacherSidebar";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  }, [year, section]);

  const getSectionData = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/teacher/batch/${year}/${section}`
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
