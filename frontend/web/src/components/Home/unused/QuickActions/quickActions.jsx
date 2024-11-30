import React from 'react';

import { Grid, Box, Flex, Text,Button } from '@mantine/core';

import {Icons} from '../../icons/icons';

import './quickActions.css';

const QuickActions = ({themeColors, colorScheme}) => {
    const qaButtons = [
        {text: 'Create a task', icon: 'IconCheckbox'},
        {text: 'Schedule an event', icon: 'IconCalendar'},
        {text: 'Create new doc', icon: 'IconFile'},
        {text: 'Create a milestone', icon: 'IconTargetArrow'},
    ];

    return (
        <Box pb={25}>
            <Box className='user-home-all-content-left-spacing'>
                <Box p={20} class='quick-actions-parent' bg={themeColors.bg[4]} bd={`1px solid ${colorScheme === 'dark' ? '#323539' : '#b9b9b9'}`} 
                    style={{borderRadius: "10px", boxShadow: `0 2px 10px ${colorScheme==='dark' ? '#30314447' : '#70718457'}`}} >
                    <Text fz='18'  c={themeColors.text[3]} ff='Lato'>Quick Actions</Text>
                    <Flex py={10} ff='Inter' justify="center" w='100%'>
                        <Grid pt={10} justify="space-between" gutter="lg" w='100%' >
                            {qaButtons.map((button,index) => (
                                <Grid.Col key={index}  span={{ base: 12, md: 6, lg: 3 }} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button c={themeColors.text[4]} className='quick-actions-button' bd={`1px solid ${colorScheme==='dark' ? '#404040e4' : '#b0b0b0e4'}`}>
                                        <span style={{marginRight: "15px"}}>{Icons(button.icon,24,24,themeColors.text[1])}</span>{button.text}
                                    </Button>
                                </Grid.Col>
                            ))}
                        </Grid>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default QuickActions;