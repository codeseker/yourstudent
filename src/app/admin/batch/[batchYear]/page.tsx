"use client";

import { AdminPanelSkeleton } from "@/app/components/AdminPanelSkeleton";
import Sidebar from "@/app/components/Sidebar";
import { SectionDataTable } from "@/app/components/SectionDataTable";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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

function BatchDetail() {
  const { batchYear } = useParams();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBatchData = async () => {
      try {
        const batchData: BatchResponse = await getBatchData();

        if (!batchData.success) {
          toast("Error fetching batch data");
        } else {
          setSections(batchData.sections);
          toast("Batch data fetched successfully");
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
        sections: [],
      };
    }
  };

  const handleSectionClick = (sectionName: string) => {
    // Navigate to section details (or you can load students in this component)
    window.location.href = `/admin/batch/${batchYear}/${sectionName}`;
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

            <SectionDataTable data={sections} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BatchDetail;
