import React, { useMemo, isValidElement, useState } from 'react';

import {Icons} from '../../icons/icons';
import { IconsFilled, GetAllFilledIcons } from '../../icons/iconsFilled';

import { Button,Flex,Divider,Avatar,ColorInput,Group,ColorSwatch } from '@mantine/core';
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";


const HexColorInput = ({ value, onChange, spaceIcon, setSpaceIcon, setColor, firstLetter, iconBg,colorMode, ...props }) => {
    const handleChange = (newValue) => {
        // Ensure the value starts with '#'
        if (!newValue.startsWith('#')) {
            newValue = '#' + newValue;
        }
        // Limit to 7 characters (# + 6 hex digits)
        newValue = newValue.slice(0, 7);
        // Only allow valid hex characters
        newValue = newValue.replace(/[^#0-9A-Fa-f]/g, '');

        if (isValidElement(spaceIcon.props.children)) {
            const props = spaceIcon.props.children.props;
            setTimeout(() => setSpaceIcon(<Avatar color={newValue} variant='light' radius="md" w={18}>
                <svg xmlns={props.xmlns} width={props.width} height={props.height} viewBox={props.viewBox}  fill={newValue} className={props.className}>{props.children}</svg>
            </Avatar>),30);
            } else {
                setTimeout(() => setSpaceIcon(<Avatar color={newValue} variant='light' radius="md" w={18}>{firstLetter}</Avatar>),30);
            }
        setColor(newValue);
        onChange(newValue);
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
            style={{cursor: "pointer"}} 
            key={icon.key} 
            onClick={() => handleSpaceIconClick(icon.key,index)} 
            variant={`${index === activeIndex ? 'outline' : 'transparent'}`}  
            color={color}  
            radius="md" 
            w={18}
            // bg=''
            className={`${activeIndex !== index && `space-creation-icon-button ${colorMode}`}`}
        >
            {IconsFilled(icon.key, 18, 18, color)}
        </Avatar>
      ));
    }, [filledIcons, color, handleSpaceIconClick,activeIndex,colorMode]);
  
    return <>{memoizedButtons}</>;
};

const SpaceCreationIconsPopover = (props) => {
    const { color, setColor, spaceIcon, setSpaceIcon,firstLetter,colorMode } = props;

    const [colorSwatchActive, setColorSwatchActive] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const filledIcons = useMemo(() => GetAllFilledIcons(), []);

    const iconBg = colorMode==='dark' ? '#313b3f' : '#d5d6d9'

    const handleSpaceIconClick = (key,index) => {
        setActiveIndex(index);
        const icon = key ? IconsFilled(key,25,25,color) : firstLetter;
        setTimeout(() => setSpaceIcon(<Avatar color={color} variant='light' radius="md" w={18}>{icon}</Avatar>),30);
    }

    const handleIconColorChange = (newColor) => {
        if (isValidElement(spaceIcon.props.children)) {
            const props = spaceIcon.props.children.props;

            setTimeout(() => setSpaceIcon(<Avatar color={newColor} variant='light' radius="md" w={18}>
                <svg xmlns={props.xmlns} width={props.width} height={props.height} viewBox={props.viewBox}  fill={newColor} className={props.className}>{props.children}</svg>
            </Avatar>),30);
        } else {
            setTimeout(() => setSpaceIcon(<Avatar color={newColor} variant='light' radius="md" w={18}>{firstLetter}</Avatar>),30);
        }
        setColor(newColor);
    }

    const colorSwatchList = 
        {
            dark: ["#d9d9d9","#ffd6ba","#009790","#0077b6","#80ed99","#e9c46a","#e76f51"]
        }
        // {color: "#d9d9d9"}, {color: "#ffd6ba"}, {color: "#009790"}, {color: "#0077b6"},
        // {color: "#80ed99"}, {color: "#e9c46a"}, {color: "#e76f51"},
    

    return (
        <Popover 
            placement="bottom-start" 
            className={`space-creation-icon-popover-parent ${colorMode}`}
        >

            <PopoverTrigger className='space-creation-icon-popover-trigger'>
                <Button h={40} radius="md" p={0} bg='transparent'>
                    {spaceIcon}
                </Button>
                
            </PopoverTrigger>
            <PopoverContent>
                <Flex mb={10} w='97%' justify='space-between' >
                    {colorSwatchActive ? 
                        <>
                        <Group>
                        {colorSwatchList.dark.map((swatch) => (
                            <ColorSwatch 
                                key={swatch}
                                style={{cursor: "pointer"}} 
                                color={swatch}
                                size={22} 
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
                    <div className='d-flex align-items-center'>
                        <Button h={30} p='2px 6px' bg='transparent' bd={`1px solid ${colorMode==='dark' ? '#e7e7e7' : '#898989'}`}
                        className={`space-creation-color-swatch-button ${colorMode}`}
                        onClick={() => setColorSwatchActive(!colorSwatchActive)}>
                            {Icons(colorSwatchActive ? 'IconHash' : 'IconColorFilter', 21, 21, colorMode==='dark' ? '#fafafa' : '#505050')}
                        </Button>
                    </div>
                </Flex>

                <Flex wrap='wrap' justify='center' gap={2} h={280} style={{overflowY: "auto"}}>
                    <Avatar 
                        style={{cursor: "pointer"}} 
                        onClick={() => handleSpaceIconClick(null,-1)} 
                        // variant={`${activeIndex === -1 ? 'light' : 'transparent'}`} 
                        variant={`${activeIndex === -1 ? 'light' : 'transparent'}`}   
                        color={color}  
                        radius="md" 
                        w={18}
                        // className={`${!activeIndex === -1 && 'space-creation-icon-button'}`}
                        className={`space-creation-icon-button ${colorMode}`}
                    >
                        {firstLetter}
                    </Avatar>

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