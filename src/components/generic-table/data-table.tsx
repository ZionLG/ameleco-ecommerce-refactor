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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  Toolbar?: React.ComponentType<DataTableToolbarProps<TData>>;
  MultiActions?: React.ComponentType<DataTableToolbarProps<TData>>;
  data: {
    isLoading: boolean;
    rows: TData[] | undefined;
    pageCount?: number | undefined;
    pagination?: {
      pageIndex: number;
      pageSize: number;
    };
    sorting?: SortingState;
    columnFilters?: ColumnFiltersState;
    initialVisibility: VisibilityState;
    setPagination?: React.Dispatch<React.SetStateAction<PaginationState>>;
    setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
    setColumnFilters?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
    rowClassname?: (row: TData) => string;
  };
}

export function DataTable<TData, TValue>({
  columns,
  MultiActions,
  Toolbar,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(data.initialVisibility);
console.log(rowSelection)
  const table = useReactTable({
    data: data.rows ?? [],
    columns,
    pageCount: data.pageCount ?? -1,
    state: {
      pagination: data.pagination,
      sorting: data.sorting,
      columnVisibility,
      rowSelection,
      columnFilters: data.columnFilters,
    },
    onPaginationChange: data.setPagination,
    onSortingChange: data.setSorting,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: data.setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
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
                  className={`${data.rowClassname ? data.rowClassname(row.original) : ""}`}
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
          {MultiActions && !!table.getRowModel().rows?.length && (
            <TableFooter className="border-t bg-background text-foreground">
              <TableRow>
                {Object.keys(rowSelection).length == 0 && (
                  <TableCell colSpan={table.getVisibleLeafColumns().length - 1}>
                    לא נבחרו שורות
                  </TableCell>
                )}
                {Object.keys(rowSelection).length == 1 && (
                  <TableCell colSpan={table.getVisibleLeafColumns().length - 1}>
                    נבחרה שורה אחת
                  </TableCell>
                )}
                {Object.keys(rowSelection).length > 1 && (
                  <TableCell colSpan={table.getVisibleLeafColumns().length - 1}>
                    נבחרו {Object.keys(rowSelection).length} שורות
                  </TableCell>
                )}
                <TableCell>
                  <MultiActions table={table} isLoading={data.isLoading} />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
      {data.pagination && <DataTablePagination table={table} />}
    </div>
  );
}
