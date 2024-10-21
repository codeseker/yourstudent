"use client";
import { AdminPanelSkeleton } from "@/app/components/AdminPanelSkeleton";
import { SectionDataTable } from "@/app/components/SectionDataTable";
import TeacherSidebar from "@/app/components/TeacherSidebar";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

interface Section {
  sectionName: string;
  studentCount: number;
}

interface BatchResponse {
  message: string;
  success: boolean;
  batch: string;
  sections: Section[];
}

function TeacherBatch() {
  const { year } = useParams();

  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getBatchData = useCallback(async (): Promise<BatchResponse> => {
    try {
      const { data } = await axios.get(`/api/v1/teacher/batch/${year}`);
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return {
        batch: "",
        success: false,
        message: "An unexpected error occurred",
        sections: [],
      };
    }
  }, [year]);

  useEffect(() => {
    const fetchBatchData = async () => {
      try {
        const batchData: BatchResponse = await getBatchData();

        if (!batchData.success) {
          toast.error("Error fetching batch data");
        } else {
          setSections(batchData.sections);
          toast.success("Batch data fetched successfully");
        }
      } catch (error) {
        toast.error("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchBatchData();
  }, [getBatchData]);

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
            <SectionDataTable data={sections} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherBatch;
