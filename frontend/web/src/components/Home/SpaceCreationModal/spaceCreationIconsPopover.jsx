import React, { useMemo,isValidElement,useState,useRef,useCallback,useEffect } from 'react';

import { Flex,Divider,Avatar,ColorSwatch } from '@mantine/core';

import {Icons} from '@/components/icons/icons';
import { IconsFilled, GetAllFilledIcons } from '@/components/icons/iconsFilled';
import { Button } from "@/components/ui/button"
import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover"

import getProfileSize from '@/utils/calculateProfileIconSize';

// const HexColorInput = ({ value, onChange, spaceIcon, setSpaceIcon, setColor, firstLetter, iconBg,colorMode, ...props }) => {
//     const handleChange = (newValue) => {
//         let updatedValue = newValue.startsWith('#') ? newValue : `#${newValue}`;
//         updatedValue = updatedValue.slice(0, 7).replace(/[^#0-9A-Fa-f]/g, '');

//         const avatarContent = isValidElement(spaceIcon.props.children)
//             ? (
//                 <svg 
//                 xmlns={spaceIcon.props.children.props.xmlns} 
//                 width={spaceIcon.props.children.props.width} 
//                 height={spaceIcon.props.children.props.height} 
//                 viewBox={spaceIcon.props.children.props.viewBox} 
//                 fill={updatedValue} 
//                 className={spaceIcon.props.children.props.className}
//                 >
//                 {spaceIcon.props.children.props.children}
//                 </svg>
//             )
//             : firstLetter;

//         setSpaceIcon(
//         <Avatar 
//             color={updatedValue} 
//             variant="light" 
//             radius='calc(0.25rem * 1)' 
//             w={18}
//         >
//             {avatarContent}
//         </Avatar>
//         );

//         onChange(updatedValue);
//     };
  
//     return (
//         <ColorInput
//             className={`space-creation-color-input ${colorMode}`}
//             value={value}
//             w='140'
//             onChange={handleChange}
//             withPicker={false}
//             withEyeDropper={false}
//             {...props}
//         />
//     );
// };


