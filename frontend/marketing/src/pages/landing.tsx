import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ChevronRight, Mail } from 'lucide-react';

import Footer from '@/features/footer';
import { Separator } from '@/components/ui/separator';
import { AuroraText } from "@/components/magicui/aurora-text";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { DotPattern } from '@/components/magicui/dot-pattern';
import NavbarContent from '@/features/navbar';
import Features from '@/features/features';
import home_screenshot from '@/assets/images/home-screenshot.png';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
//   DialogTrigger,
} from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"

import { cn } from '@/lib/utils';
import { zodResolver } from "@hookform/resolvers/zod"
import { waitlistSchema } from '@/utils/schemas/waitlist';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
// import { testBackend } from '@/api/test';
import { join } from '@/api/waitlist/join';



function Hero() {
    const form = useForm({
        resolver: zodResolver(waitlistSchema),
        defaultValues: {
            email: "",
        },
    });
    const [animate, setAnimate] = React.useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    React.useEffect(() => setAnimate(true), []);

    const joinWaitlist = async (data: { email: string }) => {
        const res = await join(data.email);
        console.log(res);
        if (res?.status === 200) {
            setDialogOpen(true); // ✅ show dialog only on success
        }
    }

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
                                    <h1 className="font-bold text-gray-900/90 text-balance text-5xl sm:text-7xl tracking-tight leading-tight w-full z-5">
                                    <AuroraText> AI </AuroraText> Insights For Every Pull Request
                                    </h1>
                                    <p className="text-gray-500/90 text-lg md:text-xl tracking-tight w-full">
                                    Review faster, merge sooner, and keep your team moving with intelligent, automated code reviews.
                                    </p>
                                    <div className="flex items-center gap-4 w-full">
                                        <FormProvider {...form} >
                                            <form onSubmit={form.handleSubmit(joinWaitlist)} className='flex w-full gap-4'>
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
                                                <DialogTitle>You're on the waitlist 🎉</DialogTitle>
                                                <DialogDescription>We'll let you know when it's your turn.</DialogDescription>
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
                                    <div className="p-3 xl:p-5 bg-white border-4 rounded-3xl w-full">
                                    <img
                                        alt="hero"
                                        src={home_screenshot}
                                        className="rounded-2xl w-full h-auto object-contain"
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


export default function Landing() {
    return (
        <>
            <main className='bg-white'>
                <NavbarContent />
                <Hero />
                <Features />
            </main>
            <Footer />
        </>
    );
}
