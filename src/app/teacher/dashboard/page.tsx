"use client";
import Sidebar from "@/app/components/Sidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner"; // For notifications
import { BatchesData } from "@/app/components/BatchTable"; // Component to display batch data
import { Button } from "@/components/ui/button";
import { AdminPanelSkeleton } from "@/app/components/AdminPanelSkeleton";
import Link from "next/link";
import TeacherSidebar from "@/app/components/TeacherSidebar";
import { useSession } from "next-auth/react";

interface Batch {
  batch: string;
  sections: string[];
}

interface YearData {
  year: string;
  totalSections: number;
}

function TeacherDashboard() {
  const { data: session } = useSession(); // Get teacher's email from session
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState<YearData[]>([]); // Store batches by year

  useEffect(() => {
    const fetchBatches = async () => {
      if (!session?.user?.email) {
        toast.error("No user session found!");
        return;
      }

      setLoading(true);
      try {
        const response = await axios.post("/api/v1/teacher/completedata", {
          email: session.user.email,
        });

        if (response.data.success) {
          const year: any = [];
          const batches = response.data.batches;
          //   console.log(batches);
          batches.forEach((batch: any) => {
            year.push({
              year: batch.batch,
              totalSections: batch.sections.length,
            });
          });

          setYear(year);
        } else {
          toast.error("Failed to fetch batches.");
        }
      } catch (error) {
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
        <div className="min-h-screen flex flex-col md:flex-row dark:bg-background">
          <div className="border-r shadow">
            <TeacherSidebar />
          </div>

          <div className="flex-grow p-6">
            <BatchesData data={year} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
