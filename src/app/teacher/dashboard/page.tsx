"use client";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { BatchesData } from "@/app/components/BatchTable";
import { AdminPanelSkeleton } from "@/app/components/AdminPanelSkeleton";
import TeacherSidebar from "@/app/components/TeacherSidebar";
import { useSession } from "next-auth/react";

interface YearData {
  year: string;
  totalSections: number;
}

interface Batch {
  batch: string;
  sections: Array<{
    sectionName: string;
  }>;
}

interface FetchBatchesResponse {
  success: boolean;
  batches: Batch[];
}

function TeacherDashboard() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [year, setYear] = useState<YearData[]>([]);

  useEffect(() => {
    const fetchBatches = async () => {
      if (!session?.user?.email) {
        toast.error("No user session found!");
        return;
      }

      setLoading(true);
      try {
        const response = await axios.post<FetchBatchesResponse>(
          "/api/v1/teacher/completedata",
          {
            email: session.user.email,
          }
        );

        if (response.data.success) {
          const yearData: YearData[] = response.data.batches.map((batch) => ({
            year: batch.batch,
            totalSections: batch.sections.length,
          }));

          setYear(yearData);
        } else {
          toast.error("Failed to fetch batches.");
        }
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        toast.error("Error fetching batches.");
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, [session]);

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
            <BatchesData data={year} userRole="teacher" />
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
