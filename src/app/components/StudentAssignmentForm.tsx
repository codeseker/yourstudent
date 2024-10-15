"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";
import Loader from "./Loader";
import { Input } from "@/components/ui/input";

interface SingleYear {
  year: string;
  totalSections: number;
}

interface BatchResponse {
  message: string;
  years: SingleYear[];
  success: boolean;
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
  students: Student[];
  success: boolean;
}

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

interface MarksRes {
  message: string;
  success: boolean;
}

interface Res {
  data: MarksRes;
}

const StudentAssignmentForm: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedRegNo, setSelectedRegNo] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedAssignment, setSelectedAssignment] = useState<string>("");
  const [batches, setBatches] = useState<SingleYear[]>([]);
  const [sections, setSections] = useState<SingleSection[]>([]);
  const [regNos, setRegNos] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [marks, setMarks] = useState<string>("");

  // Fetch batches from API
  useEffect(() => {
    const fetchAllBatches = async () => {
      try {
        const { data }: { data: BatchResponse } = await axios.get(
          "/api/v1/completedata"
        );
        if (data.success) {
          setBatches(data.years);
        } else {
          console.error("Failed to fetch batches:", data.message);
        }
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };
    fetchAllBatches();
  }, []);

  const getSections = async (batch: string) => {
    try {
      const { data }: { data: SectionsResponse } = await axios.get(
        `/api/v1/allsections/${batch}`
      );
      setSections(data.sections);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  const handleBatchChange = (batch: string) => {
    setSelectedBatch(batch);
    setSelectedSection("");
    setSections([]);
    getSections(batch);
  };

  const getStudents = async (batch: string, section: string) => {
    try {
      const { data }: { data: StudentsResponse } = await axios.get(
        `/api/v1/allstudents/${batch}/${section}`
      );
      if (data.success) {
        setRegNos(data.students);
      } else {
        console.error("Failed to fetch students:", data.message);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSemesterChange = (semester: string) => {
    setSelectedSemester(semester);
    setSubjects(subjectsPerSemester[semester] || []);
  };

  const handleAssign = async () => {
    if (
      selectedBatch &&
      selectedSection &&
      selectedRegNo &&
      selectedSemester &&
      selectedSubject &&
      selectedAssignment
    ) {
      setLoading(true);
      try {
        const { data }: Res = await axios.post("/api/v1/assignment/marks", {
          batch: selectedBatch,
          section: selectedSection,
          regNo: selectedRegNo,
          semester: selectedSemester,
          subject: selectedSubject,
          assignment: selectedAssignment,
          marks,
        });

        setLoading(false);

        if (!data.success) {
          toast(data.message);
          return;
        }

        toast.success(data.message);
      } catch (error) {
        toast.error("Internal Server Error");
      }
    } else {
      toast.error("Please fill all the fields.");
    }
  };

  return (
    <div className="bg-card">
      <div className="w-full rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-4">
          Upload Student Assignment Marks
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Batch
              </label>
              <Select onValueChange={handleBatchChange}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select Batch" />
                </SelectTrigger>
                <SelectContent>
                  {batches.map((batch) => (
                    <SelectItem value={batch.year} key={batch.year}>
                      {batch.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Section
              </label>
              <Select
                onValueChange={(value) => {
                  setSelectedSection(value);
                  getStudents(selectedBatch, value);
                }}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((section) => (
                    <SelectItem value={section.id} key={section.id}>
                      {section.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Reg. No
              </label>
              <Select onValueChange={setSelectedRegNo}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select Reg. No" />
                </SelectTrigger>
                <SelectContent>
                  {regNos.map((student) => (
                    <SelectItem value={student.regNo} key={student.regNo}>
                      {student.regNo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Semester
              </label>
              <Select onValueChange={handleSemesterChange}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(subjectsPerSemester).map((semester) => (
                    <SelectItem value={semester} key={semester}>
                      {semester}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Subject
              </label>
              <Select onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem value={subject} key={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Assignment
              </label>
              <Select onValueChange={setSelectedAssignment}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select Assignment No." />
                </SelectTrigger>
                <SelectContent>
                  {["Assignment 1", "Assignment 2", "Assignment 3"].map(
                    (assignment) => (
                      <SelectItem value={assignment} key={assignment}>
                        {assignment}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Enter Marks
              </label>
              <Input
                placeholder="Enter Marks..."
                className=""
                onChange={(e) => setMarks(e.target.value)}
              />
            </div>

            <Button
              onClick={handleAssign}
              className="w-full "
              disabled={loading}
            >
              {loading ? <Loader /> : "Upload Marks"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAssignmentForm;
