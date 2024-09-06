"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";
import {
  Branches,
  type BranchName,
} from "~/app/_components/AboutUs/Branches/data";
import { setBranch, getBranchName } from "~/app/branchActions";

function useBranch() {
  const { mutate: mutateBranch } = useMutation({
    mutationFn: setBranch,
  });
  const { data: currentBranchName } = useQuery({
    queryKey: [`currentBranchName`],
    queryFn: async () => {
      return await getBranchName();
    },
    refetchOnMount: false,
  });
  const initialBranch =
    Branches.find((branch) => branch.name === currentBranchName) ?? Branches[0];
  const [currentBranch, setCurrentBranch] =
    useState<(typeof Branches)[number]>(initialBranch);

  const setCurrentBranchByName = useCallback(
    (branchName: BranchName) => {
      const branch = Branches.find((branch) => branch.name === branchName);
      if (branch) {
        setCurrentBranch(branch);
      }
    },
    [setCurrentBranch],
  );

  useEffect(() => {
    mutateBranch(currentBranch.name);
  }, [mutateBranch, currentBranch]);

  return { currentBranch, setCurrentBranchByName };
}

export default useBranch;
