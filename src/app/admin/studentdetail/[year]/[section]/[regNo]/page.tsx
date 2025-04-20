"use client";
import StudentProfile from "@/app/components/StudentDetail";
import StudentDetailSkeleton from "@/app/components/StudentDetailSkeleton";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

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
  assignments: Semester; // Include the assignments property here
  [key: `sem${number}Marks`]: number | string | null;
  [key: `sem${number}Percentage`]: number | string | null;
  [key: `sem${number}Backlogs`]: number | string | null;
};

type StudentResponse = {
  message: string;
  success: boolean;
  studentData: StudentData | null;
};

const StudentDetail = () => {
  const [student, setStudent] = useState<StudentData | undefined>(undefined);
  const { year, regNo, section } = useParams();

  const getStudentData = useCallback(async (): Promise<StudentResponse> => {
    try {
      const { data } = await axios.get<StudentResponse>(
        `/api/v1/studentDetail/${year}/${section}/${regNo}`
      );
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        message:
          axiosError.response?.data?.message || "An unexpected error occurred",
        studentData: null,
      };
    }
  }, [year, section, regNo]);

  useEffect(() => {
    const fetchStudentData = async () => {
      const studentData = await getStudentData();

      if (!studentData.success || !studentData.studentData) {
        console.log(studentData.message);
      } else {
        setStudent(studentData.studentData);
      }
    };

    fetchStudentData();
  }, [getStudentData]);

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
