"use client";
import React, { useState, ChangeEvent } from "react";

interface User {
  id: number;
  name: string;
  major: string;
  appliedDate: string;
  location: string;
  gpa: string;
  avatar: string;
  year: string;
  skills: string[];
}

interface Filters {
  major: string;
  gpa: string;
  year: string;
}

const ListUser: React.FC = () => {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [filters, setFilters] = useState<Filters>({
    major: "",
    gpa: "",
    year: "",
  });

  const handleOpenDetails = (user: User) => {
    setActiveUser(user === activeUser ? null : user);
  };

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const users: User[] = [
    {
      id: 1,
      name: "John Doe",
      major: "Computer Science",
      appliedDate: "21 Aug, 2023",
      location: "California State University",
      gpa: "3.8",
      avatar: "https://via.placeholder.com/48",
      year: "Senior",
      skills: ["JavaScript", "React", "Node.js"],
    },
    {
      id: 2,
      name: "Emily Clark",
      major: "Mechanical Engineering",
      appliedDate: "17 Jul, 2023",
      location: "MIT",
      gpa: "4.0",
      avatar: "https://via.placeholder.com/48",
      year: "Junior",
      skills: ["AutoCAD", "SolidWorks", "MATLAB"],
    },
    {
      id: 3,
      name: "Michael Lee",
      major: "Electrical Engineering",
      appliedDate: "15 Jun, 2023",
      location: "Stanford University",
      gpa: "3.7",
      avatar: "https://via.placeholder.com/48",
      year: "Sophomore",
      skills: ["Circuit Design", "VHDL", "FPGA"],
    },
    {
      id: 4,
      name: "Sarah Johnson",
      major: "Biotechnology",
      appliedDate: "11 May, 2023",
      location: "Harvard University",
      gpa: "3.9",
      avatar: "https://via.placeholder.com/48",
      year: "Senior",
      skills: ["PCR", "Gene Editing", "Bioinformatics"],
    },
  ];

  const filteredUsers = users.filter((user) => {
    return (
      (filters.major === "" || user.major.includes(filters.major)) &&
      (filters.gpa === "" || user.gpa >= filters.gpa) &&
      (filters.year === "" || user.year === filters.year)
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-6 shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Filter Students
        </h3>

        {/* Major Filter */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Major
          </label>
          <input
            type="text"
            name="major"
            value={filters.major}
            onChange={handleFilterChange}
            className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2"
            placeholder="e.g., Computer Science"
          />
        </div>

        {/* GPA Filter */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Minimum GPA
          </label>
          <input
            type="number"
            name="gpa"
            value={filters.gpa}
            onChange={handleFilterChange}
            className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2"
            placeholder="e.g., 3.5"
          />
        </div>

        {/* Year Filter */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Year
          </label>
          <select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2"
          >
            <option value="">Select Year</option>
            <option value="Freshman">Freshman</option>
            <option value="Sophomore">Sophomore</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6 space-y-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md p-6 rounded-lg flex justify-between items-center transition-transform transform hover:scale-95"
            >
              <div className="flex items-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full mr-6"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-600">{user.major}</p>
                  <p className="text-xs text-gray-400">
                    Applied on: {user.appliedDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleOpenDetails(user)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
                >
                  {activeUser === user ? "Hide Details" : "Show Details"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white shadow-md p-6 rounded-lg">
            <p className="text-gray-500 text-lg">
              No students match your filter criteria.
            </p>
          </div>
        )}

        {activeUser && (
          <div className="bg-gray-100 p-6 rounded-lg mt-6 shadow-inner">
            <h3 className="text-lg font-bold text-gray-700">
              Details for {activeUser.name}
            </h3>
            <p>
              <strong>Major:</strong> {activeUser.major}
            </p>
            <p>
              <strong>Location:</strong> {activeUser.location}
            </p>
            <p>
              <strong>GPA:</strong> {activeUser.gpa}
            </p>
            <p>
              <strong>Year:</strong> {activeUser.year}
            </p>
            <p>
              <strong>Skills:</strong> {activeUser.skills.join(", ")}
            </p>
            <p>
              <strong>Applied On:</strong> {activeUser.appliedDate}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListUser;
