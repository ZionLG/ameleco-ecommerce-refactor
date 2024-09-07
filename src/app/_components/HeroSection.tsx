import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { TextEffect } from '~/components/core/text-effect'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import HomeBackground from "@public/electrician.jpg";

export function HeroSection() {
  return (
    <section className="relative flex h-[650px] w-full flex-col justify-center overflow-hidden px-5 lg:px-28">
          <Image
            src={HomeBackground}
            fill={true}
            priority
            alt={"Background Image"}
            className="object-cover object-left"
          />

          <div className="absolute flex flex-col gap-4">
            <div className="flex flex-col gap-10 text-center lg:gap-0 lg:text-start">
              <TextEffect
                per="char"
                as="span"
                className="text-6xl text-secondary-foreground"
                preset="slide"
              >
                Ameleco Electrical Supply
              </TextEffect>

              <TextEffect
                per="char"
                as="span"
                className="text-4xl text-secondary-foreground"
                preset="blur"
              >
                Reliable & Professional
              </TextEffect>
            </div>

            <Link
              href={"shop"}
              className={`${cn(
                buttonVariants({ size: "lg", variant: "shine" }),
              )} self-center lg:self-start`}
            >
              Shop Now
            </Link>
          </div>
        </section>
  )
}
