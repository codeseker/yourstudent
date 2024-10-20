"use client";

import * as React from "react";
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

// Data type for each student
export type Student = {
  regNo: string;
  name: string;
  primaryEmail: string;
  cgpa: string | number;
  section: string;
  id: string;
  mobileNumber: string;
};

let role: string;

// Define the columns for the table
export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "image",
    header: () => <div className="text-left">Image</div>,
    cell: () => (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>At</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "regNo",
    header: () => <div className="text-left">Registration No</div>,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("regNo")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left px-0 w-20"
      >
        Name
        <CaretSortIcon className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value: string = row.getValue("name");
      return (
        <div className="text-left capitalize font-semibold text-md">
          {value.toLowerCase()}
        </div>
      );
    },
  },
  {
    accessorKey: "primaryEmail",
    header: () => <div className="text-left">Email Id</div>,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("primaryEmail")}</div>
    ),
  },
  {
    accessorKey: "mobileNumber",
    header: () => <div className="text-left">Phone No</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("mobileNumber")}</div>
    ),
  },
  {
    accessorKey: "section",
    header: () => <div className="text-left">Section</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("section")}</div>
    ),
  },
  {
    accessorKey: "cgpa",
    header: () => <div className="text-left">CGPA</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue("cgpa")}</div>,
    filterFn: (row, columnId, filterValue) => {
      const cgpaValue = parseFloat(row.getValue(columnId));
      const filterNumber = parseFloat(filterValue);

      return !isNaN(filterNumber) && cgpaValue >= filterNumber;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-left">Actions</div>,
    cell: ({ row }) => {
      const student = row.original;
      const year = student.primaryEmail.substring(0, 4);
      const section = student.section.charAt(3);
      return (
        <Button>
          <Link
            href={`/${role}/studentdetail/${year}/${section}/${student.regNo}`}
          >
            View Details
          </Link>
        </Button>
      );
    },
  },
];

// Main component
interface StudentTableProps {
  data: Student[];
  userRole: string;
}

export function StudentDataTable({ data, userRole }: StudentTableProps) {
  role = userRole;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter By CGPA..."
          value={
            (table.getColumn("cgpa")?.getFilterValue() as string | number) ?? ""
          }
          onChange={(event) =>
            table.getColumn("cgpa")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mr-4"
        />
        <Input
          placeholder="Filter Registeration Number..."
          value={(table.getColumn("regNo")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("regNo")?.setFilterValue(event.target.value)
          }
          className="max-w-sm "
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table Styling */}
      <div className="rounded-md">
        <Table className="rounded table-auto w-full ">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-2 text-left font-semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="transition-all duration-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination and other controls */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
