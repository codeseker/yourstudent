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

interface Assignment {
  batch: string;
  section: string;
  teacher: string;
}

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
  created: Boolean;
}

interface SectionsResponse {
  message: string;
  success: Boolean;
  sections: SingleSection[];
}

interface AssignResponse {
  message: string;
  success: boolean;
}

const TeacherAssignment: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  const [assignedTeachers, setAssignedTeachers] = useState<Assignment[]>([]);
  const [batches, setBatches] = useState<SingleYear[]>([]);
  const [sections, setSections] = useState<SingleSection[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const teachers: string[] = [
    "vivek.saxena@poornima.org",
    "abhishekdhadich@poornima.org",
    "anilkumar@poornima.org",
    "shikhagautam@poornima.org",
    "hp659818@gmail.com",
  ];

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
          console.error("Failed to fetch batches. Message: ", data.message);
        }
      } catch (error) {
        console.error("Error fetching batches: ", error);
      }
    };

    fetchAllBatches();
  }, []);

  const getSections = async (batch: string) => {
    const { data }: { data: SectionsResponse } = await axios.get(
      `/api/v1/allsections/${batch}`
    );

    setSections(data.sections);
  };

  const handleAssign = async () => {
    if (selectedBatch && selectedSection && selectedTeacher) {
      setLoading(true); // Set loading to true before making the API call

      const assignment: Assignment = {
        batch: selectedBatch,
        section: selectedSection,
        teacher: selectedTeacher,
      };

      setAssignedTeachers([...assignedTeachers, assignment]);

      try {
        const { data }: { data: AssignResponse } = await axios.post(
          "/api/v1/admin/assign",
          assignment
        );

        if (!data.success) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
        }
      } catch (error) {
        toast.error("Failed to assign teacher. Please try again.");
        console.error("Error assigning teacher:", error);
      } finally {
        setLoading(false); // Stop loading after the API call is done
      }
    } else {
      toast.error("Please select all the fields");
    }
  };

  return (
    <div className="bg-card">
      <div className="w-full rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">
          Assign Teachers to Sections
        </h1>

        <div className="p-6">
          <h2 className="text-xl font-medium text-gray-600 mb-4">
            Teacher Assignment
          </h2>

          {/* Batch Selection */}
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Batch
          </label>
          <Select
            onValueChange={(value) => {
              setSelectedBatch(value);
              getSections(value);
            }}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Batch" />
            </SelectTrigger>
            <SelectContent>
              {batches.map((batch, index) => (
                <SelectItem value={batch.year} key={index}>
                  {batch.year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Section Selection */}
          <label className="block text-sm font-medium text-gray-600 my-2">
            Section
          </label>
          <Select onValueChange={(value) => setSelectedSection(value)}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Section" />
            </SelectTrigger>
            <SelectContent>
              {sections.map((section, index) => (
                <SelectItem value={section.id} key={index}>
                  {section.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Teacher Selection */}
          <label className="block text-sm font-medium text-gray-600 my-2">
            Teacher
          </label>
          <Select onValueChange={(value) => setSelectedTeacher(value)}>
            <SelectTrigger className="w-full bg-white mb-3">
              <SelectValue placeholder="Select Teacher" />
            </SelectTrigger>
            <SelectContent>
              {teachers.map((ele, index) => (
                <SelectItem value={ele} key={index}>
                  {ele}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Assign Button */}
          <Button
            onClick={handleAssign}
            className="w-full flex justify-center items-center"
            disabled={loading} // Disable button while loading
          >
            {loading ? <Loader /> : "Assign Teacher"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignment;
