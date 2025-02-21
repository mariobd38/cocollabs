import { useState, useEffect } from 'react';
import { APP_DOMAIN } from '@/constants';

import { Separator } from '@/components/ui/separator';
import { Icons } from '@/components/icons/icons';

import AuroraTextComp from '@/components/ui/AuroraText/auroraTextComp';
import AnimatedGradientTextComp from '@/components/ui/AnimatedGradientText/animatedGradientTextComp';
import ContainerScrollAnimationComp from '@/components/ui/ContainerScrollAnimation/containerScrollAnimationComp';

const Hero: React.FC = () => {
    const [animate, setAnimate] = useState(false);
    useEffect(() => setAnimate(true), []);

    return (
        <>
            <div className='w-full sm:pb-8' >
                <div className='container px-0 sm:px-2.5 md:px-16'>
                    <div className={`flex flex-col px-2.5 py-12 gap-16 ${animate ? 'animate-floatUp' : ''}`}>
                        <AnimatedGradientTextComp
                            target={<div className='flex items-center' > 
                                <div className='hidden sm:flex'>🚀 
                                    <div className="flex h-[18px] m-auto px-2.5">
                                        <Separator orientation="vertical" className='bg-zinc-600 rounded' />
                                    </div>
                                </div>
                                Introducing a new way to build solutions together
                                <span className='pl-2 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5'>
                                {Icons('IconChevronRight',13,13)}
                                </span>
                            </div>}
                        />
                        <div className='flex px-2.5 flex-col gap-10 font-["Helvetica"]'>

                            <h1 className='font-bold text-white text-5xl sm:text-7xl tracking-tight sm:tracking-normal text-balance sm:text-wrap text-center leading-[3.8rem] sm:leading-[4.6rem] w-11/12 sm:w-full m-auto'>
                                Connecting development to  <AuroraTextComp>success</AuroraTextComp>
                            </h1>
                                

                            <div className='flex flex-col gap-14'>
                                <p className='text-gray-300 text-md sm:text-lg tracking-tight sm:tracking-normal text-balance text-center w-11/12 m-auto'>
                                    Meet the platform made for project and developer growth. Discover a wide developer community, and unlock your full development potential with advanced tools and integrations.
                                </p>
                                
                                <div className='flex flex-col sm:flex-row items-center m-auto gap-8 sm:gap-12 font-["Inter"]'>
                                    <a href={`${APP_DOMAIN}/signup`} className='w-48 h-14 flex justify-center sm:w-52 bg-blue-500/80 text-white font-bold rounded-xl text-sm sm:text-base flex items-center
                                    gap-2 transition-all duration-500 ease-in-out hover:-translate-y-1.5 tracking-wide' >
                                        Get started for free
                                    </a>
                                    <a href={`/#`} className='w-48 h-14 flex justify-center sm:w-52 visit-community-button bg-white text-black font-bold rounded-xl text-sm sm:text-base flex items-center
                                    gap-2 transition-all duration-300 ease-in-out hover:-translate-y-1.5 tracking-wide'>
                                        Visit communities<span className="visit-community icon">{Icons('IconChevronRight', 16, 16)}</span>
                                    </a>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ContainerScrollAnimationComp />
        </>
    );
};

export default Hero;