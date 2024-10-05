"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

// Define the structure for assignments
interface Assignment {
  subject: string;
  marks: number;
}

// Define props for AssignmentForm
interface AssignmentFormProps {
  addAssignment: (semester: number, assignment: Assignment) => void;
  semester: number;
}

// Define props for SemesterMarks
interface SemesterMarksProps {
  semester: number;
  marks: Assignment[];
}

// Define different subjects for each semester
const subjectsPerSemester: Record<number, string[]> = {
  1: ["Mathematics I", "Physics", "Chemistry", "English"],
  2: ["Mathematics II", "Programming", "Electronics", "Communication Skills"],
  3: [
    "Mathematics III",
    "Data Structures",
    "Computer Networks",
    "Digital Logic",
  ],
  4: [
    "Operating Systems",
    "Algorithms",
    "Software Engineering",
    "Database Systems",
  ],
  5: [
    "Web Development",
    "Machine Learning",
    "Artificial Intelligence",
    "Mobile Computing",
  ],
  6: ["Cloud Computing", "Big Data", "Internet of Things", "Cybersecurity"],
  7: ["Blockchain", "Data Science", "Quantum Computing", "DevOps"],
  8: [
    "Final Year Project",
    "Advanced AI",
    "Advanced Data Science",
    "Distributed Systems",
  ],
};

// Form component to add assignments for each semester
const AssignmentForm: React.FC<AssignmentFormProps> = ({
  addAssignment,
  semester,
}) => {
  const [subject, setSubject] = useState<string>(
    subjectsPerSemester[semester][0]
  );
  const [marks, setMarks] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (marks) {
      addAssignment(semester, { subject, marks: parseInt(marks, 10) });
      setMarks("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg shadow-lg"
    >
      <h3 className="text-lg font-semibold">
        Add Marks for Semester {semester}
      </h3>
      <select
        value={subject}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setSubject(e.target.value)
        }
        className="p-2 border border-gray-300 rounded-md"
      >
        {subjectsPerSemester[semester].map((sub) => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Enter Marks"
        value={marks}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMarks(e.target.value)
        }
        className="p-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
      >
        Add Marks
      </button>
    </form>
  );
};

// Component to display marks for a semester
const SemesterMarks: React.FC<SemesterMarksProps> = ({ semester, marks }) => (
  <div className="p-4 border rounded-md bg-white shadow-lg">
    <h3 className="text-lg font-semibold">Semester {semester} Marks</h3>
    <table className="w-full mt-4">
      <thead>
        <tr className="border-b-2">
          <th className="py-2 px-4">Subject</th>
          <th className="py-2 px-4">Marks</th>
        </tr>
      </thead>
      <tbody>
        {marks.length > 0 ? (
          marks.map((mark, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4">{mark.subject}</td>
              <td className="py-2 px-4">{mark.marks}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={2} className="py-2 px-4 text-center">
              No marks added yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

// Main component to handle assignments and semester selection
const StudentAssignments: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[][]>(
    Array(8).fill([])
  );
  const [selectedSemester, setSelectedSemester] = useState<number>(1);

  const addAssignment = (semester: number, newAssignment: Assignment) => {
    setAssignments((prev) =>
      prev.map((marks, index) =>
        index === semester - 1 ? [...marks, newAssignment] : marks
      )
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Student Assignment Marks
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <div className="bg-white p-4 rounded-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Select Semester</h2>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <button
                key={index}
                className={`p-2 rounded-md ${
                  selectedSemester === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedSemester(index + 1)}
              >
                Semester {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SemesterMarks
          semester={selectedSemester}
          marks={assignments[selectedSemester - 1]}
        />
        <AssignmentForm
          semester={selectedSemester}
          addAssignment={addAssignment}
        />
      </div>
    </div>
  );
};

export default StudentAssignments;
