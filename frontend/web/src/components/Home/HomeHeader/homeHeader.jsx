import React from 'react';

import { Button, Tooltip, Box,Flex,Text } from '@mantine/core';
import { Icons } from '@/components/icons/icons';

import './homeHeader.css';

const HomeHeader = ({spaceName,themeColors, colorScheme}) => {
    const dayjs = require('dayjs');

    var now = Intl.DateTimeFormat().resolvedOptions().timeZone;
    now = dayjs();
    const date = new Date(now.year(), now.month(), now.date());  // 2009-11-10
    const month = date.toLocaleString('default', { month: 'long' });
    const dayOfWeek = date.toLocaleDateString('en-US',{weekday: 'long'});

    document.body.style.overflowY = 'hidden';

    const homeHeaderButtons = [
        {"icon": Icons('IconCirclePlus',23,23,'#05c099'), "label": "Create"},
        {"icon": Icons('IconUserPlus',23,23,'#05c099'), "label": "Invite"},
        {"icon": Icons('IconSparkles',23,23,'#05c099'), "label": "AI Assistant"},
        {"icon": Icons('IconSettings',23,23,'#05c099'), "label": "Settings"},
    ]
    const homeHeaderBd = `1px solid ${colorScheme==='dark' ? '#898989' : '#b9b9b9'}`;

    return (
        <>
            <Box pos='sticky' top={3.2}  style={{zIndex: "20"}} >
                <Flex align='center' justify='space-between' pos='sticky' bg={themeColors.bg[1]} h={59.3}
                className='user-home-all-content-left-spacing' 
                style={{ borderBottom: `1px solid ${colorScheme === 'dark' ? '#323539' : '#b9b9b9'}`, zIndex: "2" }}>
                    <Flex align='center' >
                        <Flex me={10}>
                            {Icons('IconHome', 24,24,themeColors.text[3])}
                        </Flex>
                        <Text c={themeColors.text[3]} ff='Lato' fw={600} fz='17'>Home</Text>
                    </Flex>
                    <div className='d-flex gap-3 align-items-center'>
                        {homeHeaderButtons.map((button, index) => (
                            <div key={index} >
                                <Tooltip label={button.label} bg={`${colorScheme==='dark' ? '#121212' : '#d7d7d7'}`} c={`${colorScheme==='dark' ? '#fafafa' : '#121212'}`} className='user-home-tooltip' position="bottom" offset={8} openDelay={100} >
                                    <Button radius='8' fw={400} c='#fafafa' p='0px 7px' bg='transparent' bd={homeHeaderBd} className={`home-header-button ${colorScheme}`}>
                                        {button.icon}
                                    </Button>
                                </Tooltip>
                            </div>
                        ))}
                    </div>
                </Flex>
            </Box>

            <Flex  align='center' justify='space-between' py={30}>
                <Box className='user-home-all-content-left-spacing'>
                    <Flex direction={{ base: 'column' }} gap={5}>
                        <Text ff='Inter' fw={700} fz='18.4' c={themeColors.text[3]}>{spaceName}</Text>
                        <Text ff='Inter' fw={400} fz='13.2' c={themeColors.text[8]}>{dayOfWeek}, {month} {date.getDate()}, {date.getFullYear()}</Text>
                    </Flex>
                </Box>
                
                {/* <div className='fafafa-color lato-font-600 user-home-all-content-left-spacing' style={{fontSize: ".99rem"}}>
                    <span>{dayOfWeek}, {month} {date.getDate()}, {date.getFullYear()}</span>
                </div> */}
                <Box>
                    <Button bd={`.1px solid ${colorScheme==='dark' ? '#048369' : '#24b689e3'}`}
                    radius={8} p='1px 13px' color={`${colorScheme==='dark' ? '#048369' : '#24b689e3'}`}
                    c='#fafafa' className='home-header-customize-button' bg='#24b689df'
                    >
                        <Flex align='center'>
                            <Box me={8} >
                                {Icons('IconFidgetSpinner',18,18,'#fafafa')}
                            </Box>
                            <span>Customize</span>
                        </Flex>
                    </Button>
                </Box>
            </Flex>
                
        </>
    )
}

export default HomeHeader;