import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function StudentDetailSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row space-x-6 p-6">
      {/* Left Section (Profile) */}
      <div className="w-full lg:w-1/3">
        {/* Profile Picture */}
        <Skeleton className="w-32 h-32 rounded-full mb-4 mx-auto lg:mx-0" />

        {/* Name and Title */}
        <Skeleton className="w-1/2 h-5 mb-2 mx-auto lg:mx-0" />
        <Skeleton className="w-2/3 h-4 mx-auto lg:mx-0 mb-4" />

        {/* Contact Button */}
        <Skeleton className="w-1/3 h-8 mx-auto lg:mx-0 my-4" />

        {/* Personal Details */}
        <Skeleton className="w-full h-5 my-2" />
        <Skeleton className="w-full h-5 my-2" />
        <Skeleton className="w-full h-5 my-2" />
        <Skeleton className="w-full h-5 my-2" />
        <Skeleton className="w-full h-5 my-2" />
        <Skeleton className="w-full h-5 my-2" />
        <Skeleton className="w-full h-5 my-2" />
        <Skeleton className="w-full h-5 my-2" />
      </div>

      {/* Right Section (Academic Details) */}
      <div className="w-full lg:w-2/3">
        {/* Academic Details Heading */}
        <Skeleton className="w-1/3 h-6 mb-4" />

        {/* Semester Info */}
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-full h-4 mb-2" />
            </div>
          ))}
        </div>

        {/* Additional Academic Details */}
        <Skeleton className="w-1/2 h-5 my-2" />
        <Skeleton className="w-1/2 h-5 my-2" />
        <Skeleton className="w-1/2 h-5 my-2" />
        <Skeleton className="w-1/2 h-5 my-2" />
        <Skeleton className="w-1/2 h-5 my-2" />
        <Skeleton className="w-1/2 h-5 my-2" />
      </div>
    </div>
  );
}

export default StudentDetailSkeleton;
