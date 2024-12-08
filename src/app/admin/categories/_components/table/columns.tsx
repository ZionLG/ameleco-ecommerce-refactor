"use client";
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/generic-table/data-table-column-header";
import { createColumnHelper } from "@tanstack/react-table";
import type { getCategorySchema } from "./schema";

const columnHelper = createColumnHelper<getCategorySchema>();

export const columns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("id", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor("name", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableSorting: true,
    enableHiding: false,
  }),

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
]
