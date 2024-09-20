"use client";
import Sidebar from "@/app/components/Sidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { BatchesData } from "@/app/components/BatchTable";

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
  useEffect(() => {
    const fetchBatches = async () => {
      const batchData: BatchesData = await getBatches();
      setYears(batchData.years);
      toast("User daa");
    };

    fetchBatches();
  }, []);

  const getBatches = async () => {
    const { data } = await axios.get("/api/v1/completedata");
    return data;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <Sidebar />

      <div className="flex-grow p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 w-full">
          <input
            type="text"
            placeholder="Search Anything..."
            className="p-2 border rounded-lg w-full md:w-1/2 mb-4 md:mb-0"
          />
          <button className="p-2 bg-blue-500 text-white rounded-lg w-full md:w-auto">
            + Add New Student
          </button>
        </div>

        <BatchesData data={year} />
      </div>
    </div>
  );
}

export default AdminDashboard;
