import AddFacultyComponent from "@/app/components/AddFacultyComponent";
import Sidebar from "@/app/components/Sidebar";
import React from "react";

function AddFaculty() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="border-r shadow-lg">
        <Sidebar />
      </div>

      <div className="flex-grow p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 w-full"></div>

        <AddFacultyComponent />
      </div>
    </div>
  );
}

export default AddFaculty;
