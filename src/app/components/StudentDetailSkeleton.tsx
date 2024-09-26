import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function StudentDetailSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row p-6 space-x-0 lg:space-x-6">
      {/* Left Section (Profile and Personal Details) */}
      <div className="w-full lg:w-1/3 space-y-4">
        {/* Profile Picture */}
        <Skeleton className="w-32 h-32 rounded-full mb-4 mx-auto lg:mx-0" />

        {/* Name and Title */}
        <Skeleton className="w-1/2 h-5 mb-2 mx-auto lg:mx-0" />
        <Skeleton className="w-2/3 h-4 mx-auto lg:mx-0 mb-4" />

        {/* Edit Contact Button */}
        <Skeleton className="w-1/3 h-8 mx-auto lg:mx-0 mb-6" />

        {/* Personal Details */}
        <div className="space-y-2">
          <Skeleton className="w-3/4 h-4 mx-auto lg:mx-0" />
          <Skeleton className="w-3/4 h-4 mx-auto lg:mx-0" />
          <Skeleton className="w-3/4 h-4 mx-auto lg:mx-0" />
          <Skeleton className="w-full h-4 mx-auto lg:mx-0" />
          <Skeleton className="w-full h-4 mx-auto lg:mx-0" />
          <Skeleton className="w-full h-4 mx-auto lg:mx-0" />
        </div>
      </div>

      {/* Right Section (Academic Details) */}
      <div className="w-full lg:w-2/3 space-y-6">
        {/* 10th and 12th Grade Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="w-full h-5 mb-2" />
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-1/3 h-4" />
          </div>
          <div className="space-y-2">
            <Skeleton className="w-full h-5 mb-2" />
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-1/3 h-4" />
          </div>
        </div>

        {/* College and Semester Details */}
        <div className="space-y-4">
          <Skeleton className="w-1/3 h-6 mb-4" />

          {/* Semester Info */}
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetailSkeleton;
