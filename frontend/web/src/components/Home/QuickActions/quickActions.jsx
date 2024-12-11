import React from 'react';

import { Grid,Box,Flex,Text } from '@mantine/core';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons/icons';

import TaskCreationModal from '@/components/Home/TaskCreationModal/taskCreationModal';


import './quickActions.css';

const QuickActions = ({themeColors, colorScheme}) => {
    const qaButtons = [
        {title: 'Link project', icon: 'IconLink', description: 'Connect an existing project and keep all your details in one place.'},
        {title: 'New issue', icon: 'IconCheckbox', description: 'Quickly add an issue to your workflow, assign it to a member and set deadlines.'},
        {title: 'Schedule event', icon: 'IconCalendar', description: 'Plan events or meetings easily and send reminders to your team.'},
    ];

    return (
        <>
            <Box pb={25}>
                <Text fz={16.5} pb={5} c={themeColors.text[3]} ff='Lato'>Quick Actions</Text>
                <Flex ff='Inter' justify="center" w='100%'>
                    <Grid pt={10} justify="space-between" gutter="lg" w='100%' >
                        {qaButtons.map((action,index) => (
                            <Grid.Col key={index} span={{ base: 12, sm: 4 }} className='flex justify-center' >
                                <Button type="submit" className={`flex h-full w-full quick-actions-button rounded-lg ${colorScheme}`}>
                                    <div className="p-4 flex h-full flex-col gap-4 border-solid border rounded-lg w-full">
                                        <div className="flex flex-row gap-3 justify-between items-start w-full">
                                            <div className="text-xl font-bold">{action.title}</div>
                                            <Flex>{Icons(action.icon,24,24,themeColors.text[1])}</Flex>
                                        </div>
                                        <p className="text-sm text-muted-foreground text-start">{action.description}</p>
                                    </div>
                                </Button>
                            </Grid.Col>
                        ))}
                    </Grid>
                </Flex>
            </Box>

            <TaskCreationModal themeColors={themeColors} colorScheme={colorScheme} />
        </>
    );
};

export default QuickActions;