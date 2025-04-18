import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { getCategorySchema } from "./schema";
import { useCallback, useState } from "react";
import AlertDialogWrapper from "~/components/AlertDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "~/trpc/react";

interface DataTableRowActionsProps {
  row: Row<getCategorySchema>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [alertDelete, setAlertDelete] = useState(false);
  const { mutate: deleteCategory, isPending: isDeletePending } =
    useMutation(trpc.categories.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.categories.pathFilter());
        row.toggleSelected(false);
        toast.success("Category has been deleted.");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }));

  const handleOnDeleteClick = useCallback(() => {
    setAlertDelete(true);
  }, []);

  const onDeleteAction = useCallback(() => {
    deleteCategory({
      ids: [row.original.id],
    });
  }, [deleteCategory, row]);

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
        description="This action cannot be undone. This will remove the category and all of it's products."
        title="Are you absolutely sure?"
        isActionDisabled={isDeletePending}
        onConfirm={onDeleteAction}
        isOpen={alertDelete}
        setIsOpen={setAlertDelete}
      />
    </>
  );
}
