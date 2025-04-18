"use client";
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/generic-table/data-table-column-header";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import type { getSubSubCategorySchema } from "./schema";
import { DataTableRowActions } from "./data-table-row-actions";

const columnHelper = createColumnHelper<getSubSubCategorySchema>();

export const columns: ColumnDef<getSubSubCategorySchema>[] = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all in page"
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
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "subCategory.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sub category Name" />
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "subCategory.category.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category Name" />
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => row.original.createdAt.toLocaleString("en-CA"),
    meta: {
      cellClassName: "whitespace-nowrap	",
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
