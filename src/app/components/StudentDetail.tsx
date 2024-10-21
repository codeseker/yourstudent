import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type StudentData = {
  tenthMaxMarks: number;
  college: string;
  totalBacklogs: number;
  state: string;
  sem1Percentage: number;
  sem8Backlogs: string | null;
  sem5Percentage: number;
  status: string;
  fatherName: string;
  cgpa: number;
  sem6Percentage: string | null;
  tenthYearOfPass: number;
  maxMarks: number;
  sem1BackLogs: number;
  tenthBoardName: string;
  sem5Backlogs: number;
  sem7Percentage: string | null;
  sem3Percentage: number;
  sem4Percentage: number;
  tenthAndTwelfthGap: number;
  fatherMobileNo: string;
  academicGap: number;
  section: string;
  sem3Marks: number;
  sem7Backlogs: string | null;
  sem6Backlogs: string | null;
  hostellerOrDayscholar: string;
  twelfthBoardName: string;
  sem5Marks: number;
  sem2Percentage: number;
  sem8Marks: string | null;
  obtainedMarks: number;
  universityRollNo: string;
  regNo: string;
  primaryEmailId: string;
  ugPercentage: number;
  sem3Backlogs: number;
  twelfthAndUgGap: number;
  sem4Backlogs: number;
  sem1Marks: number;
  branch: string;
  fullName: string;
  gender: string;
  tenthPercentage: number;
  twelfthMarksObtained: number;
  tenthMarksObtained: number;
  tenthMedium: string;
  twelfthYearOfPass: number;
  twelfthMaxMarks: number;
  mobileNumber: string;
  sem2Backlogs: number;
  dob: number;
  sem7Marks: string | null;
  sem6Marks: string | null;
  sem8Percentage: string | null;
  twelfthMedium: string;
  sem4Marks: number;
  twelfthPercentage: number;
  sem2Marks: number;
  medium: string;
  permanentAddress: string;
  homeTown: string;
  motherName: string;
  [key: `sem${number}Marks`]: number | string | null;
  [key: `sem${number}Percentage`]: number | string | null;
  [key: `sem${number}Backlogs`]: number | string | null;
};

interface StudentDataProp {
  studentData: StudentData;
}

const StudentProfile = ({ studentData }: StudentDataProp) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
          {/* Left Section */}
          <div className="col-span-1 sm:col-span-1">
            <div className="bg-card shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <Image
                  width={120}
                  height={120}
                  src="https://randomuser.me/api/portraits/men/94.jpg"
                  alt="Profile"
                  className="rounded-full"
                />
                <h1 className="text-xl font-bold">{studentData.fullName}</h1>
                <p className="text-gray-700">{studentData.branch}</p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <Button className="py-2 px-4 rounded">Edit Contact</Button>
                </div>
              </div>
              <hr className="my-6 border-t border-gray-300" />

              {/* Personal Details Section */}
              <div className="flex flex-col">
                <span className="text-primary uppercase font-bold tracking-wider mb-2">
                  Personal Details
                </span>
                <ul>
                  <li className="mb-2">
                    <strong>Father&apos;s Name:</strong>{" "}
                    {studentData.fatherName}
                  </li>
                  <li className="mb-2">
                    <strong>Mother&apos;s Name:</strong>{" "}
                    {studentData.motherName}
                  </li>
                  <li className="mb-2">
                    <strong>Date of Birth:</strong> {studentData.dob}
                  </li>
                  <li className="mb-2">
                    <strong>Address:</strong> {studentData.permanentAddress}
                  </li>
                  <li className="mb-2">
                    <strong>Mobile Number:</strong> {studentData.mobileNumber}
                  </li>
                  <li className="mb-2">
                    <strong>Father&apos;s Mobile:</strong>{" "}
                    {studentData.fatherMobileNo}
                  </li>
                  <li className="mb-2">
                    <strong>Gender:</strong> {studentData.gender}
                  </li>
                  <li className="mb-2">
                    <strong>Home Town:</strong> {studentData.homeTown}
                  </li>
                  <li className="mb-2">
                    <strong>State:</strong> {studentData.state}
                  </li>
                  <li className="mb-2">
                    <strong>Hosteller/Day Scholar:</strong>{" "}
                    {studentData.hostellerOrDayscholar}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-2 sm:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tenth Grade Details */}
              <div className="bg-card shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold">10th Grade</h3>
                <ul className="list-disc list-inside">
                  <li>
                    <strong>Board:</strong> {studentData.tenthBoardName}
                  </li>
                  <li>
                    <strong>Year of Passing:</strong>{" "}
                    {studentData.tenthYearOfPass}
                  </li>
                  <li>
                    <strong>Medium:</strong> {studentData.tenthMedium}
                  </li>
                  <li>
                    <strong>Max Marks:</strong> {studentData.tenthMaxMarks}
                  </li>
                  <li>
                    <strong>Marks Obtained:</strong>{" "}
                    {studentData.tenthMarksObtained}
                  </li>
                  <li>
                    <strong>Percentage:</strong> {studentData.tenthPercentage}%
                  </li>
                </ul>
              </div>

              {/* Twelfth Grade Details */}
              <div className="bg-card shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold">12th Grade</h3>
                <ul className="list-disc list-inside">
                  <li>
                    <strong>Board:</strong> {studentData.twelfthBoardName}
                  </li>
                  <li>
                    <strong>Year of Passing:</strong>{" "}
                    {studentData.twelfthYearOfPass}
                  </li>
                  <li>
                    <strong>Medium:</strong> {studentData.twelfthMedium}
                  </li>
                  <li>
                    <strong>Max Marks:</strong> {studentData.twelfthMaxMarks}
                  </li>
                  <li>
                    <strong>Marks Obtained:</strong>{" "}
                    {studentData.twelfthMarksObtained}
                  </li>
                  <li>
                    <strong>Percentage:</strong> {studentData.twelfthPercentage}
                    %
                  </li>
                </ul>
              </div>

              {/* Semester Details */}
              {Array.from({ length: 8 }, (_, index) => (
                <div className="bg-card shadow rounded-lg p-6" key={index}>
                  <h3 className="text-lg font-semibold">
                    Semester {index + 1}
                  </h3>
                  <ul className="list-disc list-inside">
                    <li>
                      <strong>Marks:</strong>{" "}
                      {studentData[`sem${index + 1}Marks`] || "N/A"}
                    </li>
                    <li>
                      <strong>Percentage:</strong>{" "}
                      {studentData[`sem${index + 1}Percentage`] || "N/A"}%
                    </li>
                    <li>
                      <strong>Backlogs:</strong>{" "}
                      {studentData[`sem${index + 1}Backlogs`] || "N/A"}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
