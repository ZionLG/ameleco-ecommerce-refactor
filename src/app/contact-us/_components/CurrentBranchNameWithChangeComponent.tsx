"use client";
import React from "react";
import { BranchNameWithChangeComponent } from "~/components/BranchNameWithChangeComponent";
import useBranch from "~/hooks/useBranch";

export function CurrentBranchNameWithChangeComponent({
  className = "",
}: {
  className?: string;
}) {
  const { currentBranch } = useBranch();

  if (!currentBranch) return null;
  return (
    <BranchNameWithChangeComponent
      branchName={currentBranch.name}
      className={className}
    />
  );
}
