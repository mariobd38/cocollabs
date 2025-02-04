import React, { useMemo,isValidElement,useState,useRef,useCallback,useEffect } from 'react';

import { Flex,Divider,Avatar,ColorSwatch } from '@mantine/core';

import { IconsFilled, GetAllFilledIcons } from '@/components/icons/iconsFilled';
import { Button } from "@/components/ui/button"
import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover"


const colorSwatchList = ["#848484", "#009790", "#0099FF", "#2EC4B6", "#3A506B", "#6A4C93", "#E63946", "#e76f21", "#F7B801", "#FF0099"];

const InfiniteScrollIconButtons = ({ filledIcons, color, handleSpaceIconClick, activeIndex, colorMode,itemsPerLoad}) => {
    const [displayedItems, setDisplayedItems] = useState(itemsPerLoad);
    const containerRef = useRef(null);
  
    const handleScroll = useCallback((e) => {
        const container = e.target;
        const { scrollTop, scrollHeight, clientHeight } = container;
        
        if (scrollHeight - scrollTop <= clientHeight + 20) {
            if (displayedItems < filledIcons.length) {
                setDisplayedItems(prev => Math.min(prev + itemsPerLoad, filledIcons.length));
            }
        }
    }, [displayedItems, filledIcons.length, itemsPerLoad]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('scroll', handleScroll);
        
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const memoizedButtons = useMemo(() => {
        const iconColor = colorMode==='dark' ? '#fafafa' : '#636363'
        return filledIcons
            .slice(0, displayedItems)
            .map((icon, index) => (
                <Avatar 
                    key={icon.key} 
                    onClick={() => handleSpaceIconClick(icon.key, index)} 
                    variant={index === activeIndex ? 'filled' : 'transparent'}  
                    color={color}  
                    radius="md"
                    w={18}
                    size='35'
                    className={`cursor-pointer ${activeIndex !== index && `space-creation-icon-button ${colorMode}`}`}
                >
                    {IconsFilled(icon.key, 18, 18, index === activeIndex ? '#fafafa' : iconColor )}
                </Avatar>
            ));
    }, [filledIcons, color, handleSpaceIconClick, activeIndex, colorMode, displayedItems]);

    return (
        <Flex wrap="wrap" ref={containerRef} justify='space-between' rowGap={2} columnGap={1} h={158} className='overflow-y-auto'>
            {memoizedButtons}
        </Flex>
    );

};

const SpaceCreationIconsPopover = (props) => {
    const { color, setColor, spaceIcon, setSpaceIcon,colorMode,setOpenIconPopover } = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const filledIcons = useMemo(() => GetAllFilledIcons(), []);

    const [isOpen, setIsOpen] = useState(false);

    const handleSpaceIconClick = (key,index) => {
        setActiveIndex(index);
        const profileSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mantine-scale')) || 1;
        const size = 3 * 0.5 * profileSize * 16;
        const icon = IconsFilled(key,size, size,'#fafafa');
        
        setTimeout(() => setSpaceIcon(<Avatar bg={color} variant='light' radius='calc(0.25rem * 1)' w={18}>{icon}</Avatar>),30);
    }

    const handleIconColorChange = (newColor) => {
        if (isValidElement(spaceIcon.props.children)) {
            const props = spaceIcon.props.children.props;

            setTimeout(() => setSpaceIcon(<Avatar bg={newColor} variant='light' radius='calc(0.25rem * 1)' w={18}>
                <svg xmlns={props.xmlns} width={props.width} height={props.height} viewBox={props.viewBox}  fill={'#fafafa'} className={props.className}>{props.children}</svg>
            </Avatar>),30);
        } 
        // else {
        //     setTimeout(() => setSpaceIcon(<Avatar color={newColor} variant='light' radius='calc(0.25rem * 1)' w={18}>{firstLetter}</Avatar>),30);
        // }
        setColor(newColor);
    }

    return (
        <Popover open={isOpen} onOpenChange={(isOpen) => {setIsOpen(isOpen);setOpenIconPopover && setOpenIconPopover(isOpen);}}>
            <PopoverTrigger asChild>
                <Button className='p-0' variant='ghost'>{spaceIcon}</Button>
            </PopoverTrigger>
            <PopoverContent className="absolute w-80" onClose={() => setIsOpen(false)} side='bottom' align='start' >
                <Flex mb={10} >
                    <Flex direction='column' justify='flex-start' w='100%' ff='Lato'>
                        <span className="text-[12px] font-semibold tracking-wide text-muted-foreground mb-2">Avatar color</span>
                        <Flex gap={10} w='100%'>
                            {colorSwatchList.map((swatch) => ( <ColorSwatch 
                                key={swatch}
                                className='cursor-pointer'
                                color={swatch}
                                size={18} 
                                onClick={() => handleIconColorChange(swatch)}
                            /> ))}
                        </Flex>
                        <Divider size="sm" w='100%' mt='14' m='auto' className='border-[1px] border-gray-500/[.55] ' />
                    </Flex>
                </Flex>

                <Flex maxH={270} className='overflow-y-auto' >
                    <InfiniteScrollIconButtons
                        filledIcons={filledIcons}
                        color={color}
                        handleSpaceIconClick={handleSpaceIconClick}
                        activeIndex={activeIndex}
                        colorMode={colorMode}
                        itemsPerLoad={70}
                    />
                </Flex>
            </PopoverContent>
        </Popover>
    );
};

export default SpaceCreationIconsPopover;