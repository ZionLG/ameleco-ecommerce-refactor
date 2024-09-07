"use client";

import { HeaderCardGroup } from "~/app/_components/AboutUs/Branches/BranchView";
import ChangeBranch from "~/app/_components/AboutUs/Branches/ChangeBranch";
import useBranch from "~/hooks/useBranch";
import { BranchNameWithChangeComponent } from "./BranchNameWithChangeComponent";

export function BranchesViewHeader() {
  const { currentBranch } = useBranch();

  if (!currentBranch) return null;
  return (
    <div className="flex flex-col items-center">
      <BranchNameWithChangeComponent branchName={currentBranch.name} />
      <HeaderCardGroup branch={currentBranch} direction="horizontal" />
    </div>
  );
}
