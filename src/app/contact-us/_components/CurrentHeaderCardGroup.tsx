"use client";
import React from "react";
import { HeaderCardGroup } from "~/app/_components/AboutUs/Branches/BranchView";
import useBranch from "~/hooks/useBranch";

export function CurrentHeaderCardGroup({ direction = "horizontal" }: { direction?: "horizontal" | "vertical" }) {
  const { currentBranch } = useBranch();

  if (!currentBranch) return null;
  return <HeaderCardGroup branch={currentBranch} direction={direction} />;
}
