'use client';
import React from "react";
import type { Branch } from "~/app/_components/AboutUs/Branches/data";

export function BranchIframe({ branch }: { branch: Branch}) {
  return (
    <iframe
      title={branch.name}
      src={branch.iframeSrc}
      width="fit"
      height="350"
      style={{ border: 0 }}
      loading="eager"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}

