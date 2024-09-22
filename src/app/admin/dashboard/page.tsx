"use client";
import Sidebar from "@/app/components/Sidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { BatchesData } from "@/app/components/BatchTable";
import { Button } from "@/components/ui/button";
import { AdminPanelSkeleton } from "@/app/components/AdminPanelSkeleton";

interface YearData {
  id: string;
  year: string;
  total: number;
}

interface BatchesData {
  message: string;
  success: boolean;
  years: YearData[];
}

function AdminDashboard() {
  const [year, setYears] = useState<YearData[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const batchData: BatchesData = await getBatches();
        setYears(batchData.years);
        toast("All Batches Fetched");
      } catch (error) {
        toast("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  const getBatches = async () => {
    const { data } = await axios.get("/api/v1/completedata");
    return data;
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
              <Button className="p-2 px-4 rounded-lg w-full md:w-auto">
                + Add New Student
              </Button>
            </div>

            <BatchesData data={year} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
