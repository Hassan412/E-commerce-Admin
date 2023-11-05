"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ColorsColumn = {
  id: string;
  name: string;
  value: string
  createdAt: string;
};

export const columns: ColumnDef<ColorsColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    header: "Value",
    cell: ({ row })=> (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div
        className="h-6 w-6 rounded-full border"
        style={{background: row.original.value}} 
        />
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Options",
  },
];
