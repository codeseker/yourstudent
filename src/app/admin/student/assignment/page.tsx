"use client";
import { AdminPanelSkeleton } from "@/app/components/AdminPanelSkeleton";
import Sidebar from "@/app/components/Sidebar";
import StudentAssignmentForm from "@/app/components/StudentAssignmentForm";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

function StudentAssignment() {
  const { data, status } = useSession();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === "loading") return;

    setUserEmail(data?.user?.email ?? "");
    setLoading(false);
  }, [status, data]);

  if (loading) {
    return <AdminPanelSkeleton />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="border-r shadow-lg">
        <Sidebar />
      </div>

      <div className="flex-grow p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 w-full"></div>

        {userEmail ? (
          <StudentAssignmentForm
            userRole={
              userEmail == process.env.NEXT_PUBLIC_HOD_SIR_EMAIL
                ? "admin"
                : "teacher"
            }
            email={userEmail}
          />
        ) : (
          <p>No email found</p>
        )}
      </div>
    </div>
  );
}

export default StudentAssignment;
