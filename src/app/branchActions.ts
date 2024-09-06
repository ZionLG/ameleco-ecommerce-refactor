"use server";
import { cookies } from "next/headers";

export async function setBranch(currentBranchName: string) {
  cookies().set("currentBranchName", currentBranchName);
}

export async function getBranchName() {
  return cookies().get("currentBranchName")?.value;
}
