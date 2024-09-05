"use client";
import React from "react";
import Image from "next/image";
import { useLocalStorage } from "usehooks-ts";
import ChangeBranch from "./ChangeBranch";
import { Branches } from "./data";
import { PhoneCall, Clock5, MapPin } from "lucide-react";
import HeaderCard from "~/components/HeaderCard";

export function BranchesView() {
  const [currentBranch] = useLocalStorage<
    (typeof Branches)[number]
  >("currentBranch", Branches[0], { initializeWithValue: false });

  if (!currentBranch) return null;
  return (
    <div className=" flex flex-col items-center"> 
      <span>{currentBranch.name}</span>
      <ChangeBranch />
      <div className="flex">
        <HeaderCard
          Icon={PhoneCall}
          titleText={"Call Us Today"}
          branchData={{
            branch: currentBranch.name,
            data: currentBranch.phone,
          }}
        />
        <HeaderCard
          Icon={Clock5}
          titleText={"When We're Open"}
          branchData={{
            branch: currentBranch.name,
            data: currentBranch.hours,
          }}
        />
        <HeaderCard
          Icon={MapPin}
          titleText={"Where We At"}
          branchData={{
            branch: currentBranch.name,
            data: currentBranch.header_address,
          }}
        />
      </div>
    </div>
  );
}

export function BranchView() {
  const [currentBranch] = useLocalStorage<
    (typeof Branches)[number]
  >("currentBranch", Branches[0], { initializeWithValue: false });

  return (
    <>
      {Branches.map((branch) => (
        <Image
          key={branch.name}
          src={branch.src}
          height={916}
          loading="lazy"
          width={628}
          className={`${
            currentBranch?.name === branch.name ? "" : "invisible hidden"
          } h-[437px] w-[300px]`}
          alt={`Visit us ${branch.visit_address}`}
        />
      ))}
    </>
  );
}
