import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { getSubCategorySchema } from "./schema";
import { useCallback, useState } from "react";
import AlertDialogWrapper from "~/components/AlertDialog";

interface DataTableRowActionsProps {
  row: Row<getSubCategorySchema>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [alertDelete, setAlertDelete] = useState(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutate: deleteSubCategory, isPending: isDeletePending } =
    useMutation(trpc.subCategories.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.subCategories.pathFilter());
        row.toggleSelected(false);
        toast.success("Sub category has been deleted.");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }));

  const handleOnDeleteClick = useCallback(() => {
    setAlertDelete(true);
  }, []);

  const onDeleteAction = useCallback(() => {
    deleteSubCategory({
      ids: [row.original.id],
    });
  }, [deleteSubCategory, row]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted ltr:ml-auto rtl:mr-auto"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={handleOnDeleteClick} disabled={isDeletePending}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogWrapper
        description="This action cannot be undone. This will remove the sub category and their corresponding sub sub categories and products."
        title="Are you absolutely sure?"
        isActionDisabled={isDeletePending}
        onConfirm={onDeleteAction}
        isOpen={alertDelete}
        setIsOpen={setAlertDelete}
      />
    </>
  );
}
