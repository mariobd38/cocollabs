import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { Burger } from '@/components/ui/burger';
import { Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle,SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";

import Logo2 from '@/components/Logo/logo2';

import './NavbarContent.css';
  
const NavbarContent: React.FC = () => {
    const navigate = useNavigate();
    const navItems: string[] = ['Projects', 'Communities', 'Resources', 'Pricing'];
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
      function handleResize() {
        if (window.innerWidth > 1023 && !isOpen) { //lg breakpoint shadcn
            setIsOpen(false);
        }
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  
    return (
        <div className="sticky top-0 border-b border-b-gray-800 z-50 px-6 sm:px-10 h-16 bg-background">
            <div className="h-full z-50">
                <div className="flex justify-between items-center h-full font-['Geist']">
                    <div className="flex items-center gap-12">
                        <div className="w-32">
                            <Logo2 strokeColor="#fafafa" />
                        </div>
            
                        <div className='h-full hidden lg:flex gap-8'>
                            {navItems.map((item, index) => (
                                <a key={index} className="landing-nav-button font-medium text-muted-foreground hover:text-white" href="/#">{item}</a>
                            ))}
                        </div>
                    </div>
        
                    <div className='flex items-center gap-7'>
                        <div className='hidden sm:flex'>
                            <div className="flex gap-5 items-center">
                                <Button variant="ghost" onClick={() => navigate('/login')} className="h-9 landing-nav-button rounded-lg px-3 py-0 font-medium text-base text-white border-solid border-[transparent] hover:bg-zinc-800">
                                    Login
                                </Button>
                                <Button variant="ghost" onClick={() => navigate('/signup')} className="h-9 landing-nav-button rounded-lg px-3 py-0 font-medium text-base !text-black signup bg-white border-solid border-white hover:brightness-90">
                                    Sign up
                                </Button>
                            </div>
                        </div>
            
                        {/* <ManBurger
                            opened={drawerOpened}
                            className={`flex items-center lg:hidden navbar-content-burger ${scrollPosition > 40 ? 'scrolled' : ''}`}
                            onClick={toggleDrawer}
                        /> */}
                        <div className='flex lg:hidden'>

                            <Sheet open={isOpen} onOpenChange={setIsOpen} >
                                <SheetTrigger asChild>
                                    <Burger isOpen={isOpen} toggle={() => setIsOpen(true)} />
                                </SheetTrigger>
                                <SheetContent 
                                    side="right" 
                                    className=" z-0 bg-background top-0 border-t border-gray-800 font-['Geist']"
                                >
                                    <div className="absolute top-3 right-10 z-50">
                                        <Burger isOpen={isOpen}  toggle={() => setIsOpen(false)} />
                                    </div>
                                    
                                    <SheetHeader>
                                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                                        <SheetDescription className='py-10'>
                                            <div className='flex flex-col items-center gap-5'>
                                                {navItems.map((item,index) => (
                                                    <div key={index} className='flex w-full' >
                                                        <p className='text-lg text-muted-foreground hover:text-white font-medium '>{item}</p>
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

export default NavbarContent;
