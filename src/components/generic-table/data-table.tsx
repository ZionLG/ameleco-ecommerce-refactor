/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
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
    pagination?: {
      pageIndex: number;
      pageSize: number;
    };
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
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(data.initialVisibility);
  console.log(rowSelection);

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
                    <TableHead key={header.id} colSpan={header.colSpan}>
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
                  className={`${data.rowClassname?.(row.original)}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
            {MultiActions && !!table.getRowModel().rows?.length && (
              <TableRow>
                {Object.keys(rowSelection).length == 0 && (
                  <TableCell colSpan={columns.length}>
                    No rows selected
                  </TableCell>
                )}
                {Object.keys(rowSelection).length == 1 && (
                  <TableCell colSpan={columns.length}>
                    1 row selected
                  </TableCell>
                )}
                {Object.keys(rowSelection).length > 1 && (
                  <TableCell colSpan={columns.length}>
                    {Object.keys(rowSelection).length} rows selected
                  </TableCell>
                )}
                <TableCell>
                  <MultiActions table={table} isLoading={data.isLoading} />
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={columns.length}>{FooterCell}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        {/*tes*/}
      </div>
      {data.pagination && <DataTablePagination table={table} />}
    </div>
  );
}
