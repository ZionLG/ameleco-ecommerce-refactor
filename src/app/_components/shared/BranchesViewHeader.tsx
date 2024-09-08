import { HeaderCardGroup } from "~/app/_components/AboutUs/Branches/BranchView";
import { BranchNameWithChangeComponent } from "./BranchNameWithChangeComponent";
import { getBranchName } from "~/app/branchActions";
import { Branches } from "~/app/_components/AboutUs/Branches/data";

export async function BranchesViewHeader() {
  const branchName = await getBranchName();
  const currentBranch = Branches.find((branch) => branch.name === branchName);
  
  if (!currentBranch) return null;
  return (
    <div className="flex flex-col items-center">
      <BranchNameWithChangeComponent branchName={currentBranch.name} />
      <HeaderCardGroup branch={currentBranch} direction="horizontal" />
    </div>
  );
}
