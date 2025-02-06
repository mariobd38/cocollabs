import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Outlet } from 'react-router-dom';

import { useMantineTheme,useMantineColorScheme,Box,Flex } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

import HomeNavbarv2 from '@/components/Home/v2/HomeNavbar/homeNavbarv2';
import HomeSidebarv2 from '@/components/Home/v2/HomeSidebar/homeSidebarv2';

import { getUserProfileInfo } from '@/api/Users/getUserProfileInfo';
import { getLastActiveSpaceInfo } from '@/api/Spaces/getLastActiveSpace';
// import { getPersonalSpaceInfo } from '@/api/Spaces/getPersonalSpaceInfo';
// import { getTaskInfoBySpace } from '@/api/Tasks/getTasksBySpace';
// import { getAllUserSpacesInfo } from '@/api/Spaces/getAllUserSpaces';
// import { getGoogleTaskInfo } from '../../DataManagement/Tasks/getGoogleTasks';

import { getThemeColor } from '@/components/Themes/getThemeColor';
import { getTextColor } from '@/components/Themes/getTextColor';

// import '@/styles/home/home.css';

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
    const [initials, setInitials] = useState(passedUserInfo?.fullName || '');
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
        initials: initials, 
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
            setInitials((storedAppInfo.user.fullName.split(' ')[0][0] + storedAppInfo.user.fullName.split(' ')[1][0]).toUpperCase());
            setUserEmail(storedAppInfo.user.email);
            setUserProfilePicture(storedAppInfo.user.picture);
            setUserProfileDto(storedAppInfo.profile);
            setUserSpaces(storedAppInfo.userSpace);
            setColorScheme(storedAppInfo.userPreference.theme);
            // const jsonData = { user: storedAppInfo };
          } else {
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
                setInitials((jsonData.user.fullName.split(' ')[0][0] + jsonData.user.fullName.split(' ')[1][0]).toUpperCase());
                setUserEmail(jsonData.user.email);
                setUserProfilePicture(jsonData.user.picture);
                setUserProfileDto(jsonData.profile);
                setColorScheme(jsonData.userPreference.theme);
                setUserSpaces(jsonData.userSpace);

                setStoredAppInfo(jsonData);
            }
          }
        };
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


    return (
        <>
            {userFullName && 
            <HomeNavbarv2 
                themeColors={themeColors}
                colorScheme={colorScheme}
                setColorScheme={setColorScheme}
                profileInfo={fullUserData}
                openSidebarToggle={openSidebarToggle}
                setOpenSidebarToggle={setOpenSidebarToggle}
                storedUserInfo={storedAppInfo}
                setStoredUserInfo={setStoredAppInfo}
            />}
            <div className='flex'>
                <div>
                    <HomeSidebarv2 
                        themeColors={themeColors}
                        colorScheme={colorScheme}
                        openSidebarToggle={openSidebarToggle}
                        setOpenSidebarToggle={setOpenSidebarToggle}
                        spaceData={{name: currentSpace?.name, icon: currentSpace?.icon,slug: currentSpace?.slug}}
                        userFullName={userFullName}
                        activePage={activePage}
                    />
                </div>
                <Flex direction='column' className={`user-home-all-content ${openSidebarToggle && 'open' }`}>
                    <Outlet context={{themeColors,spaceData,colorScheme,currentSpace}}/>
                </Flex>
            </div>
        </>
    );
};

export default AppLayout;