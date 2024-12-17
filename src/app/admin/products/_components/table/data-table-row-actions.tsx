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
import type { getProductSchema } from "./schema";
import { api } from "~/trpc/react";
import { useCallback, useState } from "react";
import AlertDialogWrapper from "~/components/AlertDialog";

interface DataTableRowActionsProps {
  row: Row<getProductSchema>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const utils = api.useUtils();
  const [alertDelete, setAlertDelete] = useState(false);
  const { mutate: deleteProduct, isPending: isDeletePending } =
    api.products.delete.useMutation({
      onSuccess: async () => {
        await utils.categories.invalidate();
        row.toggleSelected(false);
        toast.success("Product has been deleted.");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const handleOnDeleteClick = useCallback(() => {
    setAlertDelete(true);
  }, [setAlertDelete]);

  const onDeleteAction = useCallback(() => {
    deleteProduct({
      ids: [row.original.id],
    });
  }, [deleteProduct, row]);

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
        description="This action cannot be undone. This will remove the product."
        title="Are you absolutely sure?"
        isActionDisabled={isDeletePending}
        onConfirm={onDeleteAction}
        isOpen={alertDelete}
        setIsOpen={setAlertDelete}
      />
    </>
  );
}
