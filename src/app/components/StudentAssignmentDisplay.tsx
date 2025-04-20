"use client";

import { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

type StudentAssignments = {
  assignments: Semester;
};

const StudentAssignmentsDisplay = ({ assignments }: StudentAssignments) => {
  return (
    <div className="p-6">
      <Accordion type="single" collapsible className="space-y-4">
        {Object.entries(assignments).map(([semester, subjects]) => (
          <AccordionItem key={semester} value={semester} className="border border-gray-200 rounded-lg shadow-md">
            <AccordionTrigger className="p-4 text-lg font-semibold rounded-t-lg">
              {semester}
            </AccordionTrigger>
            <AccordionContent className="bg-white p-4">
              {Object.entries(subjects).map(([subject, assignments]) => (
                <Card key={subject} className="mb-6 border border-gray-200 rounded-lg shadow-lg">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg mb-3">
                    <CardTitle className="text-xl font-semibold text-gray-800">{subject}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table className="w-full border-collapse my-3">
                      <TableHeader className="">
                        <TableRow className="">
                          <TableHead className="py-2 px-4 text-left text-gray-700">Assignment</TableHead>
                          <TableHead className="py-2 px-4 text-left text-gray-700">Marks</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {assignments.map((assignment, index) => (
                          <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                            <TableCell className="py-2 px-4 text-gray-800">{assignment.assignment}</TableCell>
                            <TableCell className="py-2 px-4 text-gray-800">{assignment.marks}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default StudentAssignmentsDisplay;
