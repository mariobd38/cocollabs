import React, { useMemo, isValidElement, useState } from 'react';

import { Flex,Divider,Avatar,ColorInput,Group,ColorSwatch } from '@mantine/core';

import {Icons} from '@/components/icons/icons';
import { IconsFilled, GetAllFilledIcons } from '@/components/icons/iconsFilled';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import getProfileSize from '@/utils/calculateProfileIconSize';

import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover"

const HexColorInput = ({ value, onChange, spaceIcon, setSpaceIcon, setColor, firstLetter, iconBg,colorMode, ...props }) => {
    const handleChange = (newValue) => {
        let updatedValue = newValue.startsWith('#') ? newValue : `#${newValue}`;
        updatedValue = updatedValue.slice(0, 7).replace(/[^#0-9A-Fa-f]/g, '');

        const avatarContent = isValidElement(spaceIcon.props.children)
            ? (
                <svg 
                xmlns={spaceIcon.props.children.props.xmlns} 
                width={spaceIcon.props.children.props.width} 
                height={spaceIcon.props.children.props.height} 
                viewBox={spaceIcon.props.children.props.viewBox} 
                fill={updatedValue} 
                className={spaceIcon.props.children.props.className}
                >
                {spaceIcon.props.children.props.children}
                </svg>
            )
            : firstLetter;

        setSpaceIcon(
        <Avatar 
            color={updatedValue} 
            variant="light" 
            radius='calc(0.25rem * 1)' 
            w={18}
        >
            {avatarContent}
        </Avatar>
        );

        onChange(updatedValue);
    };
  
    return (
        <ColorInput
            className={`space-creation-color-input ${colorMode}`}
            value={value}
            w='140'
            onChange={handleChange}
            withPicker={false}
            withEyeDropper={false}
            {...props}
        />
    );
};

const MemoizedIconButtons = ({ filledIcons, color, handleSpaceIconClick,activeIndex,colorMode }) => {
    const memoizedButtons = useMemo(() => {
      return filledIcons.map((icon,index) => (
        <Avatar 
            key={icon.key} 
            onClick={() => handleSpaceIconClick(icon.key,index)} 
            variant={`${index === activeIndex ? 'outline' : 'transparent'}`}  
            color={color}  
            radius='md'
            w={18}
            className={`cursor-pointer ${activeIndex !== index && `space-creation-icon-button ${colorMode}`}`}
        >
            {IconsFilled(icon.key, 18, 18, color)}
        </Avatar>
      ));
    }, [filledIcons, color, handleSpaceIconClick,activeIndex,colorMode]);
  
    return <>{memoizedButtons}</>;
};

const SpaceCreationIconsPopover = (props) => {
    const { color, setColor, spaceIcon, setSpaceIcon,firstLetter,colorMode,setOpenIconPopover } = props;

    const [colorSwatchActive, setColorSwatchActive] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const filledIcons = useMemo(() => GetAllFilledIcons(), []);

    const iconBg = colorMode==='dark' ? '#313b3f' : '#d5d6d9'

    const handleSpaceIconClick = (key,index) => {
        setActiveIndex(index);
        // const icon = key ? IconsFilled(key,22,22,color) : firstLetter;
        const profileSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mantine-scale')) || 1;
        const size = 3 * 0.5 * profileSize * 16;
        const icon = key ? IconsFilled(key,size, size,color) : firstLetter;
        
        setTimeout(() => setSpaceIcon(<Avatar color={color} variant='light' radius='calc(0.25rem * 1)' w={18}><span className="text-[14px]">{icon}</span></Avatar>),30);
    }

    const handleIconColorChange = (newColor) => {
        if (isValidElement(spaceIcon.props.children)) {
            const props = spaceIcon.props.children.props;

            setTimeout(() => setSpaceIcon(<Avatar color={newColor} variant='light' radius='calc(0.25rem * 1)' w={18}>
                <svg xmlns={props.xmlns} width={props.width} height={props.height} viewBox={props.viewBox}  fill={newColor} className={props.className}>{props.children}</svg>
            </Avatar>),30);
        } 
        // else {
        //     setTimeout(() => setSpaceIcon(<Avatar color={newColor} variant='light' radius='calc(0.25rem * 1)' w={18}>{firstLetter}</Avatar>),30);
        // }
        setColor(newColor);
    }

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
                {/* <Button variant="outline">Open popover</Button> */}
                <Button radius='calc(0.25rem * 1)' p={0} bg='transparent'>
                    {spaceIcon}
                 </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[26rem]" onClose={() => setIsOpen(false)} side='bottom' align='center' >
                {/* <div className="grid gap-4">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensions</h4>
                    <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                    </p>
                </div>
                <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Width</Label>
                    <Input
                        id="width"
                        defaultValue="100%"
                        className="col-span-2 h-8"
                    />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">Max. width</Label>
                    <Input
                        id="maxWidth"
                        defaultValue="300px"
                        className="col-span-2 h-8"
                    />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Height</Label>
                    <Input
                        id="height"
                        defaultValue="25px"
                        className="col-span-2 h-8"
                    />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxHeight">Max. height</Label>
                    <Input
                        id="maxHeight"
                        defaultValue="none"
                        className="col-span-2 h-8"
                    />
                    </div>
                </div>
                </div> */}
                <Flex mb={10} w='97%' justify='space-between' >
                     {colorSwatchActive ? 
                        <>
                            <Group>
                            {colorSwatchList.dark.map((swatch) => (
                                <ColorSwatch 
                                    key={swatch}
                                    className='cursor-pointer'
                                    color={swatch}
                                    size={18} 
                                    onClick={() => handleIconColorChange(swatch)}
                                />
                            ))}
                                
                            </Group>
                            <Divider size="sm" orientation="vertical" h={30} ms='14' m='auto' bd={`.1 solid ${colorMode==='dark' ? '#e7e7e7' : '#898989'}`} />
                        </>
                        :
                        <HexColorInput value={color} onChange={setColor} spaceIcon={spaceIcon} setSpaceIcon={setSpaceIcon} setColor={setColor} firstLetter={firstLetter} iconBg={iconBg} 
                        colorMode={colorMode} />
                    }
                    <Flex align='center'>
                        <Button h={30} p='2px 6px' bg='transparent' bd={`1px solid ${colorMode==='dark' ? '#e7e7e7' : '#898989'}`}
                        className={`space-creation-color-swatch-button ${colorMode}`}
                        onClick={() => setColorSwatchActive(!colorSwatchActive)}>
                            {Icons(colorSwatchActive ? 'IconHash' : 'IconColorFilter', 21, 21, colorMode==='dark' ? '#fafafa' : '#505050')}
                        </Button>
                    </Flex>
                </Flex>

                <Flex wrap='wrap' justify='center' h={280} className='overflow-y-auto' >
                    {/* <Avatar 
                        onClick={() => handleSpaceIconClick(null,-1)} 
                        variant={`${activeIndex === -1 ? 'light' : 'transparent'}`}   
                        color={color}  
                        radius='md'
                        w={18}
                        className={`cursor-pointer space-creation-icon-button ${colorMode}`}
                    >
                        {firstLetter}
                    </Avatar> */}

                    <MemoizedIconButtons
                        filledIcons={filledIcons}
                        color={color}
                        handleSpaceIconClick={handleSpaceIconClick}
                        activeIndex={activeIndex}
                        colorMode={colorMode}
                    />
                </Flex>
            </PopoverContent>
        </Popover>
    );
};

export default SpaceCreationIconsPopover;