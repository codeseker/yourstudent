"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import Loader from "./Loader";
import StudentAssignmentsDisplay from "./StudentAssignmentDisplay";

type Assignment = {
  assignment: string;
  marks: string | number;
};

type Subject = {
  [subjectName: string]: Assignment[];
};

type Semester = {
  [semesterName: string]: Subject;
};

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
  assignments: Semester;
  [key: `sem${number}Marks`]: number | string | null;
  [key: `sem${number}Percentage`]: number | string | null;
  [key: `sem${number}Backlogs`]: number | string | null;
};

interface StudentDataProp {
  studentData: StudentData;
}

interface Res {
  message: string;
  success: boolean;
}

const StudentProfile = ({ studentData }: StudentDataProp) => {
  const [contactNumber, setContactNumber] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdateContact = async () => {
    setLoading(true);
    const path = window.location.pathname;
    const parts = path.split("/");
    const batch = parts[3];
    const section = parts[4];
    const regNo = parts[5];

    const { data }: { data: Res } = await axios.post(
      "/api/v1/student/editContact",
      {
        number: contactNumber,
        batch,
        section,
        regNo,
      }
    );

    setLoading(false);

    if (!data.success) {
      toast.error(data.message);
      return;
    }
    studentData.mobileNumber = contactNumber;
    toast.success(data.message);

    setIsDialogOpen(false);
    setContactNumber("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleUpdateContact();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full">
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div className="flex items-center gap-4">
              <Image
                width={120}
                height={120}
                src="https://randomuser.me/api/portraits/men/94.jpg"
                alt="Profile"
                className="rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold">{studentData.fullName}</h1>
                <p className="text-gray-600">{studentData.branch}</p>
              </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>Edit Contact</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Contact</DialogTitle>
                  <DialogDescription>
                    Update your contact details below.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    type="text"
                    value={contactNumber}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Enter new contact number"
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleUpdateContact}>
                    {loading ? <Loader /> : "Confirm"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1 bg-gray-50 p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Personal Details</h2>
              <ul className="mt-4 space-y-2">
                <li><strong>Father's Name:</strong> {studentData.fatherName}</li>
                <li><strong>Mother's Name:</strong> {studentData.motherName}</li>
                <li><strong>Date of Birth:</strong> {studentData.dob}</li>
                <li><strong>Address:</strong> {studentData.permanentAddress}</li>
                <li><strong>Mobile Number:</strong> {studentData.mobileNumber}</li>
                <li><strong>Gender:</strong> {studentData.gender}</li>
                <li><strong>Home Town:</strong> {studentData.homeTown}</li>
                <li><strong>State:</strong> {studentData.state}</li>
              </ul>
            </div>

            <div className="col-span-1 bg-gray-50 p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold">10th Grade</h2>
              <ul className="mt-4 space-y-2">
                <li><strong>Board:</strong> {studentData.tenthBoardName}</li>
                <li><strong>Year of Passing:</strong> {studentData.tenthYearOfPass}</li>
                <li><strong>Percentage:</strong> {studentData.tenthPercentage}%</li>
              </ul>
            </div>

            <div className="col-span-1 bg-gray-50 p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold">12th Grade</h2>
              <ul className="mt-4 space-y-2">
                <li><strong>Board:</strong> {studentData.twelfthBoardName}</li>
                <li><strong>Year of Passing:</strong> {studentData.twelfthYearOfPass}</li>
                <li><strong>Percentage:</strong> {studentData.twelfthPercentage}%</li>
              </ul>
            </div>
          </div>

          <h2 className="text-lg font-semibold mt-10 mb-6">Semester Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }, (_, index) => (
              <div
                className="bg-gray-50 p-6 rounded-lg shadow"
                key={index}
              >
                <h3 className="text-md font-semibold">Semester {index + 1}</h3>
                <ul className="mt-2 space-y-1">
                  <li><strong>Marks:</strong> {studentData[`sem${index + 1}Marks`] || "N/A"}</li>
                  <li><strong>Percentage:</strong> {studentData[`sem${index + 1}Percentage`] || "N/A"}%</li>
                  <li><strong>Backlogs:</strong> {studentData[`sem${index + 1}Backlogs`] || "N/A"}</li>
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10">
          <h2 className="text-lg font-semibold mt-10 ">Assignment Marks</h2>
            <StudentAssignmentsDisplay assignments={studentData.assignments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
