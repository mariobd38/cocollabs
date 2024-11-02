import React from 'react';

import { Button, Tooltip, Box,Flex,Text } from '@mantine/core';
// import { useLocalState } from "../../../utils/useLocalStorage";
import {Icons} from '../../icons/icons';

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
            <div style={{position: "sticky", top: "1.8px", zIndex: "20"}}>
                <div className='d-flex align-items-center justify-content-between user-home-all-content-left-spacing' style={{position: "sticky",top: ".13rem",background: themeColors.bg[1], 
                    borderBottom: `1px solid ${colorScheme === 'dark' ? '#323539' : '#b9b9b9'}`, zIndex: "2",height: "59.4px", 
                    // if quick actions is active, make top = 5rem;
                }}>
                    <span className='lato-font d-flex align-items-center'>
                        <div className='me-2 d-flex'>
                            {Icons('IconHome', 24,24,themeColors.text[3])}
                        </div>
                         {/* <IconHome className='me-2' color='#f2f4f7'/> */}
                        <Text c={themeColors.text[3]} ff='Lato' fw='600' fz='17'>Home</Text>
                    </span>
                    <div className='d-flex gap-3 align-items-center'>
                        {homeHeaderButtons.map((button, index) => (
                            <div key={index} >
                                <Tooltip label={button.label} bg={`${colorScheme==='dark' ? '#121212' : '#d7d7d7'}`} c={`${colorScheme==='dark' ? '#fafafa' : '#121212'}`} className='user-home-tooltip' position="bottom" offset={8} openDelay={200} >
                                    <Button radius='8' fw='400' c='#fafafa' p='0px 7px' bg='transparent' bd={homeHeaderBd} className={`home-header-button ${colorScheme}`}>
                                        {button.icon}
                                    </Button>
                                </Tooltip>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='d-flex align-items-center justify-content-between' style={{margin: "24px 0"}}>
                <div className='user-home-all-content-left-spacing'>
                    <Box>
                        <Flex direction={{ base: 'column' }} gap={5}>
                            <Text ff='Inter' fw='700' fz='18.4' c={themeColors.text[3]}>{spaceName}</Text>
                            <Text ff='Inter' fw='400' fz='13.2' c={themeColors.text[8]}>{dayOfWeek}, {month} {date.getDate()}, {date.getFullYear()}</Text>
                        </Flex>
                    </Box>
                    {/* c4c0c6 */}
                </div>
                
                {/* <div className='fafafa-color lato-font-600 user-home-all-content-left-spacing' style={{fontSize: ".99rem"}}>
                    <span>{dayOfWeek}, {month} {date.getDate()}, {date.getFullYear()}</span>
                </div> */}
                <div>
                    <Button bd={`.1px solid ${colorScheme==='dark' ? '#048369' : '#24b689e3'}`}
                    radius={8} p='1px 13px' color={`${colorScheme==='dark' ? '#048369' : '#24b689e3'}`}
                    c='#fafafa' className='home-header-customize-button'
                    >
                        <div className='d-flex align-items-center'>
                            <div style={{marginRight: "7px"}}>
                                {Icons('IconFidgetSpinner',18,18,'#fafafa')}
                            </div>
                            <span>Customize</span>
                        </div>
                    </Button>
                </div>
            </div>
                
        </>
    )
}

export default HomeHeader;