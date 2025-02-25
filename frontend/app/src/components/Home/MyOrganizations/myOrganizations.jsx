import React from 'react';
import { useNavigate } from 'react-router-dom';


import { User, Star } from 'lucide-react';

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"


const MyOrganizations = ({appData,colorScheme}) => {
    const navigate = useNavigate();
    const [showArrows, setShowArrows] = React.useState(false);

    React.useEffect(() => {
        const updateVisibility = () => {
            const visibleSlides = window.innerWidth >= 700 ? 2 : 1; // Adjust based on breakpoints
            setShowArrows(appData.organizations.length > visibleSlides);
        };

        updateVisibility(); // Run once on mount
        window.addEventListener('resize', updateVisibility);

        return () => window.removeEventListener('resize', updateVisibility);
    }, [appData.organizations.length]);


    return (
        <div className='py-4 font-["Inter"] gap-2 flex flex-col'>
            <h1 className='dark:text-white/90 text-black/80 font-bold'>My Organizations</h1>
            <div className='flex gap-5'>
                <Carousel opts={{ containScroll: 'trimSnaps' }} className="w-full py-2 sm:flex">
                    <CarouselContent className="flex md:justify-start ">
                    {appData.organizations.map((org,index) =>  (
                        <CarouselItem key={index} className="min-w-full w-full sm:min-w-[280px] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <Card className='h-auto w-full border border-solid dark:border-zinc-400 bg-white dark:bg-transparent border-black/25 dark:hover:bg-zinc-900 hover:bg-zinc-100'>
                                <CardContent className="flex h-auto items-center  justify-center p-4">
                                    <div className='flex flex-col w-full gap-8'>
                                        <div className='gap-1 flex flex-col'>

                                        
                                            <div className='flex justify-between items-center'>
                                                <a className='text-sky-600 dark:text-sky-500/90 hover:underline underline-offset-2 text-[15px]
                                                overflow-hidden w-[370px] sm:w-[150px] whitespace-nowrap text-ellipsis' 
                                                href='/#' onClick={(e) => { e.preventDefault(); navigate(`/org/${org.slug}`) }}>
                                                    {org.name}
                                                </a>
                                                <Button className='h-2 px-2 bg-transparent dark:text-zinc-400 text-zinc-600 border border-solid dark:border-zinc-500 border-zinc-300 text-xs rounded-full'>
                                                    {org.isPublic ? 'Public' : 'Private'}
                                                </Button>
                                                
                                            </div>
                                            <p className='text-xs text-muted-foreground'>/{org.slug}</p>
                                        </div>
                                        
                                        <div className='flex justify-between items-center'>
                                            {/* <div className='cursor-pointer text-zinc-800 dark:text-zinc-200 dark:hover:text-yellow-500'>
                                                <Star size={18} />
                                            </div> */}
                                            <div className={`add-favorites ${colorScheme}`}>
                                                <Star className="cursor-pointer text-zinc-500 dark:text-zinc-300 dark:hover:text-yellow-500" size={18} />
                                            </div>
                                            <div className='flex gap-1.5'>
                                                <User className='text-zinc-800 dark:text-zinc-300' size={14} />
                                                <span className='text-xs text-zinc-800 dark:text-zinc-100'>1</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    {showArrows && <>
                    <CarouselPrevious className='bg-transparent left-0 opacity-50'/>
                    <CarouselNext className='bg-transparent right-0 opacity-50' /></>}
                </Carousel>
            </div>
        </div>
    );
};

export default MyOrganizations;
