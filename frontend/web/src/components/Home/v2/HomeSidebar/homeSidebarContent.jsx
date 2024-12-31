import React from 'react';

import { Box,UnstyledButton,Badge,Tooltip,Flex,Text } from '@mantine/core';

import { SidebarGroup,SidebarGroupContent,SidebarMenu } from "@/components/ui/sidebar"
import { Icons } from "@/components/icons/icons";

import classes from '@/styles/home/homeSidebar.module.css';
import '@/styles/home/homeSidebar.css';


const links = [
    { icon: 'IconHome', label: 'Home' },
    { icon: 'IconWorldSearch', label: 'Discover' },
    { icon: 'IconInbox', label: 'Inbox' },
    { icon: 'IconFolder', label: 'Projects' },
    { icon: 'IconFile', label: 'Docs' },
    { icon: 'IconCalendar', label: 'Calendar' },
    // { icon: 'IconDotsCircleHorizontal', label: 'More' },
];

const HomeSidebarContent = ({ openSidebarToggle,themeColors,colorScheme }) => {
    const mainLinks = links.map((link) => (
        <React.Fragment key={link.label} >
            {openSidebarToggle ? 
                <UnstyledButton key={link.label} className={`${classes.mainLink} last:mb-0 ${classes.active}`} data-theme={colorScheme} >
                    <Flex>
                        <div className={`${classes.mainLinkIcon} ${classes.active}`}>
                            {Icons(link.icon, 20, 20, themeColors.text[10])}
                        </div>
                        <Text ff='Inter' fz={15} c={themeColors.text[5]} className="label">
                            {link.label}
                        </Text>
                    </Flex>
                    {link.notifications && (
                        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
                            {link.notifications}
                        </Badge>
                    )}
                </UnstyledButton>
            : 
            <Tooltip 
                label={link.label} 
                position="right" 
                withArrow 
                arrowOffset={10} 
                arrowSize={4} 
                bg={`${colorScheme==='dark' ? '#121212' : '#272727'}`} 
                c='#f0f0f0' 
                openDelay={100} 
                offset={{ mainAxis: 10 }}
            >
                <UnstyledButton key={link.label} className={`${classes.mainLink} px-[5px] last:mb-0` } data-theme={colorScheme}>
                    <Flex align='center' pos='relative' flex={1} justify='center'>
                        <Box mb={2}>
                            {Icons(link.icon, 20, 20, themeColors.text[10],1.7)}
                            {link.notifications && (
                                <Badge circle size="xs" color="blue" className={classes.badge + ' translate-y-[-65%] translate-x-[55%]'} ff='Inter' pos='absolute' top={0} right={0} >
                                    {link.notifications}
                                </Badge>
                            )} 
                        </Box>
                    </Flex>
                </UnstyledButton>
            </Tooltip>
            }
        </React.Fragment>
    ));

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu >
                    <Box mb='var(--mantine-spacing-md)' my={8} bg='transparent' data-theme={colorScheme}>
                        <div className={classes.mainLinks}>{mainLinks}</div>
                    </Box>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default HomeSidebarContent;