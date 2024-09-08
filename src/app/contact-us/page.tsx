import React from "react";
import { Separator } from "~/components/ui/Separator";
import CurrentBranchIframe from "./_components/CurrentBranchIframe";
import { CurrentHeaderCardGroup } from "./_components/CurrentHeaderCardGroup";
import { FeedbackForm } from "./_components/FeedbackForm";
import { getBranchName } from "../branchActions";
import { BranchNameWithChangeComponent } from "~/app/_components/shared/BranchNameWithChangeComponent";

async function ContactUs() {
  const branchName = await getBranchName();
  return (
    <main className="flex flex-col justify-center gap-10 px-10 py-5">
      <CurrentBranchIframe />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center gap-5 lg:flex-row">
          <span className="text-5xl font-bold">Contact Us - </span>
          <BranchNameWithChangeComponent
            branchName={branchName}
            className="text-5xl font-bold"
          />
        </div>
        <p>
          Hi, we are always open for cooperation and suggestions, contact us in
          one of the ways below.
        </p>
      </div>

      <div className="mb-10 flex flex-col gap-20 lg:flex-row">
        <div className="flex-grow">
          <div className="mb-6 text-3xl font-bold">Information</div>
          <CurrentHeaderCardGroup direction="vertical" />
        </div>

        <Separator orientation="vertical" className="h-auto" />

        <div className="flex-grow">
          <div className="mb-6 text-3xl font-bold">Feedback</div>
          <FeedbackForm />
        </div>
      </div>
    </main>
  );
}

export default ContactUs;
