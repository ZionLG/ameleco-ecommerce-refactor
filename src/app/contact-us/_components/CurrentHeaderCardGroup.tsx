import React from "react";
import { HeaderCardGroup } from "~/app/_components/AboutUs/Branches/BranchView";
import { Branches } from "~/app/_components/AboutUs/Branches/data";
import { getBranchName } from "~/app/branchActions";

export async function CurrentHeaderCardGroup({ direction = "horizontal" }: { direction?: "horizontal" | "vertical" }) {
  const branchName = await getBranchName();
  const currentBranch = Branches.find((branch) => branch.name === branchName);
  
  if (!currentBranch) return null;
  return <HeaderCardGroup branch={currentBranch} direction={direction} />;
}
