"use client";

import React, { useState } from "react";
import {
  type ColumnFiltersState,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table";
import { DataTable } from "~/components/generic-table/data-table";
import { api } from "~/trpc/react";
import { columns } from "./columns";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTableMultiRowsActions } from "./data-table-multi-row-actions";
import { productFilterSchema, productSortSchema } from "~/lib/validators";



function ProductsTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const { pageIndex, pageSize } = pagination;

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const { data, isFetching } = api.products.getProducts.useQuery(
    {
      limit: pageSize,
      offset: pageIndex * pageSize,
      sort: productSortSchema.parse(sorting),
      filter: productFilterSchema.parse(columnFilters),
    },
    {
      placeholderData: (previous) => previous,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <DataTable
      Toolbar={DataTableToolbar}
      MultiActions={DataTableMultiRowsActions}
      data={{
        isLoading: isFetching,
        rows: data,
        initialVisibility: {
          id: false,
        },
        pagination,
        setPagination,
        columnFilters,
        setColumnFilters,
        sorting,
        setSorting,
      }}
      columns={columns}
    />
  );
}

export default ProductsTable;
