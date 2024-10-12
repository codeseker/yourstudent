"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import AssignedTeachersTable from "@/app/components/AssignedTeacherTable";

interface Section {
  batch: string;
  sections: string[];
}

interface Teacher {
  role: string;
  email: string;
  assigned_batches: Section[];
}

function AssignedTeachers() {
  const [data, setData] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/v1/admin/assigned");
        const result = await res.json();
        if (result.success) {
          setData(result.teachers);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="border-r shadow-lg">
        <Sidebar />
      </div>
      <div className="flex-grow p-6">
        <AssignedTeachersTable data={data} />
      </div>
    </div>
  );
}

export default AssignedTeachers;
