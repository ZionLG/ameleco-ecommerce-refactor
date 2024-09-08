import Link from "next/link";
import Image from "next/image";

import { HydrateClient } from "~/trpc/server";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import HomeCategory, {
  type HomeCategoryProps,
} from "~/app/_components/HomeCategory";
import { PrettySeparator } from "~/components/ui/PrettySeparator";
import { TextFade } from "~/components/ui/TextFade";
import AboutUsSection from "~/app/_components/AboutUs/AboutUsSection";
import Accessories from "@public/Accessories.png";
import Box from "@public/Box.png";
import Breaker from "@public/Breaker.png";
import HeatingCooling from "@public/heating and cooling.png";
import Lighting from "@public/Lighting.png";
import Wires from "@public/Wires.png";
import Thanksgiving from "@public/Thanksgiving.jpg";
import Careers from "@public/CAREERS.jpg";
import ContactUs from "@public/contactus.jpg";
import { AnimatedNumberInView } from "~/components/ui/animted-number-inview";
import { HeroSection } from "./_components/HeroSection";

const Categories = [
  {
    image: HeatingCooling,
    title: "Heating and Cooling",
    description: "Fans, Air Conditioners",
  },
  {
    image: Lighting,
    title: "Lighting",
    description: "Bulbs, Fixtures",
  },
  {
    image: Breaker,
    title: "Breaker",
    description: "Circuit Breaker, Single-pole",
  },
  {
    image: Box,
    title: "BOX",
    description: "Metal Box, PVC FS",
  },
  {
    image: Wires,
    title: "Wires",
    description: "Cable, Antishort",
  },
  {
    image: Accessories,
    title: "Accessories",
    description: "Lock Nut, Extension Ring",
  },
] as HomeCategoryProps[];

export default function Home() {
  
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col">
        <HeroSection/>
        <PrettySeparator gradient />
        <section className="relative flex flex-col items-center gap-10 bg-secondary py-10">
          <PrettySeparator
            label={
              <TextFade direction="up" className="px-3 text-center">
                <h2 className="text-5xl text-primary md:text-6xl">
                  Shop by Categories
                </h2>
              </TextFade>
            }
            gradient
          />
          <div className="absolute bottom-0 left-0 right-0 top-32 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          <div className="3xl:grid-cols-6 z-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {Categories.map((category) => {
              return (
                <div key={category.title}>
                  <HomeCategory
                    image={category.image}
                    title={category.title}
                    description={category.description}
                  />
                </div>
              );
            })}
          </div>
        </section>
        <AboutUsSection />
        <PrettySeparator gradient />
        <section className="flex flex-col items-center gap-10 p-5">
          <span className="text-4xl font-semibold text-primary">
            Supplying British Columbia for{" "}
            <AnimatedNumberInView duration={5000} to={20} />+ years!
          </span>
          <div className="grid grid-rows-3 lg:grid-cols-3 lg:grid-rows-1">
            <div>
              <Image alt="Thanksgiving Promotion" src={Thanksgiving} />
              <div className="flex h-64 w-[275px] flex-col gap-2 border p-3">
                <span className="text-2xl font-semibold text-primary">
                  THANKSGIVING PROMOTION
                </span>
                <p>
                  To express our sincere gratitude, we`re launching a special
                  sale from Thanksgiving Day October 9th until October 31st for
                  your coming projects.
                </p>
              </div>
            </div>
            <div>
              <Image alt="Careers" src={Careers} />
              <div className="flex h-64 w-[275px] flex-col gap-2 border p-3 lg:border-y">
                <span className="text-2xl font-semibold text-primary">
                  CAREERS
                </span>
                <p>
                  We`re always looking for fresh blood! See career opportunities
                  at Ameleco today.
                </p>
              </div>
            </div>
            <div>
              <Image alt="Contact us" src={ContactUs} />
              <div className="flex h-64 w-[275px] flex-col gap-2 border p-3">
                <span className="text-2xl font-semibold text-primary">
                  CONTACT US
                </span>
                <p>
                  Got any questions or want to chat with us further? Contact us
                  by email or by phone.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-10 flex flex-col items-center gap-10 p-5">
          <PrettySeparator
            label={
              <TextFade direction="up" className="px-3 text-center">
                <h2 className="text-4xl font-semibold text-primary">
                  Why Choose Us
                </h2>
              </TextFade>
            }
            gradient
          />
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex max-w-xs flex-col items-center text-center">
              <Image
                priority
                src={"building.svg"}
                height={100}
                width={100}
                alt="Buildings"
              />
              <span className="font-medium text-secondary-foreground">
                CONTRIBUTED TO PROJECTS IN DIFFERENT SECTORS
              </span>
              <span className="font-semibold">
                Commercial, residential, industry materials, etc.
              </span>
            </div>
            <div className="flex max-w-xs flex-col items-center text-center">
              <Image
                priority
                src={"experience.svg"}
                height={100}
                width={100}
                alt="Buildings"
              />
              <div className="flex flex-col gap-6">
                <span className="font-medium text-secondary-foreground">
                  VAST EXPERIENCE
                </span>
                <span className="font-semibold">
                  <AnimatedNumberInView duration={5000} to={20} from={10} />+
                  years of experience
                </span>
              </div>
            </div>
            <div className="flex max-w-xs flex-col items-center text-center">
              <Image
                priority
                src={"location.svg"}
                height={100}
                width={100}
                alt="Buildings"
                className="p-3"
              />
              <div className="flex flex-col gap-6">
                <span className="font-medium text-secondary-foreground">
                  BASED IN BRITISH COLUMBIA.
                </span>
                <span className="font-semibold">
                  <AnimatedNumberInView duration={5000} to={3} /> locations
                  including Richmond, Burnaby, and Port Coquitlam.
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col text-xl sm:flex-row">
          <div className="flex grow flex-col items-center justify-center gap-3 bg-secondary p-16 ">
            <span>Create Account to Shop Online</span>
            <Link href={"register"} className={`${cn(buttonVariants({ variant: "gooeyRight" }))}`}>
              Create Account
            </Link>
          </div>
          <div className="flex grow flex-col items-center justify-center gap-3 bg-[#343434] p-16 text-primary-foreground">
            <span>Find Items You Need</span>
            <Link
              href={"shop"}
              className={`${cn(
                buttonVariants({ variant: "gooeyLeft" }),
              )}`}
            >
              Shop Now
            </Link>
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
