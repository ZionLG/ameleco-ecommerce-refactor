"use client";
import React from "react";
import Image from "next/image";
import { useReadLocalStorage } from "usehooks-ts";

export const Branches = [
  {
    name: "Richmond Branch",
    address: "1952 KINGSWAY AVE UNIT 420, RICHMOND",
    src: "RichmondBranch.svg",
  },
  {
    name: "Port Coquitlam Branch",
    address: "12331 BRIDGEPORT ROAD UNIT 3~4, PORT COQUITLAM",
    src: "PortBranch.svg",
  },
  {
    name: "Burnaby Branch",
    address: "4012 MYRTLE ST, BURNABY",
    src: "BurnabyBranch.svg",
  },
] as const;

function BranchView() {
  const currentBranch = useReadLocalStorage<(typeof Branches)[number]>(
    "currentBranch",
    { initializeWithValue: false },
  );

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
          alt={`Visit us ${branch.address}`}
        />
      ))}
    </>
  );
}

export default BranchView;
