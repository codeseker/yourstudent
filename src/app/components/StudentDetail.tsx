import { Button } from "@/components/ui/button";
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
};

interface StudentDataProp {
  studentData: StudentData;
}

const StudentProfile = ({ studentData }: StudentDataProp) => {
  return (
    <div className="dark:text-foreground">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
          {/* Left Section */}
          <div className="col-span-1 sm:col-span-1">
            <div className="bg-card  shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/94.jpg"
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  alt="Profile"
                />
                <h1 className="text-xl font-bold capitalize">
                  {studentData.fullName.toLowerCase()}
                </h1>
                <p className="">{studentData.branch}</p>
                <div className="mt-6 flex flex-wrap gap-4 justify-end">
                  <Button>Contact</Button>
                </div>
              </div>
              <hr className="my-6 border-t border" />

              {/* Personal Details Section */}
              <div className="flex flex-col">
                <span className="text-primary uppercase font-bold tracking-wider mb-2">
                  Personal Details
                </span>
                <ul>
                  <li className="mb-2">
                    <strong>Father's Name:</strong> {studentData.fatherName}
                  </li>
                  <li className="mb-2">
                    <strong>Mother's Name:</strong> {studentData.motherName}
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
                    <strong>Father's Mobile:</strong>{" "}
                    {studentData.fatherMobileNo}
                  </li>
                  <li className="mb-2">
                    <strong>Gender:</strong> {studentData.gender}
                  </li>
                  <li className="mb-2">
                    <strong>Home Town:</strong> {studentData.homeTown}
                  </li>
                  <li className="mb-2">
                    <strong>Medium:</strong> {studentData.medium}
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
            <div className=" bg-card dark:text-foreground shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Academic Details</h2>

              {/* Semester-wise Performance */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="mb-2">
                  <strong>Sem 1:</strong> Marks: {studentData.sem1Marks},
                  Percentage: {studentData.sem1Percentage}%, Backlogs:{" "}
                  {studentData.sem1BackLogs}
                </li>
                <li className="mb-2">
                  <strong>Sem 2:</strong> Marks: {studentData.sem2Marks},
                  Percentage: {studentData.sem2Percentage}%, Backlogs:{" "}
                  {studentData.sem2Backlogs}
                </li>
                <li className="mb-2">
                  <strong>Sem 3:</strong> Marks: {studentData.sem3Marks},
                  Percentage: {studentData.sem3Percentage}%, Backlogs:{" "}
                  {studentData.sem3Backlogs}
                </li>
                <li className="mb-2">
                  <strong>Sem 4:</strong> Marks: {studentData.sem4Marks},
                  Percentage: {studentData.sem4Percentage}%, Backlogs:{" "}
                  {studentData.sem4Backlogs}
                </li>
                <li className="mb-2">
                  <strong>Sem 5:</strong> Marks: {studentData.sem5Marks},
                  Percentage: {studentData.sem5Percentage}%, Backlogs:{" "}
                  {studentData.sem5Backlogs}
                </li>
                <li className="mb-2">
                  <strong>Sem 6:</strong> Marks:{" "}
                  {studentData.sem6Marks || "N/A"}, Percentage:{" "}
                  {studentData.sem6Percentage || "N/A"}, Backlogs:{" "}
                  {studentData.sem6Backlogs || "N/A"}
                </li>
                <li className="mb-2">
                  <strong>Sem 7:</strong> Marks:{" "}
                  {studentData.sem7Marks || "N/A"}, Percentage:{" "}
                  {studentData.sem7Percentage || "N/A"}, Backlogs:{" "}
                  {studentData.sem7Backlogs || "N/A"}
                </li>
                <li className="mb-2">
                  <strong>Sem 8:</strong> Marks:{" "}
                  {studentData.sem8Marks || "N/A"}, Percentage:{" "}
                  {studentData.sem8Percentage || "N/A"}, Backlogs:{" "}
                  {studentData.sem8Backlogs || "N/A"}
                </li>
              </ul>

              <hr className="my-6 border-t border-gray-300" />

              {/* Additional Academic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p>
                  <strong>University Roll No:</strong>{" "}
                  {studentData.universityRollNo}
                </p>
                <p>
                  <strong>Registration Number:</strong> {studentData.regNo}
                </p>
                <p>
                  <strong>Total Backlogs:</strong> {studentData.totalBacklogs}
                </p>
                <p>
                  <strong>CGPA:</strong> {studentData.cgpa}
                </p>
                <p>
                  <strong>UG Percentage:</strong> {studentData.ugPercentage}%
                </p>
                <p>
                  <strong>12th Percentage:</strong>{" "}
                  {studentData.twelfthPercentage}%
                </p>
                <p>
                  <strong>10th Percentage:</strong>{" "}
                  {studentData.tenthPercentage}%
                </p>
                <p>
                  <strong>Status:</strong> {studentData.status}
                </p>
                <p>
                  <strong>Academic Gap:</strong> {studentData.academicGap} years
                </p>
                <p>
                  <strong>Tenth Board Name:</strong>{" "}
                  {studentData.tenthBoardName}
                </p>
                <p>
                  <strong>Twelfth Board Name:</strong>{" "}
                  {studentData.twelfthBoardName}
                </p>
                <p>
                  <strong>Tenth Year of Pass:</strong>{" "}
                  {studentData.tenthYearOfPass}
                </p>
                <p>
                  <strong>Twelfth Year of Pass:</strong>{" "}
                  {studentData.twelfthYearOfPass}
                </p>
                <p>
                  <strong>Tenth Max Marks:</strong> {studentData.tenthMaxMarks}
                </p>
                <p>
                  <strong>Twelfth Max Marks:</strong>{" "}
                  {studentData.twelfthMaxMarks}
                </p>
                <p>
                  <strong>Obtained Marks:</strong> {studentData.obtainedMarks}
                </p>
                <p>
                  <strong>Max Marks:</strong> {studentData.maxMarks}
                </p>
                <p>
                  <strong>Twelfth and UG Gap:</strong>{" "}
                  {studentData.twelfthAndUgGap}
                </p>
                <p>
                  <strong>Tenth and Twelfth Gap:</strong>{" "}
                  {studentData.tenthAndTwelfthGap}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
