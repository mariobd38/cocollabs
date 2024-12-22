import React, { useRef,useEffect,useState,useCallback } from "react";
import { Avatar,Box,UnstyledButton,Badge,Tooltip,Flex,Text } from '@mantine/core';

import {Icons} from "@/components/icons/icons";
 
import { Sidebar,SidebarContent,SidebarGroup,SidebarGroupContent,SidebarMenu } from "@/components/ui/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

import CustomDropdown from '@/components/customDropdown';

import classes from '@/styles/home/homeSidebar.module.css';
import '@/styles/home/homeSidebar.css';


const links = [
    { icon: 'IconWorldSearch', label: 'Explore' },
    { icon: 'IconHome', label: 'Home' },
    { icon: 'IconInbox', label: 'Inbox' },
    { icon: 'IconFolder', label: 'Projects' },
    { icon: 'IconFile', label: 'Docs' },
    { icon: 'IconCalendar', label: 'Calendar' },
    { icon: 'IconDotsCircleHorizontal', label: 'More' },
];


const HomeSidebarv2 = ({openSidebarToggle, themeColors, colorScheme, setOpenSidebarToggle, spaceData}) => {
    const mainLinks = links.map((link) => (
        <React.Fragment key={link.label} >
            {openSidebarToggle ? 
                <UnstyledButton key={link.label} className={`${classes.mainLink} last:mb-0 ${classes.active}`} data-theme={colorScheme} 
                >
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
                                <Badge circle size="xs" color="blue" className={classes.badge}>
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

    const profileLink = (
        <div className={openSidebarToggle ? 'home-sidebar-profile-parent-div active' : 'home-sidebar-profile-parent-div'}>
            <UnstyledButton className={`flex justify-start ${!openSidebarToggle ?  classes.mainLink : 'px-3'} ${classes.profile}`} >
                <Flex gap={openSidebarToggle && 10} align='center'>
                    <Avatar className='profile-avatar' color={spaceData.icon && spaceData.icon.color} radius={spaceData.icon && spaceData.icon.radius}>
                        {spaceData.icon && spaceData.icon.children}
                    </Avatar>

                    <Text maw={165} ps={3} c={themeColors.text[3]} fw={550} ff='Lato'
                    style={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>
                        {openSidebarToggle && spaceData.name}
                    </Text>
                </Flex>
            </UnstyledButton>
        </div>
    );

    const currSidebarColor = colorScheme === 'dark' ? 'hsl(0, 0%, 16%)' : 'hsl(0, 0%, 85%)';
    // const [sidebarColor, setSidebarColor] = useState(themeColors.bg[4]);
    const [sidebarColor, setSidebarColor] = useState(currSidebarColor);
    const [isResizing, setIsResizing] = useState(false);
    // const [isExpanded, setIsExpanded] = useState(false);
    const sidebarRef = useRef(null);
    const resizeHandleRef = useRef(null);
    const [width, setWidth] = useState(210);

    // Configuration
    const MIN_WIDTH = 210;
    const MAX_WIDTH = 310;
    

    useEffect(() => {
        setTimeout(() => {
            setSidebarColor(currSidebarColor);
        },0)
    }, [currSidebarColor,themeColors]);


    const handleMouseMove = useCallback((e) => {
        if (!isResizing) return;
    
        // Calculate new width
        const newWidth = e.clientX - (sidebarRef.current?.getBoundingClientRect().left || 0);
        
        // Constrain width
        const constrainedWidth = Math.max(MIN_WIDTH, Math.min(newWidth, MAX_WIDTH));
        
        setWidth(constrainedWidth);
        setOpenSidebarToggle(e.clientX > 150);
        // setIsExpanded(constrainedWidth > MIN_WIDTH);
      }, [isResizing,setOpenSidebarToggle]);

    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    
    // Add/remove event listeners for resizing
    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, handleMouseMove, handleMouseUp]);

    const startResize = (e) => {
        e.preventDefault();
        setIsResizing(true);
    };


    return (
        <SidebarProvider openSidebarToggle={openSidebarToggle} currentWidth={width}>
            <Sidebar className='top-[64.2px] h-full' ref={sidebarRef} >
            <SidebarContent >
                <SidebarGroup>
                {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
                <SidebarGroupContent>
                    <SidebarMenu >
                    {/* {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))} */}
                    <div className={`${classes.section} my-2`} data-theme={colorScheme}>
                        <div className={classes.mainLinks}>{mainLinks}</div>
                    </div>
                    {/* {(currSidebarColor === sidebarColor || isResizing.current) && */}
                    <div ref={resizeHandleRef} className={`resize-handle ${colorScheme}`} onMouseDown={startResize} ></div>
        
                    </SidebarMenu>
                </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    )
}

export default HomeSidebarv2;
