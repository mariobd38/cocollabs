import React, { useState, useRef,useEffect } from 'react';

import { Avatar,Box,UnstyledButton,Badge,Tooltip,rem,Flex,Text } from '@mantine/core';
import CustomDropdown from '@/components/customDropdown';


import {Icons} from '@/components/icons/icons';

import HomeSidebarSpaceOptions from '@/components/Home/HomeSidebar/HomeSidebarSpaceOptions/homeSidebarSpaceOptions';
import SpaceCreationModal from '@/components/Home/SpaceCreationModal/spaceCreationModal';
import { MantineDropdown } from '@/components/models/ModelDropdown2/mantineDropdown';

import classes from './homeSidebar.module.css';
import './homeSidebar.css';

const HomeSidebar = (props) => {
    const { profileInfo, openSidebarToggle, setOpenSidebarToggle,spaceData,themeColors,colorScheme } = props;

    const links = [
        { icon: 'IconHome', label: 'Home' },
        { icon: 'IconInbox', label: 'Inbox' },
        { icon: 'IconFolder', label: 'Projects' },
        { icon: 'IconFile', label: 'Docs' },
        { icon: 'IconCalendar', label: 'Calendar' },
        { icon: 'IconDotsCircleHorizontal', label: 'More' },
    ];

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

    const mainLinks = links.map((link, index) => (
        <React.Fragment key={link.label}>
            {openSidebarToggle ? 
                <UnstyledButton key={link.label} className={`${classes.mainLink} ${classes.active}`} data-theme={colorScheme}>
                    <Box className={classes.mainLinkInner} >
                        <div className={`${classes.mainLinkIcon} ${classes.active}`}>
                            {Icons(link.icon, 20, 20, themeColors.text[10])}
                        </div>
                        <Text ff='Lato' fz={15} c={themeColors.text[5]} >
                            {link.label}
                        </Text>
                    </Box>
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
                <UnstyledButton key={link.label} className={classes.mainLink} data-theme={colorScheme}>
                    <div className={`${classes.mainLinkInner} flex justify-center`}>
                        <Box className={classes.iconWrapper} mb={2}>
                            {Icons(link.icon, 20, 20, themeColors.text[10],1.7)}
                            {link.notifications && (
                                <Badge circle size="xs" color="blue" className={classes.badge}>
                                    {link.notifications}
                                </Badge>
                            )}
                        </Box>
                    </div>
                </UnstyledButton>
            </Tooltip>
            }
        </React.Fragment>
    ));
    
    const [sidebarColor, setSidebarColor] = useState(themeColors.bg[4]);
    const isResizing = useRef(false);


    useEffect(() => {
        setTimeout(() => {
            setSidebarColor(themeColors.bg[4]);
        },0)
    }, [colorScheme, themeColors]);

    const handleMouseMove = (e) => {
        if (!isResizing.current) return;

        let newWidth = e.clientX;
        if (newWidth < 200) {
            newWidth = 80;
            setOpenSidebarToggle(false);
        }

        if (newWidth > 150) {
            newWidth = 260;
            setOpenSidebarToggle(true);
        }
    };

    const handleMouseUp = () => {
        setSidebarColor(themeColors.bg[4]);

        isResizing.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        isResizing.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const [openSpaceCreateModal, setOpenSpaceCreateModal] = useState(false);

    return (
        <nav className={`${classes.navbar} ${openSidebarToggle ? 'active' : ''}`} 
            style={{
                width: openSidebarToggle ? rem(255) : rem(57),
                background: themeColors.bg[4],
                borderRight: `1px solid ${colorScheme === 'dark' ? '#323539' : '#b9b9b9'}`
            }}
        >

                <div className={classes.section} data-theme={colorScheme}>
                    <CustomDropdown 
                        trigger={ <div className={classes.profile}>{profileLink}</div> }
                        dropdown={ <HomeSidebarSpaceOptions 
                                spaceName={spaceData.name} 
                                setOpenSpaceCreateModal={setOpenSpaceCreateModal}
                                themeColors={themeColors}
                                colorScheme={colorScheme}
                        /> } side='right' align='start' w={200} 
                    />
                </div>
                <div className={classes.section} data-theme={colorScheme}>
                    <div className={classes.mainLinks}>{mainLinks}</div>
                </div>
                {(themeColors.bg[4] === sidebarColor || isResizing.current) &&
                <div className="resize-handle" onMouseDown={handleMouseDown} style={{background: sidebarColor}}></div>}
        
                <SpaceCreationModal 
                    openSpaceCreateModal={openSpaceCreateModal}
                    setOpenSpaceCreateModal={setOpenSpaceCreateModal}
                    userFullName={profileInfo.fullName}
                    themeColors={themeColors}
                    colorScheme={colorScheme}
                />
        </nav>
    );
};

export default HomeSidebar;
