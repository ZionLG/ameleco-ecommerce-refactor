'use client';
import React from "react";
import ChangeBranch from "~/app/_components/AboutUs/Branches/ChangeBranch";
import { cn } from "~/lib/utils";

export function BranchNameWithChangeComponent({ branchName, className }: { branchName: string, className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span>{branchName}</span>
      <ChangeBranch />
    </div>
  );
}
