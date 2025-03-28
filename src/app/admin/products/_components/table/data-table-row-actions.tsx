import type { Row } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { getProductSchema } from "./schema";
import { useTRPC } from "~/trpc/react";
import { useCallback, useState } from "react";
import AlertDialogWrapper from "~/components/AlertDialog";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps {
  row: Row<getProductSchema>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [alertDelete, setAlertDelete] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: deleteProduct, isPending: isDeletePending } = useMutation(
    trpc.products.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.products.pathFilter());
        row.toggleSelected(false);
        toast.success("Product has been deleted.");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const handleOnDeleteClick = useCallback(() => {
    setAlertDelete(true);
  }, [setAlertDelete]);

  const onDeleteAction = useCallback(() => {
    deleteProduct({
      ids: [row.original.id],
    });
  }, [deleteProduct, row]);

  const handleEdit = useCallback(() => {
    router.push(`/admin/products/edit/${row.original.id}`);
  }, [router, row]);

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
          <DropdownMenuItem onClick={handleEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleOnDeleteClick}
            disabled={isDeletePending}
            className="text-destructive"
          >
            <Trash className="mr-2 h-4 w-4" />
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
