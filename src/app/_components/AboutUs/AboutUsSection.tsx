import React from "react";

import Branches from "./Branches";
import { TextFade } from "~/components/ui/TextFade";
import { PrettySeparator } from "~/components/ui/PrettySeparator";

const AboutUsSection = () => {
  return (
    <section className="flex flex-col items-center gap-10 p-5">
      <PrettySeparator
        label={
          <TextFade direction="up" className="px-3 text-center">
            <h2 className="text-5xl text-primary md:text-6xl">About Us</h2>
          </TextFade>
        }
        gradient
      />
      <div className="flex flex-col items-center gap-10 lg:flex-row">
        <div className="flex flex-col gap-5">
          <span className="text-4xl font-semibold text-primary">
            Who We Are
          </span>
          <p className="max-w-lg text-lg">
            Ameleco Electric Supply has electrical stores near Vancouver in
            Richmond, Port Coquitlam and Burnaby. Shop at your nearest Ameleco
            Electrical Store today! <br />
            <br />
            Ameleco is one of the largest electrical wholesale suppliers
            providing a wide range of products for residential electricians and
            commercial contractors in BC. We carry comprehensive product
            solutions for Lighting, Datacom, Wire & Cable, Power Management and
            Electrical Supplies. <br />
            <br />
            In addition to our online store, we have a variety of choice
            throughout Canada where our customers can find what they need for
            their specific electrical projects as well as product knowledge and
            expertise from our staff.
          </p>
        </div>
        <Branches />
      </div>
    </section>
  );
};

export default AboutUsSection;
