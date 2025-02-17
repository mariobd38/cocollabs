import React, { useState, useEffect,useLayoutEffect } from 'react';
import { useLocation, useParams, Outlet } from 'react-router-dom';

import { useMantineTheme,useMantineColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

import HomeNavbarv2 from '@/components/Home/v2/HomeNavbar/homeNavbarv2';
import HomeSidebar from '@/components/Home/v2/HomeSidebar/homeSidebar';

import { getUserProfileInfo } from '@/api/Users/getUserProfileInfo';
import { getLastActiveSpaceInfo } from '@/api/Spaces/getLastActiveSpace';

import { Avatar,AvatarImage,AvatarFallback } from '@/components/ui/avatar';

// import { getPersonalSpaceInfo } from '@/api/Spaces/getPersonalSpaceInfo';
// import { getTaskInfoBySpace } from '@/api/Tasks/getTasksBySpace';
// import { getAllUserSpacesInfo } from '@/api/Spaces/getAllUserSpaces';
// import { getGoogleTaskInfo } from '../../DataManagement/Tasks/getGoogleTasks';

import { getThemeColor } from '@/components/Themes/getThemeColor';
import { getTextColor } from '@/components/Themes/getTextColor';

const AppLayout = ({content}) => {
    // const dayjs = require('dayjs');
    const theme = useMantineTheme();
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const location = useLocation();
    const passedUserInfo = location.state?.userInfo;
    const passedSpaceInfo = location.state?.spaceInfo;
    const [userFullName, setUserFullName] = useState(passedUserInfo?.fullName || '');
    const [userEmail, setUserEmail] = useState(passedUserInfo?.email || '');
    const [userProfilePicture, setUserProfilePicture] = useState('');
    const [userProfileDto, setUserProfileDto] = useState('');
    const [spaceData, setSpaceData] = useState(passedSpaceInfo || []);
    const [userSpaces, setUserSpaces] = useState([]);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const { slug } = useParams();
    const currentSpace = userSpaces.find(item => item.slug === slug);

    const themeColors = {
        bg: Array.from({ length: 13 }, (_, index) => getThemeColor(colorScheme, theme, index)),
        text: Array.from({ length: 13 }, (_, index) => getTextColor(colorScheme, theme, index))
    };
    const [storedAppInfo, setStoredAppInfo] = useLocalStorage({
        key: 'ApplicationStore', // localStorage key
        defaultValue: null, // default value when localStorage is empty
        getInitialValueInEffect: true, // fetch value lazily on first render
    });

    const fullUserData = {
        fullName: userFullName, 
        email: userEmail, 
        picture: userProfilePicture, 
        profileDto: userProfileDto
    };
    
    useEffect(() => {
        async function fetchSpaceData() {
            const data = await getLastActiveSpaceInfo();
            setTimeout(() => {
                setSpaceData(data);
            },250)
        }
        fetchSpaceData();
    }, [slug])

    useEffect(() => {
        const fetchProfileData = async () => {
          if (storedAppInfo) {
            // Use the cached data if available
            setUserFullName(storedAppInfo.user.fullName);
            setUserEmail(storedAppInfo.user.email);
            setUserProfilePicture(storedAppInfo.user.picture);
            setUserProfileDto(storedAppInfo.profile);
            setUserSpaces(storedAppInfo.userSpace);
            setColorScheme(storedAppInfo.userPreference.theme);
            // const jsonData = { user: storedAppInfo };
          } 
          else {
            // Fetch data from API if no data in localStorage
            const data = await getUserProfileInfo(passedUserInfo || null);
            if (data) {
                const jsonData = {
                    user: data.userDto,
                    profile: data.profileDto,
                    userPreference: data.userPreferenceDto,
                    userSpace: data.userSpaceDto
                }
                setUserFullName(jsonData.user.fullName);
                setUserEmail(jsonData.user.email);
                setUserProfilePicture(jsonData.user.picture);
                setUserProfileDto(jsonData.profile);
                setColorScheme(jsonData.userPreference.theme);
                setUserSpaces(jsonData.userSpace);
                setStoredAppInfo(jsonData);
            }
          }
        }
        fetchProfileData();
      }, [passedUserInfo, storedAppInfo, setStoredAppInfo]);

    const [activePage, setActivePage] = useState("Home");

    useEffect(() => {
        const path = location.pathname;
        if (path.includes("explore")) {
            setActivePage("Explore");
        } else {
            setActivePage("Home");
        }
    }, [location.pathname]);
    // console.log(fullUserData.profileDto.preSignedUrl);

    return (
        <>
            <HomeNavbarv2 
                themeColors={themeColors}
                colorScheme={colorScheme}
                setColorScheme={setColorScheme}
                profileInfo={fullUserData}
                openSidebarToggle={openSidebarToggle}
                setOpenSidebarToggle={setOpenSidebarToggle}
                storedUserInfo={storedAppInfo}
                setStoredUserInfo={setStoredAppInfo}
            />
            <div className='flex'>
                <div>
                    <HomeSidebar 
                        themeColors={themeColors}
                        colorScheme={colorScheme}
                        openSidebarToggle={openSidebarToggle}
                        setOpenSidebarToggle={setOpenSidebarToggle}
                        spaceData={{name: currentSpace?.name, icon: currentSpace?.icon,slug: currentSpace?.slug}}
                        userFullName={userFullName}
                        activePage={activePage}
                        userProfileDto={fullUserData.profileDto}
                        userProfilePicture={fullUserData.picture}
                    />
                </div>
                <div className={`bg-background flex flex-col w-full relative px-6 top-10 py-6 overflow-y-scroll max-h-[calc(100dvh_-_2rem)] ${openSidebarToggle && 'open' }`}>
                    <Outlet context={{themeColors,spaceData,currentSpace,colorScheme}}/>
                    
                </div>
            </div>
        </>
    );
};

export default AppLayout;