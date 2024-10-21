"use client";

import { AdminPanelSkeleton } from "@/app/components/AdminPanelSkeleton";
import Sidebar from "@/app/components/Sidebar";
import { SectionDataTable } from "@/app/components/SectionDataTable";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

interface Section {
  sectionName: string;
  studentCount: number;
}

interface BatchResponse {
  message: string;
  success: boolean;
  batch?: string; // Optional batch field
  sections: Section[];
}

function BatchDetail() {
  const { batchYear } = useParams();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getBatchData = useCallback(async (): Promise<BatchResponse> => {
    try {
      const { data } = await axios.get<BatchResponse>(
        `/api/v1/admin/batch/${batchYear}`
      );
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        message:
          axiosError.response?.data?.message || "An unexpected error occurred",
        sections: [],
      };
    }
  }, [batchYear]);

  useEffect(() => {
    const fetchBatchData = async () => {
      try {
        const batchData = await getBatchData();

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
            <Sidebar />
          </div>

          <div className="flex-grow p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 w-full"></div>

            <SectionDataTable data={sections} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BatchDetail;
