import React from 'react';
import dayjs from 'dayjs';

import { Button, Box,Flex,Text } from '@mantine/core';
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
            <Flex align='center' justify='space-between' py={30}>
                <div className='user-home-all-content-left-spacing'>
                    <Flex direction={{ base: 'column' }} gap={5}>
                            <Flex align='center' gap={8}>
                                <Flex align='center' justify='center' >
                                    {Icons('IconHome', 20,20,themeColors.text[3])}
                                </Flex>
                                <Text ff='Inter' fw={700} fz='18.4' c={themeColors.text[3]} >
                                    {spaceName}
                                </Text>
                            </Flex>
                        <Text ff='Inter' fw={400} fz='13.2' className='text-muted-foreground'>{dayOfWeek}, {month} {date.getDate()}, {date.getFullYear()}</Text>
                    </Flex>
                </div>
                
                <div>
                    <Button 
                    bd={`.1px solid ${colorScheme==='dark' ? '#048369' : '#24b689e3'}`}
                    radius={8} p='1px 13px' 
                    c='#fafafa' className='bg-teal-500 transition-all duration-200 ease-linear hover:bg-teal-600' classNames=''
                    >
                        <Flex align='center'>
                            <Box me={8} >
                                {Icons('IconFidgetSpinner',18,18,'#fafafa')}
                            </Box>
                            <div>Customize</div>
                        </Flex>
                    </Button>
                </div>
            </Flex>
                
        </>
    )
}

export default HomeHeader;