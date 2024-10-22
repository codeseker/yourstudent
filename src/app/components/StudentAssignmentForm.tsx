"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component from Shadcn
import axios from "axios";
import { toast } from "sonner";
import Loader from "./Loader"; // Assuming Loader component exists and shows a spinner

// Interfaces for API responses
interface Year {
  year: string;
  totalSections: number;
}

interface TeacherBatch {
  batch: string;
  sections: string[];
}

interface BatchResponse {
  message: string;
  success: boolean;
  years?: Year[];
  batches?: TeacherBatch[];
}

interface SingleSection {
  id: string;
  created: boolean;
}

interface SectionsResponse {
  message: string;
  success: boolean;
  sections: SingleSection[];
}

interface Student {
  regNo: string;
}

interface StudentsResponse {
  message: string;
  success: boolean;
  students: Student[];
}

interface MarksRes {
  message: string;
  success: boolean;
}

interface StudentAssignmentFormProps {
  userRole: string;
  email: string | null | undefined;
}

// Subjects per semester
const subjectsPerSemester: Record<string, string[]> = {
  "Semester 1": ["Mathematics I", "Physics", "Chemistry", "English"],
  "Semester 2": [
    "Mathematics II",
    "Programming",
    "Electronics",
    "Communication Skills",
  ],
  "Semester 3": [
    "Mathematics III",
    "Data Structures",
    "Computer Networks",
    "Digital Logic",
  ],
  "Semester 4": [
    "Operating Systems",
    "Algorithms",
    "Software Engineering",
    "Database Systems",
  ],
  "Semester 5": [
    "Web Development",
    "Machine Learning",
    "Artificial Intelligence",
    "Mobile Computing",
  ],
  "Semester 6": [
    "Cloud Computing",
    "Big Data",
    "Internet of Things",
    "Cybersecurity",
  ],
  "Semester 7": ["Blockchain", "Data Science", "Quantum Computing", "DevOps"],
  "Semester 8": [
    "Final Year Project",
    "Advanced AI",
    "Advanced Data Science",
    "Distributed Systems",
  ],
};

const StudentAssignmentForm: React.FC<StudentAssignmentFormProps> = ({
  userRole,
  email,
}) => {
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedRegNo, setSelectedRegNo] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedAssignment, setSelectedAssignment] = useState<string>("");
  const [marks, setMarks] = useState<string>("");
  const [batches, setBatches] = useState<string[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const [regNos, setRegNos] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sectionDisabled, setSectionDisabled] = useState<boolean>(true);
  const [studentDisabled, setStudentDisabled] = useState<boolean>(true);
  const [semesterDisabled, setSemesterDisabled] = useState<boolean>(true);
  const [subjectDisabled, setSubjectDisabled] = useState<boolean>(true);
  const [assignmentDisabled, setAssignmentDisabled] = useState<boolean>(true);
  const [loadingBatches, setLoadingBatches] = useState<boolean>(true); // State to show skeleton loader
  const [loadingForm, setLoadingForm] = useState<boolean>(true);

  // Fetch all batches (admin or teacher) on component mount
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response =
          userRole === "admin"
            ? await axios.get("/api/v1/completedata")
            : await axios.post("/api/v1/teacher/completedata", { email });

        const data: BatchResponse = response.data;

        if (data.success) {
          const fetchedBatches =
            userRole === "admin"
              ? data.years?.map((year) => year.year) || []
              : data.batches?.map((batch) => batch.batch) || [];
          setBatches(fetchedBatches);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching batches:", error);
        toast.error("Failed to fetch batches.");
      } finally {
        setLoadingForm(false); // Stop showing skeleton once batches are fetched
      }
    };

    fetchBatches();
  }, [userRole, email]);

  // Fetch sections based on selected batch
  const fetchSections = async (batch: string) => {
    try {
      setSectionDisabled(true);
      setStudentDisabled(true);
      setSemesterDisabled(true);
      setSubjectDisabled(true);
      setAssignmentDisabled(true);
      const { data }: { data: SectionsResponse } = await axios.get(
        `/api/v1/allsections/${batch}`
      );

      if (data.success) {
        setSections(data.sections.map((section) => section.id));
        setSectionDisabled(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
      toast.error("Failed to fetch sections.");
    }
  };

  // Fetch students based on selected batch and section
  const fetchStudents = async (batch: string, section: string) => {
    try {
      setStudentDisabled(true);
      const { data }: { data: StudentsResponse } = await axios.get(
        `/api/v1/allstudents/${batch}/${section}`
      );

      if (data.success) {
        setRegNos(data.students);
        setStudentDisabled(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students.");
    }
  };

  const handleAssign = async () => {
    if (
      !selectedBatch ||
      !selectedSection ||
      !selectedRegNo ||
      !selectedSemester ||
      !selectedSubject ||
      !selectedAssignment ||
      !marks
    ) {
      toast.error("Please fill all the fields.");
      return;
    }
    setLoading(true);

    try {
      const { data }: { data: MarksRes } = await axios.post(
        "/api/v1/assignment/marks",
        {
          batch: selectedBatch,
          section: selectedSection,
          regNo: selectedRegNo,
          semester: selectedSemester,
          subject: selectedSubject,
          assignment: selectedAssignment,
          marks,
        }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error submitting marks:", error);
      toast.error("Failed to submit marks.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card p-8 rounded-xl shadow-xl">
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Upload Student Assignment Marks
      </h1>

      {loadingForm ? (
        // Skeleton placeholders for the entire form when loading
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        // Actual form content once loading is done
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectComponent
            label="Batch"
            options={batches}
            onChange={(value) => {
              setSelectedBatch(value);
              fetchSections(value);
            }}
          />

          <SelectComponent
            label="Section"
            options={sections}
            disabled={sectionDisabled}
            onChange={(value) => {
              setSelectedSection(value);
              fetchStudents(selectedBatch, value);
            }}
          />

          <SelectComponent
            label="Reg. No"
            options={regNos.map((student) => student.regNo)}
            disabled={studentDisabled}
            onChange={(value) => {
              setSelectedRegNo(value);
              setSemesterDisabled(false); // Enable Semester after Reg. No is selected
            }}
          />

          <SelectComponent
            label="Semester"
            options={Object.keys(subjectsPerSemester)}
            disabled={semesterDisabled}
            onChange={(value) => {
              setSelectedSemester(value);
              setSubjects(subjectsPerSemester[value]);
              setSubjectDisabled(false); // Enable Subject after Semester is selected
            }}
          />

          <SelectComponent
            label="Subject"
            options={subjects}
            disabled={subjectDisabled}
            onChange={(value) => {
              setSelectedSubject(value);
              setAssignmentDisabled(false); // Enable Assignment after Subject is selected
            }}
          />

          <SelectComponent
            label="Assignment"
            options={["Assignment 1", "Assignment 2", "Assignment 3"]}
            disabled={assignmentDisabled}
            onChange={setSelectedAssignment}
          />

          <InputComponent
            label="Enter Marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
        </div>
      )}

      <Button onClick={handleAssign} className="w-full mt-6" disabled={loading}>
        {loading ? <Loader /> : "Upload Marks"}
      </Button>
    </div>
  );
};

// Select Component
const SelectComponent = ({
  label,
  options,
  onChange,
  disabled,
}: {
  label: string;
  options: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-2">
      {label}
    </label>
    <Select onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

// Input Component
const InputComponent = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-2">
      {label}
    </label>
    <Input value={value} onChange={onChange} placeholder={`Enter ${label}`} />
  </div>
);

export default StudentAssignmentForm;
