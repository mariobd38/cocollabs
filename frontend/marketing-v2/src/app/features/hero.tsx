"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/magicui/aurora-text";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { waitlistSchema } from "@/app/schemas/waitlist";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";

// import home_screenshot from '/images/home_screenshot.png';

export default function Hero() {
    const form = useForm({
        resolver: zodResolver(waitlistSchema),
        defaultValues: {
            email: "",
        },
    });
    const [animate, setAnimate] = React.useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    React.useEffect(() => setAnimate(true), []);
    // const { user } = useUser();

    const handleJoinWaitlist = async (data: { email: string }) => {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          body: JSON.stringify({ email: data.email }),
        });
      
        if (res.ok) {
          setDialogOpen(true); // Open confirmation modal
        } else {
        //   const { message } = await res.json();
        //   toast.error(message || "Failed to join waitlist");
        }
    };

    return (
        <>
            <div className='w-full sm:pb-8' >
                <DotPattern className={cn("absolute inset-0 [mask-image:radial-gradient(700px_circle_at_center,white,transparent)]" )} />
                <div className='px-0 sm:px-3 lg:px-8'>
                    <div className={`flex flex-col px-3 py-10 gap-16 ${animate ? 'animate-floatUp' : ''}`}>
                        <AnimatedGradientText>
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
                        <div className='flex flex-col gap-10 font-["Geist"]'>

                            <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-16 items-center justify-center max-w-4xl lg:max-w-full m-auto lg:m-0">
                                {/* Text Block - spans 1 of 3 columns on large screens */}
                                <div className="flex flex-col gap-4 lg:gap-8 lg:col-span-2 xl:col-span-2 ">

                                    {/* <h1 className="font-bold text-gray-900/90 text-5xl sm:text-7xl tracking-tight leading-tight w-full">
                                    Introducing the first <AuroraTextComp>AI</AuroraTextComp> team builder
                                    </h1> */}
                                    <h1 className="font-bold text-gray-900/90 text-balance text-5xl sm:text-7xl tracking-tight leading-21 w-full z-5">
                                    <AuroraText> AI </AuroraText> Insights For Every Pull Request
                                    </h1>
                                    <p className="text-gray-500/90 text-lg md:text-xl tracking-tight w-full">
                                    Review faster, merge sooner, and keep your team moving with intelligent, automated code reviews.
                                    </p>
                                    <div className="flex items-center gap-4 w-full">
                                        <FormProvider {...form} >
                                            <form onSubmit={form.handleSubmit(handleJoinWaitlist)} className='flex w-full gap-4'>
                                                <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem className='w-full'>
                                                    <FormControl>
                                                        <Input
                                                        {...field}
                                                        startIcon={<Mail className="text-zinc-400" size={16} />}
                                                        placeholder="johndoe@gmail.com"
                                                        type="email"
                                                        className="rounded-lg h-10 border-gray-400 placeholder:text-muted-foreground bg-white text-zinc-800"
                                                        />
                                                    </FormControl>
                                                    </FormItem>
                                                )}
                                                />
                                                <Button type="submit" className='hover:bg-primary/90 z-5 h-10'>
                                                    Join the waitlist
                                                </Button>
                                            </form>
                                        </FormProvider>
                                    </div>



                                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>You&apos;re on the waitlist 🎉</DialogTitle>
                                                <DialogDescription>We&apos;ll let you know when it&apos;s your turn.</DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button onClick={() => setDialogOpen(false)}>Close</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                {/* <Button  onClick={(e) => joinWaitlist(e)} className='hover:bg-primary/90 z-5 h-10'>Join the waitlist</Button> */}


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
                                        //   fill
                                        height={1000}
                                        />
                                    </div>

                                    {/* </div> */}
                                </div>

                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>

        </>
    );
}