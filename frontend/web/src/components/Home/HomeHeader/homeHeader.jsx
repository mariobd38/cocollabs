import React from 'react';
import dayjs from 'dayjs';

import { Button, Box,Text } from '@mantine/core';
import { Icons } from '@/components/icons/icons';

import './homeHeader.css';

const HomeHeader = ({spaceName,themeColors, colorScheme}) => {
    // const dayjs = require('dayjs');

    var now = Intl.DateTimeFormat().resolvedOptions().timeZone;
    now = dayjs();
    const date = new Date(now.year(), now.month(), now.date());  // 2009-11-10
    const month = date.toLocaleString('default', { month: 'long' });
    const dayOfWeek = date.toLocaleDateString('en-US',{weekday: 'long'});

    document.body.style.overflowY = 'hidden';

    return (
        <>
            <div className='flex justify-between align-center py-7'>
                <div className='user-home-all-content-left-spacing'>
                    <div className='flex flex-col gap-1'>
                            <div className='flex items-center gap-2.5'>
                                <div className='flex justify-center items-center'>
                                    {Icons('IconHome', 20,20,themeColors.text[3])}
                                </div>
                                <Text ff='Inter' fw={700} fz='18.4' c={themeColors.text[3]} >
                                    {spaceName}
                                </Text>
                            </div>
                        <Text ff='Inter' fw={400} fz='13.2' className='text-muted-foreground'>{dayOfWeek}, {month} {date.getDate()}, {date.getFullYear()}</Text>
                    </div>
                </div>
                
                <div>
                    <Button 
                    bd={`.1px solid ${colorScheme==='dark' ? '#048369' : '#24b689e3'}`}
                    radius={8} p='1px 13px'
                    c='#fafafa' className='bg-teal-500 transition-all duration-200 ease-linear hover:bg-teal-600'
                    >
                        <div className='flex items-center'>
                            <Box me={8} >
                                {Icons('IconFidgetSpinner',18,18,'#fafafa')}
                            </Box>
                            <div>Customize</div>
                        </div>
                    </Button>
                </div>
            </div>
                
        </>
    )
}

export default HomeHeader;