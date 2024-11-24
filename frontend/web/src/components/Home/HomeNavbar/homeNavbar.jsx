import React, { useEffect, useState } from 'react';

import { Icons } from '@/components/icons/icons';

import { Divider,Input,Box,Button,Text,Flex,Container,Grid} from '@mantine/core';
import Logo2 from '@/components/Logo/logo2';

import HomeNavbarUserMenu from '@/components/Home/HomeNavbar/homeNavbarUserMenu';
import SpaceCreationModal from '@/components/Home/SpaceCreationModal/spaceCreationModal';

import './homeNavbar.css';

const HomeNavbar = (props) => {
    const { themeColors,colorScheme, setColorScheme,userFullName, initials,userEmail,userProfilePicture,userProfileDto
        , setOpenSidebarToggle, openSidebarToggle
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
                            <Box w='fit-content' className={`navbar-menu-sidebar-icon home-button ${colorScheme}`} onClick={handleOpenSidebarToggle}>

                                {Icons('IconMenu2',27,27,buttonColor)}
                            </Box>

                            <Flex align='center' pb={0} display={{base: 'none', xs: 'flex'}}>
                                <div style={{width: "9.2rem"}}>
                                    <Logo2 strokeColor={colorScheme === 'dark' ? '#f4fff6' : '#323335'}/>
                                </div>
                            </Flex>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={10} >
                        <div className='d-flex align-items-center justify-content-end'>
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
                                                rightSection={<Flex className='home-navbar-search-input-right-section' bg={inputRightSection} bd={`.1px solid ${findButtonBdColor}`} >
                                                    <Flex align='center' pb={1} >
                                                        {Icons('IconCommand',15,15,themeColors.text[3])}
                                                    </Flex>
                                                    <Text m='auto' c={themeColors.text[3]} ff='Inter' fw={600} fz={13}>K</Text>
                                                </Flex>}
                                            />
                                        </form>
                                }
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
                    </Grid.Col>
                </Grid>
            </Container>
        </nav>

            
            // <nav className="navbar w-100" style={{position: "fixed",top: "0", zIndex: "11", height: "4.5rem", backgroundColor: themeColors.bg[2] }}>
            //     <div className='container-fluid' >
            //         <div className="row w-100 m-0 mx-2">
            //             <div className='col-1 col-lg-3 d-flex align-items-center p-0 '>
            //                 <div className={`navbar-menu-sidebar-icon home-button ${colorScheme}`} onClick={handleOpenSidebarToggle}>
            //                     {Icons('IconMenu2',27,27,buttonColor)}
            //                 </div>

            //             </div>

            //             <div className='col-1 col-sm-5 col-md-7 col-lg-5 d-flex justify-content-start align-items-center'>
            //                     <div className='pe-5 pe-lg-3'>
            //                         {isSmallScreen ? 
            //                                 <div className={`me-2 m-auto home-navbar-search-ss ${colorScheme}`}>
            //                                     {Icons('IconSearch',17.1,17.1,themeColors.text[1])}
            //                                 </div>
            //                                 : 
            //                                 <form className="home-navbar-search" role="search">
            //                                     <Input 
            //                                         placeholder="Search" 
            //                                         className={`home-navbar-search-input me-2 home-search ${colorScheme}`}
            //                                         leftSection={Icons('IconSearch',16,16,themeColors.text[1])}
                                                    
            //                                         rightSection={<div className='d-flex me-4' style={{background: inputRightSection, borderRadius: "5px", padding: "2px 9px"}}>
            //                                                 <div className='d-flex align-items-center' style={{paddingBottom: "1px"}}>
            //                                                     {Icons('IconCommand',17.1,17.1,themeColors.text[2])}
            //                                                 </div>
            //                                             <div className='m-auto' style={{color:themeColors.text[2], fontFamily:"Nunito Sans", fontWeight: "600", fontSize: "1rem"}}>K</div>
            //                                         </div>}
            //                                     />
            //                                 </form>
            //                         }
            //                     </div>
            //             </div>

            //             <div className='text-white col-10 col-sm-6 col-md-4 col-lg-4 d-flex align-items-center justify-content-end px-0'>
            //                 <div className='d-flex align-items-center'>

            //                     <div className='d-flex gap-3'>
            //                         <Button className={`home-button ${colorScheme}`}  fw='600' radius='8' p='0 11px' bg='transparent' bd={`1px solid ${buttonColor}`} ff='Inter' c={buttonColor} >
            //                             Explore
            //                         </Button>
                                    
            //                         <Popover width={280} position="bottom-end" shadow="md" opened={spacePopover} onChange={setSpacePopover}>
            //                             <Popover.Target>
            //                                 <div className={`user-home-navbar-icon-apps home-button ${colorScheme}`} onClick={() => setSpacePopover((o) => !o)}>
            //                                         {Icons('IconPlanet',23,23,buttonColor)}
            //                                 </div>
            //                             </Popover.Target>

            //                             <Popover.Dropdown bg={themeColors.bg[2]} bd='.1px solid #57585a'>

            //                                 <Flex justify='center' align='center' direction='column' gap={20} >
            //                                     <Text fz='14.7' fw={450} c={themeColors.text[4]}>No active spaces..</Text>
            //                                     <Button className={`home-button ${colorScheme}`} c={themeColors.text[2]} bd='1px solid #6e6f71' bg='transparent' fullWidth px={0} onClick={() => {setSpacePopover(false); 
            //                                         setTimeout(() => {
            //                                             setOpenSpaceCreateModal(true);
            //                                         },250)
            //                                     }}>New Space</Button>
            //                                 </Flex>
            //                             </Popover.Dropdown>
            //                         </Popover>
            //                     </div>


            //                     <Divider size="xs" orientation="vertical" ms={13} me={10} m='auto' h={28} bd={`.1px solid ${colorScheme==='dark' ? '#676869' : '#878889'}`}/>
            //                     <div className='m-auto me-4 d-flex gap-2'>
            //                         <div className={`user-home-navbar-icon-apps home-button ${colorScheme}`}>
            //                             {Icons('IconBell',23,23,buttonColor)}
            //                         </div>

            //                         <div className={`user-home-navbar-icon-apps home-button ${colorScheme}`}>
            //                             {Icons('IconApps',23,23,buttonColor)}
            //                         </div>
            //                     </div>

            //                     <HomeNavbarUserMenu 
            //                         userProfileDto={userProfileDto}
            //                         userProfilePicture={userProfilePicture}
            //                         userFullName={userFullName}
            //                         initials={initials}
            //                         colorScheme={colorScheme}
            //                         themeColors={themeColors}
            //                         setColorScheme={setColorScheme}
            //                     />
                                
            //                     <SpaceCreationModal 
            //                         openSpaceCreateModal={openSpaceCreateModal}
            //                         setOpenSpaceCreateModal={setOpenSpaceCreateModal}
            //                         userFullName={userFullName}
            //                         themeColors={themeColors}
            //                         colorScheme={colorScheme}
            //                     />

            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </nav> 
    );
};

export default HomeNavbar;