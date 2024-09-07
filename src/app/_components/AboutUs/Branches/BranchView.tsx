"use client";
import React from "react";
import Image from "next/image";
import { type Branch, Branches } from "./data";
import { PhoneCall, Clock5, MapPin } from "lucide-react";
import HeaderCard from "~/components/HeaderCard";
import useBranch from "~/hooks/useBranch";
import { cn } from "~/lib/utils";

type HeaderCardGroupProps = {
  direction: 'vertical' | 'horizontal';
  branch: Branch;
}

export function HeaderCardGroup({ direction, branch }: HeaderCardGroupProps) {
  const flexDirection = direction === 'vertical' ? 'flex-col' : 'flex-row';

  return (
    <div className={cn('flex', flexDirection)}>
      <HeaderCard
        Icon={PhoneCall}
        titleText={"Call Us Today"}
        branchData={{
          branch: branch.name,
          data: branch.phone,
        }}
      />
      <HeaderCard
        Icon={Clock5}
        titleText={"When We're Open"}
        branchData={{
          branch: branch.name,
          data: branch.hours,
        }}
      />
      <HeaderCard
        Icon={MapPin}
        titleText={"Where We At"}
        branchData={{
          branch: branch.name,
          data: branch.header_address,
        }}
      />
    </div>
  );
}

export function BranchView() {
  const { currentBranch } = useBranch();

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
