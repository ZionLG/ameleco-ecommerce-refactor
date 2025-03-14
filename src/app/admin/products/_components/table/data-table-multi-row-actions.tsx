import type { Table } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import type { getProductSchema } from "./schema";
import { useTRPC } from "~/trpc/react";
import AlertDialogWrapper from "~/components/AlertDialog";

export interface DataTableMultiRowsActionsProps {
  table: Table<getProductSchema>;
}

export function DataTableMultiRowsActions({
  table,
}: DataTableMultiRowsActionsProps) {
  const [alertDelete, setAlertDelete] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { rows } = table.getSelectedRowModel();

  const { mutate: deleteProducts, isPending: isDeletePending } = useMutation(
    trpc.products.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.products.pathFilter());
        table.toggleAllPageRowsSelected(false);
        toast.success("Products have been deleted.");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const onDeleteAction = useCallback(() => {
    deleteProducts({
      ids: rows.map((row) => row.original.id),
    });
  }, [deleteProducts, rows]);

  const handleOnDeleteClick = useCallback(() => {
    setAlertDelete(true);
  }, [setAlertDelete]);

  if (rows.length === 0) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top" className="w-40">
          <DropdownMenuItem
            onSelect={handleOnDeleteClick}
            disabled={isDeletePending}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogWrapper
        description="This action cannot be undone. This will remove the products."
        title="Are you absolutely sure?"
        isActionDisabled={isDeletePending}
        onConfirm={onDeleteAction}
        isOpen={alertDelete}
        setIsOpen={setAlertDelete}
      />
    </>
  );
}
