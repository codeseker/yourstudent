"use client";
import StudentProfile from "@/app/components/StudentDetail";
import StudentDetailSkeleton from "@/app/components/StudentDetailSkeleton";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

type StudentResponse = {
  message: string;
  success: boolean;
  studentData: StudentData;
};

const StudentDetail = () => {
  const [student, setStudent] = useState<StudentData | undefined>(undefined);
  const { year, regNo, section } = useParams();

  useEffect(() => {
    const fetchBatchData = async () => {
      const studentData: StudentResponse = await getStudentData();

      if (!studentData.success) {
        console.log(studentData.message);
      } else {
        setStudent(studentData.studentData);
      }
    };

    fetchBatchData();
  }, [year, regNo]);

  const getStudentData = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/studentDetail/${year}/${section}/${regNo}`
      );
      return data;
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "An unexpected error occurred",
        studentData: null,
      };
    }
  };

  return (
    <div>
      {student ? (
        <StudentProfile studentData={student} />
      ) : (
        <StudentDetailSkeleton />
      )}
    </div>
  );
};

export default StudentDetail;