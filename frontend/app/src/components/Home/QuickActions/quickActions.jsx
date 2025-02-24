import React from 'react';

import { Building, Folder } from 'lucide-react';
import { Button } from "@/components/ui/button"


const QuickActions = () => {
    // const qaButtons = [
    //     {title: 'Projects', icon: 'IconLink', description: 'Connect your project and keep all your details in one place.'},
    //     {title: 'Issues', icon: 'IconCheckbox', description: 'Assign issues to your workflow and set deadlines.'},
    //     {title: 'Events', icon: 'IconCalendar', description: 'Plan events or meetings easily and send reminders to your team.'},
    //     {title: 'Notes', icon: 'IconFile', description: 'Capture and organize ideas, details, and to-dos all in one place.'},
    // ];

    const qaButtons = [
        {icon: Folder, text: 'New project'},
        {icon: Building, text: 'New organization'}
    ];


    return (
        <>
            <div className='py-4 font-["Inter"] flex flex-col'>
                <div className='flex gap-3 flex-col sm:flex-row'>
                    {qaButtons.map((button,index) =>  (
                        <Button key={index} variant='ghost' className='text-[13px] py-0 h-9 px-3.5 justify-start rounded-lg border border-solid dark:border-zinc-400 bg-white dark:bg-transparent border-black/25 dark:hover:bg-zinc-900 hover:bg-zinc-100'>
                            <button.icon className='text-zinc-800 dark:text-zinc-200 mr-0' size={13}/>
                            {button.text}
                        </Button>
                    ))}
                </div>
            </div>

            {/* <Carousel
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
            </Carousel> */}
        </>
    );
};

export default QuickActions;