'use client';

import React from "react";
import ChangeBranch from "../_components/AboutUs/Branches/ChangeBranch";
import { Separator } from "~/components/ui/separator";
import useBranch from "~/hooks/useBranch";

function ContactUs() {
  const { currentBranch } = useBranch();
  return (
    <main className="flex flex-col justify-center gap-10 px-10 py-5">
      <iframe
        title={currentBranch.name}
        src={currentBranch.iframeSrc}
        width="fit"
        height="350"
        style={{ border: 0 }}
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center gap-5 lg:flex-row">
          <span className="text-5xl font-bold">Contact Us - </span>
          <div className="flex flex-col items-center">
            <span>{currentBranch.name}</span>
            <ChangeBranch />
          </div>
        </div>
        <p>
          Hi, we are always open for cooperation and suggestions, contact us in
          one of the ways below.
        </p>
      </div>

      <div className="mb-10 flex flex-col gap-20 lg:flex-row">
        <div className="flex-grow">
          <div className="mb-6 text-3xl font-bold">Information</div>

          {/* <div className="flex flex-col">
            <HeaderCard
              Icon={PhoneCall}
              titleText={"Call Us Today"}
              branchData={[
                {
                  branch: "Richmond Branch",
                  data: "(778) 295-2570",
                },
                {
                  branch: "Burnaby Branch",
                  data: "(604) 570-0867",
                },
                {
                  branch: "Port Coquitlam Branch",
                  data: "(778) 285-3999",
                },
              ]}
            />
            <HeaderCard
              Icon={Clock5}
              titleText={"When We're Open"}
              branchData={[
                {
                  branch: "Richmond Branch",
                  data: "7:00 am - 5:00 pm",
                },
                {
                  branch: "Burnaby Branch",
                  data: "7:00 am - 5:00 pm",
                },
                {
                  branch: "Port Coquitlam Branch",
                  data: "7:00 am - 5:00 pm",
                },
              ]}
            />
            <HeaderCard
              Icon={MapPin}
              titleText={"Where We At"}
              branchData={[
                {
                  branch: "Richmond Branch",
                  data: "Unit #3 - 4 12331 Bridgeport Road\nRichmond, BC. V6V 1J4",
                },
                {
                  branch: "Burnaby Branch",
                  data: "4012 Myrtle Street\nBurnaby, BC.  V5C 4G2",
                },
                {
                  branch: "Port Coquitlam Branch",
                  data: "Unit #420 1952 Kingsway Avenue\nPort Coquitlam, BC.  V3C 1S5",
                },
              ]}
            />
          </div> */}
        </div>
        
        <Separator orientation="vertical" className="h-auto"/>

        <div className="flex-grow">
          <div className="mb-6 text-3xl font-bold">Feedback</div>
          {/* <FeedbackForm /> */}
        </div>
      </div>
    </main>
  );
}

export default ContactUs;
