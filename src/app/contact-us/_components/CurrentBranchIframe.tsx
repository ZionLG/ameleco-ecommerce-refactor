import React from "react";
import { Branches } from "~/app/_components/AboutUs/Branches/data";
import { getBranchName } from "~/app/branchActions";
import { BranchIframe } from "~/components/BranchIframe";

async function CurrentBranchIframe() {
  const branchName = await getBranchName();
  const currentBranch = Branches.find((branch) => branch.name === branchName);

  if (!currentBranch) return null;
  return <BranchIframe branch={currentBranch} />;
}

export default CurrentBranchIframe;
