'use client';
import React from "react";
import { BranchIframe } from "~/components/BranchIframe";
import { Skeleton } from "~/components/ui/skeleton";
import useBranch from "~/hooks/useBranch";

function CurrentBranchIframe() {
  const { currentBranch } = useBranch();

  if (!currentBranch) return <Skeleton className="h-[350px] w-full" />;
  return <BranchIframe branch={currentBranch} />;
}

export default CurrentBranchIframe;
