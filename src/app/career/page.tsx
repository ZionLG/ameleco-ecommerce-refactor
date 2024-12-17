import React from "react";
import Image from "next/image";
import OpportunitiesButton from "./_components/OpportunitiesButton";
import Careers from "@public/career.jpg";

async function Career() {
  return (
    <main className="space-y-10">
      <section className="relative flex h-[400px]  w-full flex-col justify-center overflow-hidden bg-black px-5 lg:px-28">
        <Image
          src={Careers}
          fill={true}
          priority
          alt={"Background Image"}
          className="object-cover object-left opacity-40 "
        />

        <div className="absolute flex flex-col gap-4">
          <div className="flex flex-col gap-10 text-center lg:gap-0 lg:text-start ">
            <span className="text-6xl text-primary-foreground">
              Work At Ameleco
            </span>
            <span className="text-3xl   text-primary-foreground opacity-80">
              Weu&apos;re always looking for fresh blood!
            </span>
          </div>
          <OpportunitiesButton className="self-center lg:self-start"/>
        </div>
      </section>
      <section className="flex flex-col items-center  gap-5">
        <h2 className="text-4xl font-semibold text-primary">
          We&apos;re always looking for fresh talent at Ameleco!
        </h2>
        <p className="max-w-4xl text-lg">
          We have ambitious growth plans and are looking for passionate,
          innovative people to help us get there. As an equal opportunity
          employer, we value diverse experiences and backgrounds. If you&apos;re
          excited about advancing in your professional career and creating
          positive change, we want to hear from you. Browse our open roles and
          don&apos;t hesitate to reach out if you have a creative idea for a new
          position. We may just be looking for what you have to offer.
        </p>
      </section>
      <section className="flex flex-col items-center  gap-5">
        <h2 className="text-4xl font-semibold text-primary">
          Work and be yourself!
        </h2>
      </section>
      <section className="flex grow flex-col items-center justify-center gap-3 bg-primary px-16 pb-10 pt-5 text-primary-foreground">
        <span className="text-xl">Interested in a career with us?</span>
        <OpportunitiesButton ghostVariant/>
      </section>
    </main>
  );
}

export default Career;
