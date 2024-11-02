import React, { useEffect, useState } from 'react';

import {Icons} from '../../icons/icons';

import { Divider,Input, Button, Popover,Text,Flex} from '@mantine/core';
import Logo2 from '../../Logo/logo2';

import HomeNavbarUserMenu from './homeNavbarUserMenu';
import SpaceCreationModal from '../SpaceCreationModal/spaceCreationModal';

import './homeNavbar.css';

const HomeNavbar = (props) => {
    const { themeColors,colorScheme, setColorScheme,userFullName, initials,userEmail,userProfilePicture,userProfileDto
        , setOpenSidebarToggle, openSidebarToggle
     } = props;

    //user button
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [openSpaceCreateModal,setOpenSpaceCreateModal] = useState(false);
    const [spacePopover, setSpacePopover] = useState(false);

    const closeOffcanvasIfLargeScreen = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 700) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };

    const handleOpenSidebarToggle = () => {
        setOpenSidebarToggle(!openSidebarToggle);
        if (openSidebarToggle) {
            document.body.classList.remove('active');
        } else {
            document.body.classList.add('active');
        }
    }
    
    useEffect(() => {
        closeOffcanvasIfLargeScreen();
        window.addEventListener('resize', closeOffcanvasIfLargeScreen);
    
        return () => {
            window.removeEventListener('resize', closeOffcanvasIfLargeScreen);
        };
    }, [setIsSmallScreen]);

    const inputRightSection = colorScheme === 'dark' ? '#222222' : '#b5b5b5'
    const buttonColor = colorScheme === 'dark' ? '#d4d5d6' : '#424345';

    return (
        <div>
            <nav className="navbar w-100" style={{position: "fixed",top: "0", zIndex: "11", height: "4.5rem", backgroundColor: themeColors.bg[2] }}>
                <div className='container-fluid' >
                    <div className="row w-100 m-0 mx-2">
                        <div className='col-1 col-lg-3 d-flex align-items-center p-0 '>
                            <div className={`navbar-menu-sidebar-icon home-button ${colorScheme}`} onClick={handleOpenSidebarToggle}>
                                {Icons('IconMenu2',27,27,buttonColor)}
                            </div>

                            <div className='d-none d-lg-inline' style={{marginLeft: "20px"}}>
                                <div style={{width: "11rem"}}>
                                    <Logo2 strokeColor={colorScheme === 'dark' ? '#f4fff6' : '#323335'}/>
                                </div>
                            </div>
                        </div>

                        <div className='col-1 col-sm-5 col-md-7 col-lg-5 d-flex justify-content-start align-items-center'>
                                <div className='pe-5 pe-lg-3'>
                                    {isSmallScreen ? 
                                            <div className={`me-2 m-auto home-navbar-search-ss ${colorScheme}`}>
                                                {Icons('IconSearch',17.1,17.1,themeColors.text[1])}
                                            </div>
                                            : 
                                            <form className="home-navbar-search" role="search">
                                                <Input 
                                                    placeholder="Search" 
                                                    className={`home-navbar-search-input me-2 home-search ${colorScheme}`}
                                                    leftSection={Icons('IconSearch',16,16,themeColors.text[1])}
                                                    
                                                    rightSection={<div className='d-flex me-4' style={{background: inputRightSection, borderRadius: "5px", padding: "2px 9px"}}>
                                                            <div className='d-flex align-items-center' style={{paddingBottom: "1px"}}>
                                                                {Icons('IconCommand',17.1,17.1,themeColors.text[2])}
                                                            </div>
                                                        <div className='m-auto' style={{color:themeColors.text[2], fontFamily:"Nunito Sans", fontWeight: "600", fontSize: "1rem"}}>K</div>
                                                    </div>}
                                                />
                                            </form>
                                    }
                                </div>
                        </div>

                        <div className='text-white col-10 col-sm-6 col-md-4 col-lg-4 d-flex align-items-center justify-content-end px-0'>
                            <div className='d-flex align-items-center'>

                                <div className='d-flex gap-3'>
                                    <Button className={`home-button ${colorScheme}`}  fw='600' radius='8' p='0 11px' bg='transparent' bd={`1px solid ${buttonColor}`} ff='Inter' c={buttonColor} >
                                        Explore
                                    </Button>
                                    
                                    <Popover width={280} position="bottom-end" shadow="md" opened={spacePopover} onChange={setSpacePopover}>
                                        <Popover.Target>
                                            <div className={`user-home-navbar-icon-apps home-button ${colorScheme}`} onClick={() => setSpacePopover((o) => !o)}>
                                                    {Icons('IconPlanet',23,23,buttonColor)}
                                            </div>
                                        </Popover.Target>

                                        <Popover.Dropdown bg={themeColors.bg[2]} bd='.1px solid #57585a'>

                                            <Flex justify='center' align='center' direction='column' gap={20} >
                                                <Text fz='14.7' fw={450} c={themeColors.text[4]}>No active spaces..</Text>
                                                <Button className={`home-button ${colorScheme}`} c={themeColors.text[2]} bd='1px solid #6e6f71' bg='transparent' fullWidth px={0} onClick={() => {setSpacePopover(false); 
                                                    setTimeout(() => {
                                                        setOpenSpaceCreateModal(true);
                                                    },250)
                                                }}>New Space</Button>
                                            </Flex>
                                        </Popover.Dropdown>
                                    </Popover>
                                </div>


                                <Divider size="xs" orientation="vertical" ms={13} me={10} m='auto' h={28} bd={`.1px solid ${colorScheme==='dark' ? '#676869' : '#878889'}`}/>
                                <div className='m-auto me-4 d-flex gap-2'>
                                    <div className={`user-home-navbar-icon-apps home-button ${colorScheme}`}>
                                        {Icons('IconBell',23,23,buttonColor)}
                                    </div>

                                    <div className={`user-home-navbar-icon-apps home-button ${colorScheme}`}>
                                        {Icons('IconApps',23,23,buttonColor)}
                                    </div>
                                </div>

                                <HomeNavbarUserMenu 
                                    userProfileDto={userProfileDto}
                                    userProfilePicture={userProfilePicture}
                                    userFullName={userFullName}
                                    initials={initials}
                                    colorScheme={colorScheme}
                                    themeColors={themeColors}
                                    setColorScheme={setColorScheme}
                                />
                                
                                <SpaceCreationModal 
                                    openSpaceCreateModal={openSpaceCreateModal}
                                    setOpenSpaceCreateModal={setOpenSpaceCreateModal}
                                    userFullName={userFullName}
                                    themeColors={themeColors}
                                    colorScheme={colorScheme}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default HomeNavbar;