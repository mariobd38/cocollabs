import React, { useEffect, useState } from 'react';

import { Icons } from '@/components/icons/icons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CustomCommand from '@/components/customCommand';

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

    const [openCommand, setOpenCommand] = useState(false);
    useEffect(() => {
        const down = (e) => {
          if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            setOpenCommand((open) => !open)
          }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
      }, [])

    return (
        <nav className="flex items-center w-full fixed h-16 top-0 z-20 border-b border-zinc-300 dark:border-zinc-700" style={{backgroundColor: themeColors.bg[2]}}>
            <div className='container px-4 w-full max-w-full' >
                <div className='flex justify-between h-full items-center place-items-center'>
                    <div className='flex items-center gap-6'>
                        <div className={`w-fit p-1.5 cursor-pointer rounded home-button ${colorScheme}`} onClick={handleOpenSidebarToggle}>
                            {Icons('IconSquare',22,22,buttonColor)}
                            <div style={{left: `${openSidebarToggle ? 21 : 15.5}px`}} className={`left-[20px] top-[18px] absolute transition-all duration-200 ease-linear`}>
                                {Icons('IconMinusVertical',28,28,buttonColor,1.25)}
                            </div>
                        </div>

                        <div className='items-center hidden sm:flex' >
                            <div className='w-[8.5rem]' >
                                <Logo2 strokeColor={colorScheme === 'dark' ? '#f4fff6' : '#323335'}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className='flex items-center justify-end font-["Inter"]'>
                        <div className='pr-3 md:pr-4'>
                            <Button size='auto' variant='ghost' className={`flex py-1 px-3 rounded gap-32 border-solid border-[${searchBdColor}] navbar-search-button ${colorScheme} hover:all transition-all duration-300 ease-linear`} 
                            style={{border: `1px solid ${searchBdColor}`, backgroundColor: `${searchBgColor}`}} onClick={() => setOpenCommand((open) => !open)}>
                                <div className='flex text-[13px] text-muted-foreground kbd'>Search
                                    <div className='pl-1 hidden md:block'> anything</div>...
                                </div>

                                <div className='flex px-2 bg-gray-100 dark:bg-black gap-1 h-7 items-center rounded-md font-mono border dark:border-black border-gray-300' >
                                    <span className="text-[18px] kbd pt-0.5 text-muted-foreground">⌘</span>
                                    <p className='m-auto pt-[1px] text-muted-foreground kbd text-sm'>K</p>
                                </div>
                            </Button>
                        </div>

                        <Separator orientation='vertical' className='hidden sm:flex h-8 mx-3 bg-zinc-600' />

                        <HomeNavbarUserMenu 
                            userProfileDto={profileInfo.profileDto}
                            userProfilePicture={profileInfo.picture}
                            userFullName={profileInfo.fullName}
                            themeColors={themeColors}
                            storedUserInfo={storedUserInfo}
                            setStoredUserInfo={setStoredUserInfo}
                        />

                        <CustomCommand 
                            open={openCommand}
                            setOpen={setOpenCommand}
                        />

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default HomeNavbarv2;