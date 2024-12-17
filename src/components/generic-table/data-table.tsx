/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  Table as TableType,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";

export interface DataTableToolbarProps<TData> {
  table: TableType<TData>;
  isLoading: boolean;
}

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  Toolbar?: React.ComponentType<DataTableToolbarProps<TData>>;
  MultiActions?: React.ComponentType<DataTableToolbarProps<TData>>;
  FooterCell?: React.ReactNode;
  data: {
    isLoading: boolean;
    rows: TData[] | undefined;
    initialVisibility: VisibilityState;
    rowClassname?: (row: TData) => string;
    setPagination?: React.Dispatch<React.SetStateAction<PaginationState>>;
    pagination?: PaginationState;
    setColumnFilters?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
    columnFilters?: ColumnFiltersState;
    setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
    sorting?: SortingState;
  };
  manual?: {
    pageCount: number;
  };
}

export function DataTable<TData>({
  columns,
  MultiActions,
  Toolbar,
  data,
  manual,
  FooterCell,
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({});
  const rowsSelectedLength = useMemo(
    () => Object.keys(rowSelection).length,
    [rowSelection],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(data.initialVisibility);

  const table = useReactTable({
    data: data.rows ?? [],
    columns,
    enableRowSelection: true,
    state: {
      columnVisibility,
      rowSelection,
      pagination: data.pagination,
      sorting: data.sorting,
      columnFilters: data.columnFilters,
    },
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: !!manual,
    manualSorting: !!manual,
    manualFiltering: !!manual,
    onPaginationChange: data.setPagination,
    onSortingChange: data.setSorting,
    onColumnFiltersChange: data.setColumnFilters,
    pageCount: manual?.pageCount,
    // debugTable: true,
  });

  return (
    <div className="w-full space-y-4">
      {Toolbar && <Toolbar table={table} isLoading={data.isLoading} />}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={header.column.columnDef.meta?.headerClassName}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell.column.columnDef.meta?.cellClassName}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter className="border-t bg-background text-foreground">
            {MultiActions && !!rowsSelectedLength && (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <div className="flex items-center justify-between capitalize">
                    <span>
                      {rowsSelectedLength} row{rowsSelectedLength > 1 && "s"}{" "}
                      selected
                    </span>
                    <MultiActions table={table} isLoading={data.isLoading} />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {(FooterCell ?? (MultiActions && !rowsSelectedLength)) && (
              <TableRow>
                <TableCell colSpan={columns.length}>{FooterCell}</TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </div>
      {data.pagination && <DataTablePagination table={table} />}
    </div>
  );
}
