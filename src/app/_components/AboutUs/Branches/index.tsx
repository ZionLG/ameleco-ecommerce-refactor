import React from "react";
import ChangeBranch from "./ChangeBranch";
import { BranchView } from "./BranchView";
import { getBranchName, setBranch } from "~/app/branchActions";

async function Branch() {
  const branchName = await getBranchName();

  return (
    <div className="flex flex-col items-center gap-3">
      <ChangeBranch onChange={setBranch} initialBranchName={branchName} />
      <BranchView branchName={branchName} />
    </div>
  );
}

export default Branch;
