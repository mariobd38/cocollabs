import React from 'react';

import { Building, Search } from 'lucide-react';
import { Button } from "@/components/ui/button"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"


const QuickActions = () => {
    // const qaButtons = [
    //     {title: 'Projects', icon: 'IconLink', description: 'Connect your project and keep all your details in one place.'},
    //     {title: 'Issues', icon: 'IconCheckbox', description: 'Assign issues to your workflow and set deadlines.'},
    //     {title: 'Events', icon: 'IconCalendar', description: 'Plan events or meetings easily and send reminders to your team.'},
    //     {title: 'Notes', icon: 'IconFile', description: 'Capture and organize ideas, details, and to-dos all in one place.'},
    // ];

    const qaButtons = [
        {icon: Search, text: 'Search projects'},
        {icon: Building, text: 'Create organization'}
    ];


    return (
        <>
            <div className='py-4 font-["Inter"] gap-3 flex flex-col'>
                <h1>Quick Actions</h1>
                <div className='flex gap-5'>
                    {qaButtons.map((button,index) =>  (
                        <Button key={index} variant='ghost' className='w-44 justify-start rounded-lg border border-solid dark:border-zinc-400 border-black/25 h-8 dark:hover:bg-zinc-900 hover:bg-black/10'>
                            <button.icon className='text-zinc-800 dark:text-zinc-200 mr-1' size={18}/>
                            {button.text}
                        </Button>
                    ))}
                </div>
            </div>

            <Carousel
                opts={{
                    align: "start",
                    containScroll: 'trimSnaps',
                    // loop: true,
                }}
                className="w-full py-2"
            >
                    
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                        <div className="p-1">
                        <Card className='hover:translate-y-4'>
                            <CardContent className="flex items-center aspect-[3/1] justify-center p-6">
                            <span className="text-3xl font-semibold">{index + 1}</span>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='bg-transparent left-3 opacity-50'/>
                <CarouselNext className='bg-transparent right-3 opacity-50' />
            </Carousel>
        </>
    );
};

export default QuickActions;