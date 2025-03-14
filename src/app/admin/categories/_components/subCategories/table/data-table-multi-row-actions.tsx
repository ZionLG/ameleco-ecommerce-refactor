import type { Table } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { getSubCategorySchema } from "./schema";
import { useTRPC } from "~/trpc/react";
import AlertDialogWrapper from "~/components/AlertDialog";

export interface DataTableMultiRowsActionsProps {
  table: Table<getSubCategorySchema>;
}

export function DataTableMultiRowsActions({
  table,
}: DataTableMultiRowsActionsProps) {
  const [alertDelete, setAlertDelete] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { rows } = table.getSelectedRowModel();
  const { mutate: deleteSubCategories, isPending: isDeletePending } =
    useMutation(
      trpc.subCategories.delete.mutationOptions({
        onSuccess: async () => {
          await queryClient.invalidateQueries(trpc.subCategories.pathFilter());
          table.toggleAllPageRowsSelected(false);
          toast.success("Sub categories have been deleted.");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }),
    );

  const onDeleteAction = useCallback(() => {
    deleteSubCategories({
      ids: rows.map((row) => row.original.id),
    });
  }, [deleteSubCategories, rows]);

  const handleOnDeleteClick = useCallback(() => {
    setAlertDelete(true);
  }, []);

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
        description="This action cannot be undone. his will remove the sub category and their corresponding sub sub categories and products."
        title="Are you absolutely sure?"
        isActionDisabled={isDeletePending}
        onConfirm={onDeleteAction}
        isOpen={alertDelete}
        setIsOpen={setAlertDelete}
      />
    </>
  );
}
