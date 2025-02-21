import React, { useEffect, useState } from 'react';

import { Icons } from '@/components/icons/icons';

import { Divider,Input,Box,Button,Text,Flex,Container,Grid} from '@mantine/core';
import Logo2 from '@/components/Logo/logo2';

import HomeNavbarUserMenu from '@/components/Home/HomeNavbar/homeNavbarUserMenu';
import SpaceCreationModal from '@/components/Home/SpaceCreationModal/spaceCreationModal';

// import './homeNavbar.css';

const HomeNavbar = (props) => {
    const { themeColors,colorScheme, setColorScheme,profileInfo, setOpenSidebarToggle, openSidebarToggle,storedUserInfo,setStoredUserInfo
     } = props;

    //user button
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [openSpaceCreateModal,setOpenSpaceCreateModal] = useState(false);

    const closeOffcanvasIfLargeScreen = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 840) {
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

    const inputRightSection = colorScheme === 'dark' ? '#202020' : '#e9e9e9'
    const buttonColor = colorScheme === 'dark' ? '#d4d5d6' : '#424345';
    const buttonBdColor = colorScheme === 'dark' ? '#646566' : '#828385';
    const findButtonBdColor = colorScheme === 'dark' ? '#202020' : '#b2b3b5';

    return (
        <nav className="navbar w-100" style={{position: "fixed",top: "0", zIndex: "11", height: "4rem", backgroundColor: themeColors.bg[2],
            borderBottom: `1px solid ${colorScheme==='dark' ? '#292929' : '#d8d8d8'}`
        }}>
            <Container w='100%' fluid >
                <Grid align='center' h='100%' gutter={{ base: 5 }}>
                    <Grid.Col span={2} >
                        <Flex align='center' gap={30}>
                            <div className={`w-fit navbar-menu-sidebar-icon home-button ${colorScheme}`} onClick={handleOpenSidebarToggle}>

                                {Icons('IconMenu2',27,27,buttonColor)}
                            </div>

                            <Flex align='center' pb={0} display={{base: 'none', xs: 'flex'}}>
                                <Box w='9.2rem' >
                                    <Logo2 strokeColor={colorScheme === 'dark' ? '#f4fff6' : '#323335'}/>
                                </Box>
                            </Flex>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={10} >
                        <Flex align='center' justify='end'>
                            <Box pe={{base: 3, xs: 12}}>
                                {isSmallScreen ? 
                                    <div className={`m-auto home-navbar-search-ss ${colorScheme}`}>
                                        {Icons('IconSearch',17.5,17.5,themeColors.text[1])}
                                    </div>
                                : 
                                <form className="home-navbar-search" role="search">
                                    <Input 
                                        me={10}
                                        placeholder="Search"
                                        className={`home-navbar-search-input ${colorScheme}`}
                                        leftSection={Icons('IconSearch',16,16,themeColors.text[1])}
                                        rightSection={<Flex p='2px 9px' me={30} h={28} bg={inputRightSection} style={{borderRadius: "5px"}} bd={`.1px solid ${findButtonBdColor}`} >
                                            <Flex align='center' pb={1} >
                                                {Icons('IconCommand',15,15,themeColors.text[3])}
                                            </Flex>
                                            <Text m='auto' c={themeColors.text[3]} ff='Inter' fw={600} fz={13}>K</Text>
                                        </Flex>}
                                    />
                                </form>}
                            </Box>

                            <Flex display={{base: 'none', xs: 'flex'}}>
                                <Button className={`home-button ${colorScheme}`} me={5} fw={600} radius={6} p='0 11px' bg='transparent' bd={`1px solid ${buttonBdColor}`} ff='Inter' c={buttonColor} >
                                    Explore
                                </Button>
                            </Flex>

                            <Flex className='home-navbar-divider'>
                                <Divider size="xs" orientation="vertical" ms={13} me={10} m='auto' h={28} bd={`.1px solid ${colorScheme==='dark' ? '#676869' : '#878889'}`}/>
                            </Flex>

                            <Flex m='auto 20px auto 0px' gap={6}>
                                <div className={`user-home-navbar-icon-apps home-button ${colorScheme}`}>
                                    {Icons('IconBell',23,23,buttonColor)}
                                </div>

                                <div className={`user-home-navbar-icon-apps home-button ${colorScheme}`}>
                                    {Icons('IconApps',23,23,buttonColor)}
                                </div>
                            </Flex>

                            <HomeNavbarUserMenu 
                                userProfileDto={profileInfo.profileDto}
                                userProfilePicture={profileInfo.picture}
                                userFullName={profileInfo.fullName}
                                initials={profileInfo.initials}
                                colorScheme={colorScheme}
                                themeColors={themeColors}
                                setColorScheme={setColorScheme}
                                storedUserInfo={storedUserInfo}
                                setStoredUserInfo={setStoredUserInfo}
                            />

                            <SpaceCreationModal 
                                openSpaceCreateModal={openSpaceCreateModal}
                                setOpenSpaceCreateModal={setOpenSpaceCreateModal}
                                userFullName={profileInfo.fullName}
                                themeColors={themeColors}
                                colorScheme={colorScheme}
                            />

                        </Flex>
                    </Grid.Col>
                </Grid>
            </Container>
        </nav>
    );
};

export default HomeNavbar;