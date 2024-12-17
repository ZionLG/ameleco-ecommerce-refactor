import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

function OpportunitiesButton({
  className,
  ghostVariant,
}: {
  className?: string;
  ghostVariant?: boolean;
}) {
  return (
    <Link
      href={"career"}
      className={cn(
        buttonVariants({
          variant: ghostVariant ? "ghost" : "default",
          size: "lg",
          className: ghostVariant ? "bg-primary-600" : "",
        }),
        className,
      )}
    >
      See Opportunities <ChevronRight />
    </Link>
  );
}

export default OpportunitiesButton;
