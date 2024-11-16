"use server";
import { cookies } from "next/headers";
import { Branches, isBranchName } from "./_components/AboutUs/Branches/data";

export async function setBranch(currentBranchName: string) {
  (await cookies()).set("currentBranchName", currentBranchName);
}

export async function getBranchName() {
  const branchName = (await cookies()).get("currentBranchName")?.value;
  if(branchName && isBranchName(branchName)) {
    return branchName
  }

  return Branches[0].name;
}
