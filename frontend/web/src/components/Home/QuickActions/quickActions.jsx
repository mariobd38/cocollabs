import React, { useState,useEffect,useCallback } from 'react';

import { Box,Flex,Text } from '@mantine/core';
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';

import { Icons } from '@/components/icons/icons';

// import { Card, CardContent } from "@/components/ui/card"
// import {
//     Carousel as ShadCarousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
//   } from "@/components/ui/carousel"

import './quickActions.css';

const QuickActions = ({themeColors, colorScheme}) => {
    const qaButtons = [
        {title: 'Projects', icon: 'IconLink', description: 'Connect your project and keep all your details in one place.'},
        {title: 'Issues', icon: 'IconCheckbox', description: 'Assign issues to your workflow and set deadlines.'},
        {title: 'Events', icon: 'IconCalendar', description: 'Plan events or meetings easily and send reminders to your team.'},
        {title: 'Notes', icon: 'IconFile', description: 'Capture and organize ideas, details, and to-dos all in one place.'},
    ];

    // const [api, setApi] = useState();

    // useEffect(() => {
    //     if (!api) return;
     
    //     api.on("select", () => {
    //       // Do something on select.
    //     })
    // }, [api])


    const TRANSITION_DURATION = 200;

    const [embla, setEmbla] = useState(null);
    useAnimationOffsetEffect(embla, TRANSITION_DURATION);

    const [containerWidth, setContainerWidth] = useState(0);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const getSlideSize = useCallback(() => {
        // return containerWidth <= 640 ? '100%' : containerWidth <= 1024 ? '50%' : '33.333%';
        return containerWidth <= 500 ? '100%' : containerWidth <= 700 ? '50%' : containerWidth <= 1024 ? '33.333%' : '25%';
    }, [containerWidth]);

    const onSelect = useCallback(() => {
        if (!embla) return;
        const currentIndex = embla.selectedScrollSnap();
        setCanScrollNext(currentIndex < embla.scrollSnapList().length - 1);
        setCanScrollPrev(currentIndex > 0);
    }, [embla]);


    useEffect(() => {
        if (!embla) return;

        const updateWidth = () => {
            const width = embla.rootNode().getBoundingClientRect().width;
            setContainerWidth(width); // Update the container width in state
            embla.reInit(); // Reinitialize Embla with the new width
            onSelect(); // Trigger onSelect callback to sync state
        };

        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(updateWidth);
        });

        resizeObserver.observe(embla.rootNode());

        embla.on('select', onSelect);

        updateWidth();

        return () => {
            resizeObserver.disconnect();
            embla.off('select', onSelect);
        };
    }, [embla, onSelect]);

    return (
        <>

            {/* <Box pb={25}>
                <Text fz={16.5} pb={5} c={themeColors.text[3]} ff='Inter'>Quick Actions</Text>
                <ShadCarousel
                setApi={setApi}
                    opts={{
                        align: "start",
                        containScroll: 'trimSnaps',
                        // loop: true,
                    }}
                    className="w-full py-2"
                >
                    
                <CarouselContent>
                {qaButtons.map((action,index) => (
                    <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 ">
                        <Card className={`bg-transparent quick-actions-button ${colorScheme}`}>
                            <CardContent className="flex w-200 items-center justify-center cursor-pointer p-0 ">
                            <Flex direction='column' gap={20} h='170' bg={`${colorScheme==='dark' ? '#1c1d1f' : '#fdfdfd'}`} className={`quick-actions-button ${colorScheme} cursor-pointer py-4 px-[36px] border-solid border rounded-xl w-full`}>
                                        <Flex justify='space-between' className="gap-3 w-full">
                                            <Text className="text-xl font-bold" ff='Inter'>{action.title}</Text>
                                            <Flex>{Icons(action.icon,24,24,themeColors.text[1])}</Flex>
                                        </Flex>
                                        <p className="text-sm text-muted-foreground text-start">{action.description}</p>
                                    </Flex>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='bg-transparent left-3 opacity-50'/>
                <CarouselNext className='bg-transparent right-3 opacity-50' />
                </ShadCarousel>

            </Box> */}


            <Box className='carousel-grandparent'>
                <Text fz={16.5} c={themeColors.text[3]} ff='Inter'>Quick Actions</Text>
                <Box w="full" position="relative">
                    <Box className={`fade-effect previous-${canScrollPrev} next-${canScrollNext} ${colorScheme}`} pos="relative" >
                        <Carousel
                            controlsOffset="0"
                            slideSize={{ base: getSlideSize() }}
                            // slideSize={{ base: '100%', sm: '50%' }}
                            slideGap={{ base: 'xl' }}
                            align="start"
                            draggable={false}
                            slidesToScroll={1}
                            containScroll="trimSnaps"
                            inViewThreshold="1.0"
                            getEmblaApi={setEmbla}
                            className="overflow-visible carousel-parent w-full"
                            previousControlProps={{
                                disabled: !canScrollPrev,
                                style: {
                                    opacity: canScrollPrev ? 1 : 0,
                                    cursor: canScrollPrev ? 'pointer' : 'default',
                                    boxShadow: 'none'
                                }
                            }}
                            nextControlProps={{
                                disabled: !canScrollNext,
                                style: {
                                    opacity: canScrollNext ? 1 : 0,
                                    cursor: canScrollNext ? 'pointer' : 'default',
                                    display: canScrollNext ? 'flex' : 'none',
                                    boxShadow: 'none'
                                }
                            }}
                            previousControlIcon={ <Flex align='center' justify='center' className={`carousel-control-icon invisible transition-all duration-500 opacity-0 ${colorScheme==='dark' ? 'bg-gray-700' : 'bg-slate-500'} rounded-full w-7 h-7`}>
                                {Icons('IconChevronLeft',20,20, colorScheme === 'dark' ? '#e0e0e0' : '#fafafa')}
                            </Flex> }
                            nextControlIcon={ <Flex align='center' justify='center' className={`carousel-control-icon invisible transition-all duration-500 opacity-0 ${colorScheme==='dark' ? 'bg-gray-700' : 'bg-slate-500'} rounded-full w-7 h-7`}>
                                {Icons('IconChevronRight', 20, 20, colorScheme === 'dark' ? '#e0e0e0' : '#fafafa')}
                            </Flex> }
                        >
                            {qaButtons.map((action) => (
                                <Carousel.Slide py={15} key={action.title} >
                                    <Flex direction='column' gap={20} h='162' bg={`${colorScheme==='dark' ? '#1c1d1f' : '#fdfdfd'}`} className={`quick-actions-button ${colorScheme} cursor-pointer py-4 px-[36px] border-solid border rounded-xl w-full`}>
                                        <Flex justify='space-between' className="gap-3 w-full">
                                            <Text className="text-xl font-bold" ff='Inter'>{action.title}</Text>
                                            <Flex>{Icons(action.icon,24,24,themeColors.text[1])}</Flex>
                                        </Flex>
                                        <p className="text-[12.8px] text-muted-foreground text-start mb-0">{action.description}</p>
                                    </Flex>
                                </Carousel.Slide>
                            ))}
                        </Carousel>
                    </Box>
                </Box>
            </Box>

        </>
    );
};

export default QuickActions;