"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import {
  Branches,
  isBranchName,
  type BranchName,
} from "~/app/_components/AboutUs/Branches/data";
import { setBranch, getBranchName } from "~/app/branchActions";
import { getQueryClient } from "~/trpc/react";

function useBranch() {
  const { data: currentBranchName } = useQuery({
    queryKey: [`currentBranchName`],
    queryFn: async () => {
      return await getBranchName();
    },
    refetchOnMount: false,
  });
  const { mutate: mutateBranch } = useMutation({
    mutationFn: setBranch,
    onSuccess: async () => {
      await getQueryClient().invalidateQueries({
        queryKey: ["currentBranchName"],
      });
    },
  });
  const setCurrentBranchByName = useCallback(
    (branchName: BranchName) => {
      if (isBranchName(branchName)) {
        mutateBranch(branchName);
      }
    },
    [mutateBranch],
  );

  const currentBranch = useMemo(
    () => Branches.find((branch) => branch.name === currentBranchName) ?? null,
    [currentBranchName],
  );

  return { currentBranch, setCurrentBranchByName };
}

export default useBranch;
