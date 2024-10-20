"use client";
import Navbar from "@/app/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect, ChangeEvent } from "react";

interface Student {
  id: string;
  regNo: string;
  batch: string;
  section: string;
  fullName: string;
  branch: string;
  gender: string;
  cgpa: string;
  dob: string;
  mobileNumber: string;
  fatherName: string;
  motherName: string;
  homeTown: string;
}

interface Filters {
  branch: string;
  cgpa: string;
  gender: string;
}

const ListUser: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filters, setFilters] = useState<Filters>({
    branch: "",
    cgpa: "",
    gender: "",
  });

  const { name } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.post("/api/v1/query", {
          name: decodeURIComponent(name[0]),
        });
        setStudents(response.data.students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [name]);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleStudentClick = (student: Student) => {
    router.push(
      `/teacher/studentdetail/${student.batch}/${student.section}/${student.regNo}`
    );
  };

  const filteredStudents = students.filter((student) => {
    return (
      (filters.branch === "" || student.branch.includes(filters.branch)) &&
      (filters.cgpa === "" ||
        parseFloat(student.cgpa) >= parseFloat(filters.cgpa)) &&
      (filters.gender === "" || student.gender === filters.gender)
    );
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row my-8 mx-4 md:mx-16 space-y-6 md:space-y-0 md:space-x-6">
        {/* Filter Section */}
        <div className="w-full md:w-1/4 bg-white p-8 shadow-xl rounded-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">
            Filter Students
          </h3>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Branch
            </label>
            <Input
              type="text"
              name="branch"
              value={filters.branch}
              onChange={handleFilterChange}
              className="p-3"
              placeholder="e.g., Computer Science"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Minimum CGPA
            </label>
            <Input
              type="number"
              name="cgpa"
              value={filters.cgpa}
              onChange={handleFilterChange}
              className="p-3"
              placeholder="e.g., 3.5"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gender
            </label>

            <Select
              value={filters.gender}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, gender: value }))
              }
            >
              <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg p-3">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                {["Male", "Female"].map((ele, index) => (
                  <SelectItem value={ele} key={index}>
                    {ele}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Student List Section */}
        <div className="w-full md:w-full space-y-6  ">
          {/* Total Students Label */}
          <Badge className="h-8">
            Total Students: {filteredStudents.length}
          </Badge>

          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                className="bg-white shadow-md p-6 rounded-lg flex justify-between items-center cursor-pointer transform hover:scale-95 transition-transform duration-200"
                onClick={() => handleStudentClick(student)}
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {student.fullName}
                  </h2>
                  <p className="text-sm text-gray-600">{student.branch}</p>
                  <p className="text-xs text-gray-400">
                    Registration No: {student.regNo}
                  </p>
                </div>
                <Button className="">View Details</Button>
              </div>
            ))
          ) : (
            <div className="bg-white shadow-md p-6 rounded-lg">
              <p className="text-gray-500 text-lg">
                No students match your filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListUser;
