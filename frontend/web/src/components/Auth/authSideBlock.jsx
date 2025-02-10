import React from 'react';

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern';
import profile from '@/assets/profiles/aesthetic_profile.png';
import Logo2 from '@/components/Logo/logo2';

const AuthSideBlock = ({isLogin}) => {
    return (
        <div className='h-full bg-[hsl(240,10%,3.9%)] hidden lg:block p-4' >
            <div className='absolute z-50 p-4 w-48 h-48'>
                <Logo2 strokeColor='#f0f0f0' />
            </div>
            <div className="p-4 relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl border !border-zinc-100 bg-[hsl(180,18.2%,4.3%)] md:shadow-xl">
               <div className='flex flex-col items-center gap-4'>
                    <p className="z-10 whitespace-pre-wrap text-center text-3xl font-medium tracking-tighter text-white px-3 text-balance">
                        &quot;The best way to connect with developers and manage your projects with ease&quot;
                    </p>

                    <div className='flex items-center gap-3'>
                        <img alt='profile' src={profile} className='w-9 h-9 rounded-full z-50' />
                        <p className='text-lg z-50'>@danielgarcia</p>
                    </div>
               </div>
                <InteractiveGridPattern
                    className={cn(
                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                    "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                    )}
                />
            </div>
        </div>
    );
};

export default AuthSideBlock;