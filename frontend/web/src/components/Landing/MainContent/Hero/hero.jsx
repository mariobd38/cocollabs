import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons/icons';

import AuroraTextComp from '@/components/ui/AuroraText/auroraTextComp';
import AnimatedGradientTextComp from '@/components/ui/AnimatedGradientText/animatedGradientTextComp';
import ContainerScrollAnimationComp from '@/components/ui/ContainerScrollAnimation/containerScrollAnimationComp';
import { CardHoverEffectComp } from '@/components/ui/CardHoverEffect/cardHoverEffectComp';

const Hero = () => {
    let navigate = useNavigate(); 

    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <>
            <div className='w-full sm:pb-8' >
        
                <div className='container px-0 sm:px-2.5 md:px-16'>
                    <div className={`flex flex-col px-2.5 py-12 gap-16 ${animate ? 'float-up' : ''}`}>
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
                        <div className='flex px-2.5 flex-col gap-10'>

                            <div className='font-["Helvetica"]'>
                                <h1 className='font-bold text-white text-5xl sm:text-7xl tracking-tight sm:tracking-normal text-balance sm:text-wrap text-center leading-[3.8rem] sm:leading-[4.6rem] w-11/12 sm:w-full m-auto'>Connecting development to  <AuroraTextComp>success</AuroraTextComp>
                                </h1>
                                
                            </div>

                            <div className='flex flex-col gap-14'>
                                <p className='text-gray-300 text-md sm:text-lg tracking-tight sm:tracking-normal text-balance text-center w-11/12 m-auto'>
                                    Meet the platform made for project and developer growth. Discover a wide developer community, and unlock your full development potential with advanced tools and integrations.
                                </p>
                                
                                <div className='flex flex-col sm:flex-row items-center m-auto gap-8 sm:gap-12 font-["Helvetica"]'>
                                    <button className="get-started relative overflow-hidden p-[1px] rounded-xl" onClick={() => navigate("/signup")}>
                                        <span className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#101216_0%,#393BB2_50%,#303256_100%)]" />
                                        <div className="flex font-bold py-4 px-7  h-full w-full cursor-pointer items-center justify-center bg-background text-white backdrop-blur-3xl rounded-xl">
                                            Get started for free
                                        </div>
                                    </button>
                                    <Button className='visit-community-button bg-white text-black font-bold rounded-xl text-base px-4 py-2 hover:brightness-90'>Visit the community
                                        <span className='visit-community icon'>{Icons('IconChevronRight',16,16)}</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
            <ContainerScrollAnimationComp />

            <div className='container sm:px-5 lg:px-0 pb-10 md:pt-40'>
                <div className='flex flex-col px-2.5 gap-6'>
                    <h1 className='text-zinc-200 text-3xl font-semibold text-center md:text-4xl transition-all duration-500 ease font-["Helvetica"]'>Your developer journey starts here</h1>
                    <h2 className='text-muted-foreground text-base text-center md:text-xl transition-all duration-500 ease font-["Helvetica"]'>Explore new opportunities, collaborate with experts, and create impactful projects together</h2>
                </div>
                <CardHoverEffectComp />
                
            </div>
        </>
    );
};

export default Hero;