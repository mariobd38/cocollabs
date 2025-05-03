"use client";
import React from "react";

import { DotPattern } from "@/components/magicui/dot-pattern";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight, Dot } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function Hero() {
  const [animate, setAnimate] = React.useState<boolean>(false);
  React.useEffect(() => setAnimate(true), []);

  return (
    <>
      <div className='w-full sm:py-8' >
        <DotPattern className={cn("absolute inset-0 [mask-image:radial-gradient(700px_circle_at_center,white,transparent)]" )} />
        <div className='px-0 sm:px-3 lg:px-8'>
          <div className={`flex flex-col px-3 py-10 gap-16 ${animate ? 'animate-floatUp' : ''}`}>
            <div className='flex flex-col gap-10 font-["Geist"]'>
              <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-16 items-center justify-center max-w-4xl lg:max-w-full m-auto lg:m-0">
                {/* Text Block - spans 1 of 3 columns on large screens */}
                <div className="flex flex-col gap-4 lg:gap-8 lg:col-span-2 xl:col-span-2 ">

                  <AnimatedGradientText className="mx-auto sm:mx-0">
                      <div className='flex items-center' > 
                          <div className='hidden sm:flex'>🚀 
                              <div className="flex h-[18px] m-auto px-3">
                                  <Separator orientation="vertical" className='bg-zinc-600 rounded' />
                              </div>
                          </div>
                          Introducing a new way to build together
                          <span className='pl-2 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5'>
                          <ChevronRight size={13} />
                          </span>
                      </div>
                  </AnimatedGradientText>
                  <h1 className="font-bold text-gray-900/90 text-balance text-5xl sm:text-7xl tracking-tight leading-15 sm:leading-21 w-full z-5">
                  <AuroraText> AI </AuroraText> Insights For Every Pull Request
                  </h1>
                  <p className="text-gray-500/90 text-lg md:text-xl font-medium tracking-tight w-full">
                  Review faster, merge sooner, and keep your team moving with intelligent, automated code reviews.
                  </p>
                  <div className="flex items-center gap-4 w-full">

                      <div className="flex items-center w-full gap-4">
                          <Button className="py-6 px-4 text-base">
                              Schedule a demo today
                          </Button>
                          <div className="flex items-center">
                              <Dot />
                              <p className="text-sm">No credit card needed</p>
                          </div>
                      </div>
                  </div>
                </div>

                {/* Image Block - spans 2 of 3 columns on large screens */}
                <div className="flex items-center justify-center w-full lg:col-span-2 xl:col-span-3 z-5">
                    <div className="p-3 xl:p-5 bg-white border-4 rounded-3xl w-full relative ">
                    {/* <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4"> */}
                    {/* <img alt="Greptile AI Code Review Interface" fetchpriority="high" width="1000" height="1000" decoding="async" data-nimg="1" class="w-full h-auto rounded-xl shadow-2xl ring-1 ring-gray-900/10" style="color:transparent" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcr-graphic-cropped.e5058b88.png&amp;w=1080&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcr-graphic-cropped.e5058b88.png&amp;w=2048&amp;q=75 2x" src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcr-graphic-cropped.e5058b88.png&amp;w=2048&amp;q=75"> */}
                        <Image
                        alt="hero"
                        src="/images/demo.png"
                        className="p-4 h-auto w-full h-auto rounded-3xl shadow-2xl ring-1 ring-gray-900/10 rou"
                        width={1000}
                        priority
                        height={1000}
                        />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}