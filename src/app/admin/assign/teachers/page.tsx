import Sidebar from "@/app/components/Sidebar";
import TeacherAssignment from "@/app/components/TeacherAsssignment";
import React from "react";

function TeacherAssignmentPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="border-r shadow-lg">
        <Sidebar />
      </div>

      <div className="flex-grow p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 w-full"></div>

        <TeacherAssignment />
      </div>
    </div>
  );
}

export default TeacherAssignmentPage;
