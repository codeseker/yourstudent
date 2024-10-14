"use client";

import React, { useState } from "react";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

// Define the types within the file
interface Section {
  batch: string;
  sections: string[];
}

interface Teacher {
  role: string;
  email: string;
  assigned_batches: Section[];
}

interface BatchesDataProps {
  data: Teacher[];
}

// Define the columns for the react-table
const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "email",
    header: () => <div>Email</div>,
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: () => <div>Role</div>,
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "assigned_batches",
    header: () => <div>Assigned Batches</div>,
    cell: ({ row }) => {
      const assignedBatches = row.getValue<Section[]>("assigned_batches");
      return (
        <div>
          {assignedBatches.map((batch, index) => (
            <div key={index} className="mt-2">
              <strong>Batch:</strong> {batch.batch} <br />
              <strong>Sections:</strong> {batch.sections.join(", ")}
            </div>
          ))}
        </div>
      );
    },
  },
];

const AssignedTeachersTable: React.FC<BatchesDataProps> = ({ data }) => {
  const [emailFilter, setEmailFilter] = useState(""); // State to store the email filter input

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // Column filter state

  // Initialize the react-table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters, // Attach the filter state
    },
    onColumnFiltersChange: setColumnFilters, // Sync column filter changes with state
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Enable filtering
  });

  // Update the email filter value when the input changes
  const handleEmailFilterChange = (value: string) => {
    setEmailFilter(value);
    table.getColumn("email")?.setFilterValue(value); // Set the filter for the "email" column
  };

  return (
    <div>
      {/* Filter input */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by email..."
          value={emailFilter}
          onChange={(event) => handleEmailFilterChange(event.target.value)}
          className="max-w-sm mr-4"
        />
      </div>

      {/* Table display */}
      <Table className="w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssignedTeachersTable;