const InfiniteScrollIconButtons = ({ 
    filledIcons, 
    color, 
    handleSpaceIconClick, 
    activeIndex, 
    colorMode,
    itemsPerLoad = 20
}) => {
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
        return filledIcons
            .slice(0, displayedItems)
            .map((icon, index) => (
                <Avatar 
                    key={icon.key} 
                    onClick={() => handleSpaceIconClick(icon.key, index)} 
                    variant={index === activeIndex ? 'outline' : 'transparent'}  
                    color={color}  
                    radius="md"
                    // bg='red'
                    w={18}
                    size='35'
                    className={`cursor-pointer ${activeIndex !== index && `space-creation-icon-button ${colorMode}`}`}
                >
                    {IconsFilled(icon.key, 18, 18, color)}
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
    const { color, setColor, spaceIcon, setSpaceIcon,firstLetter,colorMode,setOpenIconPopover } = props;

    // const [colorSwatchActive, setColorSwatchActive] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const filledIcons = useMemo(() => GetAllFilledIcons(), []);

    const iconBg = colorMode==='dark' ? '#313b3f' : '#d5d6d9'

    const handleSpaceIconClick = (key,index) => {
        setActiveIndex(index);
        // const icon = key ? IconsFilled(key,22,22,color) : firstLetter;
        const profileSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mantine-scale')) || 1;
        const size = 3 * 0.5 * profileSize * 16;
        const icon = key ? IconsFilled(key,size, size,color) : firstLetter;
        
        setTimeout(() => setSpaceIcon(<Avatar color={color} variant='light' radius='calc(0.25rem * 1)' w={18}>{icon}</Avatar>),30);
    }

    const handleIconColorChange = (newColor) => {
        if (isValidElement(spaceIcon.props.children)) {
            const props = spaceIcon.props.children.props;

            setTimeout(() => setSpaceIcon(<Avatar color={newColor} variant='light' radius='calc(0.25rem * 1)' w={18}>
                <svg xmlns={props.xmlns} width={props.width} height={props.height} viewBox={props.viewBox}  fill={newColor} className={props.className}>{props.children}</svg>
            </Avatar>),30);
        } 
        else {
            setTimeout(() => setSpaceIcon(<Avatar color={newColor} variant='light' radius='calc(0.25rem * 1)' w={18}>{firstLetter}</Avatar>),30);
        }
        setColor(newColor);
    }
    console.log(spaceIcon);

    const colorSwatchList = 
        {
            dark: ["#d9d9d9","#ffd6ba","#009790","#0077b6","#80ed99","#e9c46a","#e76f51"]
        }

    const [isOpen, setIsOpen] = useState(false);

    return (
        // <Popover placement="bottom-start" className={`space-creation-icon-popover-parent ${colorMode}`} >
        //     <PopoverTrigger className='space-creation-icon-popover-trigger'>
        //         <Button h={40} radius="md" p={0} bg='transparent'>
        //             {spaceIcon}
        //         </Button>
                
        //     </PopoverTrigger>
        //     <PopoverContent>
        //         <Flex mb={10} w='97%' justify='space-between' >
        //             {colorSwatchActive ? 
        //                 <>
        //                     <Group>
        //                     {colorSwatchList.dark.map((swatch) => (
        //                         <ColorSwatch 
        //                             key={swatch}
        //                             className='cursor-pointer'
        //                             color={swatch}
        //                             size={22} 
        //                             onClick={() => handleIconColorChange(swatch)}
        //                         />
        //                     ))}
                                
        //                     </Group>
        //                     <Divider size="sm" orientation="vertical" h={30} ms='14' m='auto' bd={`.1 solid ${colorMode==='dark' ? '#e7e7e7' : '#898989'}`} />
        //                 </>
        //                 :
        //                     <HexColorInput value={color} onChange={setColor} spaceIcon={spaceIcon} setSpaceIcon={setSpaceIcon} setColor={setColor} firstLetter={firstLetter} iconBg={iconBg} 
        //                     colorMode={colorMode} />
        //             }
        //             <Flex align='center'>
        //                 <Button h={30} p='2px 6px' bg='transparent' bd={`1px solid ${colorMode==='dark' ? '#e7e7e7' : '#898989'}`}
        //                 className={`space-creation-color-swatch-button ${colorMode}`}
        //                 onClick={() => setColorSwatchActive(!colorSwatchActive)}>
        //                     {Icons(colorSwatchActive ? 'IconHash' : 'IconColorFilter', 21, 21, colorMode==='dark' ? '#fafafa' : '#505050')}
        //                 </Button>
        //             </Flex>
        //         </Flex>

        //         <Flex wrap='wrap' justify='center' gap={2} h={280} style={{overflowY: "auto"}}>
        //             <Avatar 
        //                 onClick={() => handleSpaceIconClick(null,-1)} 
        //                 variant={`${activeIndex === -1 ? 'light' : 'transparent'}`}   
        //                 color={color}  
        //                 radius="md" 
        //                 w={18}
        //                 className={`cursor-pointer space-creation-icon-button ${colorMode}`}
        //             >
        //                 {firstLetter}
        //             </Avatar>

        //             <MemoizedIconButtons
        //                 filledIcons={filledIcons}
        //                 color={color}
        //                 handleSpaceIconClick={handleSpaceIconClick}
        //                 activeIndex={activeIndex}
        //                 colorMode={colorMode}
        //             />
        //         </Flex>
        //     </PopoverContent>
        // </Popover>
        <Popover open={isOpen} onOpenChange={(isOpen) => {setIsOpen(isOpen);setOpenIconPopover(isOpen);}}>
            <PopoverTrigger asChild>
                <Button radius='calc(0.25rem * 1)' className='p-0' variant='ghost'>
                    {spaceIcon}
                 </Button>
            </PopoverTrigger>
            <PopoverContent className="absolute w-[20rem]" onClose={() => setIsOpen(false)} side='bottom' align='center' >
                <Flex mb={10} w='97%' >
                    <Flex direction='column' justify='flex-start' w='100%'>
                        <span className="text-sm text-muted-foreground mb-2">
                            Avatar color
                        </span>
                        <Flex gap={10} w='100%'>
                        {colorSwatchList.dark.map((swatch) => (
                            <ColorSwatch 
                                key={swatch}
                                className='cursor-pointer'
                                color={swatch}
                                size={18} 
                                onClick={() => handleIconColorChange(swatch)}
                            />
                        ))}
                        </Flex>
                        {/* <Divider size="sm" orientation="vertical" h={30} ms='14' m='auto' bd={`.1 solid ${colorMode==='dark' ? '#e7e7e7' : '#898989'}`} /> */}
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