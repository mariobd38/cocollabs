import React from 'react';

import { Grid,Box,Flex,Text } from '@mantine/core';
import { Button } from '@/components/ui/button';

import { Icons } from '@/components/icons/icons';

import './quickActions.css';

const QuickActions = ({themeColors, colorScheme}) => {
    const qaButtons = [
        {title: 'Link project', icon: 'IconLink', description: 'Connect an existing project and keep all your details in one place.'},
        {title: 'New task', icon: 'IconCheckbox', description: 'Quickly add a task to your workflow, assign it to a member and set deadlines.'},
        {title: 'Schedule event', icon: 'IconCalendar', description: 'Plan events or meetings easily and send reminders to your team.'},
        // {title: 'New document', icon: 'IconFile', description: 'Start a fresh document, add content, and collaborate with your team in real time.'},
    ];

    return (
        // <Box pb={25}>
        //         <Box p={20} class='quick-actions-parent' bg={themeColors.bg[4]} bd={`1px solid ${colorScheme === 'dark' ? '#323539' : '#b9b9b9'}`} 
        //             style={{borderRadius: "10px", boxShadow: `0 2px 10px ${colorScheme==='dark' ? '#30314447' : '#70718457'}`}} >
        //             <Text fz='18'  c={themeColors.text[3]} ff='Lato'>Quick Actions</Text>
        //             <Flex py={10} ff='Inter' justify="center" w='100%'>
        //                 <Grid pt={10} justify="space-between" gutter="lg" w='100%' >
        //                     {qaButtons.map((button,index) => (
        //                         <Grid.Col key={index}  span={{ base: 12, md: 6, lg: 3 }} style={{ display: 'flex', justifyContent: 'center' }}>
        //                             <Button c={themeColors.text[4]} className='quick-actions-button' bd={`1px solid ${colorScheme==='dark' ? '#404040e4' : '#b0b0b0e4'}`}>
        //                                 <span style={{marginRight: "15px"}}>{Icons(button.icon,24,24,themeColors.text[1])}</span>{button.text}
        //                             </Button>
        //                         </Grid.Col>
        //                     ))}
        //                 </Grid>
        //             </Flex>
        //         </Box>
        // </Box>
        <Box pb={25}>
            <Text fz={17} pb={5} c={themeColors.text[3]} ff='Lato'>Quick Actions</Text>
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
                                    {/* <div className="flex flex-row gap-2 mt-2">
                                        <a className="w-fit" href="/review/github">
                                            <div className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent px-2 py-1 text-xs font-semibold rounded-sm bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                                GitHub
                                            </div>
                                        </a>
                                        <a className="w-fit" href="/review/gitlab">
                                            <div className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent px-2 py-1 text-xs font-semibold rounded-sm bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                            GitLab
                                            </div>
                                        </a>
                                    </div> */}
                                </div>
                            </Button>
                        </Grid.Col>
                    ))}
                </Grid>
            </Flex>
        </Box>
    );
};

export default QuickActions;