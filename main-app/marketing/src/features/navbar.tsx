import React from 'react';
import { APP_DOMAIN } from '@/config/index';

import { Burger } from '@/components/ui/burger';
import { Sheet,SheetContent,SheetDescription,SheetHeader,SheetTrigger } from "@/components/ui/sheet"

import Logo from '@/components/logo';


const navItems: string[] = ['Projects', 'Resources', 'Pricing'];
export default function LandingNavbar() {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
      function handleResize() {
        if (window.innerWidth > 1023 && !isOpen) { //lg breakpoint shadcn
            setIsOpen(false);
        }
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  
    return (
        <div className="sticky top-0 border-b border-b z-50 px-6 sm:px-10 h-16 bg-white font-['Geist']">
            <div className="h-full z-50">
                <div className="flex justify-between items-center h-full">
                    <div className="flex items-center gap-12">
                        <div className="w-32">
                            <Logo />
                        </div>
            
                        <div className='h-full hidden lg:flex gap-8'>
                            {navItems.map((item, index) => (
                                <a key={index} className="font-medium text-gray-600 hover:text-gray-900" href="/#">{item}</a>
                            ))}
                        </div>
                    </div>
        
                    <div className='flex items-center gap-7'>
                        <div className='hidden sm:flex'>
                            <div className="flex gap-5 items-center">
                                {/* {process.env.NODE_ENV === 'development' ?
                                <> */}
                                    <a href={`${APP_DOMAIN}/login`} className="flex items-center h-9 rounded-lg px-3.5 py-0 font-medium text-base text-gray-800 border-solid border border-gray-500 hover:bg-primary/5">
                                        Login
                                    </a>
                                    <a href={`${APP_DOMAIN}/signup`} className="flex items-center gap-2 h-9 rounded-lg px-3.5 py-0 font-medium text-base text-white bg-black border-solid border-black hover:bg-black/80">
                                        Sign up
                                    </a>
                                {/* </> 
                                : 
                                <Button variant="ghost" className="rounded-lg h-9 px-3 py-0 font-medium text-base bg-white hover:brightness-90
                                inline-block bg-gradient-to-r from-[hsl(var(--color-1))] via-[hsl(var(--color-2))] to-[hsl(var(--color-3))]  text-white animate-gradient">
                                    Join the waitlist
                                </Button>
                                } */}
                            </div>
                        </div>

                        <div className='flex lg:hidden'>
                            <Sheet open={isOpen} onOpenChange={setIsOpen} >
                                <SheetTrigger asChild>
                                    <Burger isOpen={isOpen} toggle={() => setIsOpen(true)} />
                                </SheetTrigger>
                                <SheetContent side="right" className="z-20 top-0 border-t font-['Geist']">
                                    <div className="absolute top-3 right-10 z-50">
                                        <Burger isOpen={isOpen}  toggle={() => setIsOpen(false)} />
                                    </div>
                                    
                                    <SheetHeader>
                                        <SheetDescription className='py-16'>
                                            <div className='flex flex-col items-center gap-5'>
                                                {navItems.map((item,index) => (
                                                    <div key={index} className='flex w-full' >
                                                        <a href='/#' className='text-lg text-gray-500 hover:text-gray-900 font-medium '>{item}</a>
                                                    </div>
                                                ))}
                                            </div>
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
