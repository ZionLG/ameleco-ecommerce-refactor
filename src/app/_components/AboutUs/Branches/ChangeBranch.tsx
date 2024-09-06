"use client";
import React, { useCallback } from "react";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Branches, isBranchName } from "./data";
import useBranch from "~/hooks/useBranch";

const ChangeBranch = () => {
  const { currentBranch, setCurrentBranchByName } = useBranch();

  const handleOnValueChange = useCallback(
    (value: string) => {
      if (isBranchName(value)) {
        setCurrentBranchByName(value);
      }
    },
    [setCurrentBranchByName],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-1">
          <span className="text-sm underline">Change Branch</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuRadioGroup
          value={currentBranch.name}
          onValueChange={handleOnValueChange}
        >
          {Branches.map((branch) => (
            <DropdownMenuRadioItem key={branch.name} value={branch.name}>
              {branch.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeBranch;
