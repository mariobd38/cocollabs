import React, { useState, useRef,useEffect } from 'react';
import {Avatar,UnstyledButton,Badge,Tooltip,rem,Flex} from '@mantine/core';

import {Icons} from '../../icons/icons';

import classes from './navbarSearch.module.css';

import HomeSidebarSpaceOptions from './HomeSideBarSpaceOptions/homeSideBarSpaceOptions';
import SpaceCreationModal from '../SpaceCreationModal/spaceCreationModal';
import { MantineDropdown } from '../../models/ModelDropdown2/mantineDropdown';
import './homeSidebar.css';

const HomeSidebar = (props) => {
    const { userEmail, userFullName, openSidebarToggle, setOpenSidebarToggle,spaceName,spaceIcon,themeColors,colorScheme } = props;

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
            <UnstyledButton className={`d-flex justify-content-start w-100 ${!openSidebarToggle ?  classes.mainLink : 'px-3'} ${classes.profile} mb-0`} style={{padding:"7px"}}>
                <Flex gap={openSidebarToggle && 10} align='center'>

                    <div>
                        <Avatar className='profile-avatar' color={spaceIcon && spaceIcon.color} radius={spaceIcon && spaceIcon.radius}>
                            {spaceIcon && spaceIcon.children}
                        </Avatar>
                    </div>
                    <div 
                    style={{
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis',
                            maxWidth: '165px',
                            // color: "#f1f1f1",
                            paddingLeft: "3px",
                            color: themeColors.text[3],
                            fontWeight: "550",
                            fontFamily: 'Lato'
                        }}
                    >
                        {openSidebarToggle && spaceName}
                    </div>
                </Flex>
                
            </UnstyledButton>
        </div>
    );

  const mainLinks = links.map((link,index) => (
        <>
            {openSidebarToggle ? 
                <UnstyledButton key={index} className={`${classes.mainLink} ${classes.active}`} data-theme={colorScheme}>
                    <div className={classes.mainLinkInner}>
                        <div className={`${classes.mainLinkIcon} ${classes.active}`}>
                            {Icons(link.icon, 25, 25, themeColors.text[10])}
                            {/* <link.icon color='#868e96' size={25}  stroke={2} /> */}
                        </div>
                        <span style={{fontFamily: 'Lato', fontWeight: "500", fontSize: "15px", color: themeColors.text[5]}}>{link.label}</span>
                    </div>
                    {link.notifications && (
                        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
                            {link.notifications}
                        </Badge>
                    )}
                </UnstyledButton>
            
            : 
            <Tooltip label={link.label} position="right" withArrow arrowOffset={10} arrowSize={4} bg={`${colorScheme==='dark' ? '#121212' : '#272727'}`} c='#f0f0f0' openDelay={500} offset={{ mainAxis: 10 }}>
                <UnstyledButton key={link.label} className={classes.mainLink} data-theme={colorScheme}>
                    <div className={`${classes.mainLinkInner} d-flex justify-content-center`}>
                        <div className={classes.iconWrapper}>
                            {Icons(link.icon, 25, 25, themeColors.text[10])}
                            {link.notifications &&
                            <Badge circle size="xs" color="blue" className={classes.badge}>
                                {link.notifications}
                            </Badge>
                            }
                        </div>
                    </div>
                </UnstyledButton>
            </Tooltip>
            }
        
        </>
        
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
                width: openSidebarToggle ? rem(260) : rem(80),
                background: themeColors.bg[4],
                borderRight: `1px solid ${colorScheme === 'dark' ? '#323539' : '#b9b9b9'}`
            }}
            >

                <div className={classes.section} data-theme={colorScheme}>
                    <MantineDropdown 
                        target={<div className={classes.profile}>{profileLink}</div>}
                        width={240}
                        dropdown={
                            <HomeSidebarSpaceOptions 
                                spaceName={spaceName} 
                                setOpenSpaceCreateModal={setOpenSpaceCreateModal}
                                themeColors={themeColors}
                                colorScheme={colorScheme}
                            />
                        }
                        background={themeColors.bg[2]} position='right-start' dmt={6}
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
                    userFullName={userFullName}
                    themeColors={themeColors}
                    colorScheme={colorScheme}
                />
        </nav>
    );
};

export default HomeSidebar;
