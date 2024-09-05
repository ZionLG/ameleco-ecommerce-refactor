"use client";
import React from "react";
import ChangeBranch from "./ChangeBranch";
import { BranchView } from "./BranchView";

function Branch() {
  return (
    <div className="flex flex-col items-center gap-3">
      <ChangeBranch />
      <BranchView />
    </div>
  );
}

export default Branch;
