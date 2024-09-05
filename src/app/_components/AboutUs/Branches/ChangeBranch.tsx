"use client";
import React from "react";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Branches } from "./data";
import { useLocalStorage } from "usehooks-ts";

const ChangeBranch = () => {
  const [currentBranch, setCurrentBranch] = useLocalStorage<
    (typeof Branches)[number]
  >("currentBranch", Branches[0], { initializeWithValue: false });
  
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
          onValueChange={(valueBranch) => {
            const selectedBranch = Branches.find(
              (branch) => branch.name === valueBranch,
            );
            if (selectedBranch) {
              setCurrentBranch(selectedBranch);
            }
          }}
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
