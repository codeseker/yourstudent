import Sidebar from "@/app/components/Sidebar";
import StudentAssignmentForm from "@/app/components/StudentAssignmentForm";
import React from "react";

function StudentAssignment() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="border-r shadow-lg">
        <Sidebar />
      </div>

      <div className="flex-grow p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 w-full"></div>

        <StudentAssignmentForm />
      </div>
    </div>
  );
}

export default StudentAssignment;
