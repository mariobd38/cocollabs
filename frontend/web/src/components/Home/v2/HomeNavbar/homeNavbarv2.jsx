import React, { useEffect, useState } from 'react';

import { Icons } from '@/components/icons/icons';

import { Divider,Box,Text,Flex,Container,Grid,Image } from '@mantine/core';
import { Button } from '@/components/ui/button';
import CustomCommand from '@/components/customCommand';

import Coconut from '@/components/Logo/coconut';
import Logo2 from '@/components/Logo/logo2';

import HomeNavbarUserMenu from '@/components/Home/HomeNavbar/homeNavbarUserMenu';
// import SpaceCreationModal from '@/components/Home/SpaceCreationModal/spaceCreationModal';

import '@/styles/home/homeNavbar.css';

const HomeNavbarv2 = ({ themeColors,colorScheme,setColorScheme,profileInfo,setOpenSidebarToggle,openSidebarToggle,storedUserInfo,setStoredUserInfo } ) => {
    const handleOpenSidebarToggle = () => {
        setOpenSidebarToggle(!openSidebarToggle);
        if (openSidebarToggle) {
            document.body.classList.remove('active');
        } else {
            document.body.classList.add('active');
        }
    }
    
    // useEffect(() => {
    //     // closeOffcanvasIfLargeScreen();
    //     window.addEventListener('resize', closeOffcanvasIfLargeScreen);
    
    //     return () => {
    //         window.removeEventListener('resize', closeOffcanvasIfLargeScreen);
    //     };
    // }, [setIsSmallScreen]);

    // const inputRightSection = colorScheme === 'dark' ? '#202020' : '#e9e9e9'
    const buttonColor = colorScheme === 'dark' ? '#d4d5d6' : '#424345';
    const searchBgColor = colorScheme === 'dark' ? '#262729' : '#f6f7f9';
    const searchBdColor = colorScheme === 'dark' ? '#323335' : '#dee2e6';
    const kdbBdColor = colorScheme === 'dark' ? '#1a1b1d' : '#fafbfd';

    const [openCommand, setOpenCommand] = useState(false);
    useEffect(() => {
        const down = (e) => {
          if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            console.log("skdjs");
            setOpenCommand((open) => !open)
          }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
      }, [])

    return (
        <nav className="navbar w-full fixed h-16 top-0" style={{zIndex: "11", backgroundColor: themeColors.bg[2],
            borderBottom: `1px solid ${colorScheme==='dark' ? '#292929' : '#d8d8d8'}`
        }}>
            <Container w='100%' fluid >
                <Grid align='center' h='100%' gutter={5}>
                    <Grid.Col span={2} >
                        <Flex align='center' gap={25}>
                            <Box w='fit-content' className={`navbar-menu-sidebar-icon home-button ${colorScheme}`} onClick={handleOpenSidebarToggle}>
                                {/* {Icons('IconMenu2',27,27,buttonColor)} */}
                                {Icons('IconSquare',22,22,buttonColor)}
                                <Box left={openSidebarToggle ? 21 : 15.5} top={18.5} className='absolute transition-all duration-200 ease-linear'>
                                    {Icons('IconMinusVertical',28,28,buttonColor,1.25)}
                                </Box>
                            </Box>

                            <Flex align='center' pb={0} display={{base: 'none', sm: 'flex'}}>
                                <Box w='8.5rem' >
                                    <Logo2 strokeColor={colorScheme === 'dark' ? '#f4fff6' : '#323335'}/>
                                    {/* <Coconut strokeColor={colorScheme === 'dark' ? '#fafafa' : '#323335'}/> */}
                                </Box>
                            </Flex>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={10} >
                        <Flex align='center' justify='end'>
                            <Box pe={{base: 3, xs: 12}}>
                                {/* {isSmallScreen ? 
                                            <div className={`m-auto home-navbar-search-ss ${colorScheme}`}>
                                                {Icons('IconSearch',17.5,17.5,themeColors.text[1])}
                                            </div>
                                        : 
                                        <form className="home-navbar-search" role="search">
                                            <Input 
                                                // me={10}
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
                                        </form>
                                } */}
                                <Button size='auto' variant='ghost' className={`flex py-1 ps-3 pe-2.5 rounded gap-32 border-solid border-[${searchBdColor}] navbar-search-button ${colorScheme} hover:all transition-all duration-300 ease-linear`} 
                                style={{border: `1px solid ${searchBdColor}`, backgroundColor: `${searchBgColor}`}} onClick={() => setOpenCommand((open) => !open)}>
                                    <Flex ff='Inter' fz={13.5} align='center' className='text-muted-foreground kbd'>Search
                                        <Box ps={4} className='hidden md:block'> anything</Box>...
                                    </Flex>

                                    <Flex ms={10} p='2px 9px' gap={3} align='center' h={28} bg={kdbBdColor} className='rounded-md font-mono' bd={`1px solid ${searchBdColor}`} >
                                        <span className="text-[18px] kbd pt-0.5 text-muted-foreground">⌘</span>
                                        <Text m='auto' className='text-muted-foreground kbd'  fw={400} fz={13}>K</Text>
                                    </Flex>
                                </Button>
                            </Box>

                            {/* <Flex display={{base: 'none', xs: 'flex'}}>
                                <Button className={`home-button ${colorScheme}`} me={5} fw={600} radius={6} p='0 11px' bg='transparent' bd={`1px solid ${buttonBdColor}`} ff='Inter' c={buttonColor} >
                                    Explore
                                </Button>
                            </Flex> */}

                            <Flex className='home-navbar-divider'>
                                <Divider size="xs" orientation="vertical" ms={8} me={10} m='auto' h={28} bd={`.1px solid ${colorScheme==='dark' ? '#676869' : '#878889'}`}/>
                            </Flex>

                            <Flex m='auto 20px auto 0' gap={6}>
                                <div className={`user-home-navbar-icon-apps home-button ${colorScheme}`}>
                                    {Icons('IconBell',22,22,buttonColor)}
                                </div>

                                <div className={`user-home-navbar-icon-apps home-button ${colorScheme}`}>
                                    {Icons('IconApps',22,22,buttonColor)}
                                </div>
                            </Flex>
                            
                            {/* outside components */}
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

                            <CustomCommand 
                                open={openCommand}
                                setOpen={setOpenCommand}
                            />

                        </Flex>
                    </Grid.Col>
                </Grid>
            </Container>
        </nav>
    );
};

export default HomeNavbarv2;