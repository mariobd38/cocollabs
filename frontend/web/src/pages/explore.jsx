import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useMantineTheme,useMantineColorScheme,Box,Flex } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

import HomeNavbarv2 from '@/components/Home/v2/HomeNavbar/homeNavbarv2';
import HomeSidebarv2 from '@/components/Home/v2/HomeSidebar/homeSidebarv2';

import { getUserProfileInfo } from '@/api/Users/getUserProfileInfo';
import { getLastActiveSpaceInfo } from '@/api/Spaces/getLastActiveSpace';

import dayjs from 'dayjs';

import { getThemeColor } from '@/components/Themes/getThemeColor';
import { getTextColor } from '@/components/Themes/getTextColor';

import '@/styles/home/home.css';

const Explore = () => {
    // const dayjs = require('dayjs');
    const theme = useMantineTheme();
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    const [today, setToday] = useState(dayjs());

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
    const [spaceSwitch, setSpaceSwitch] = useState(0);

    useEffect(() => {
        async function fetchSpaceData() {
            const data = await getLastActiveSpaceInfo();
            setSpaceData(data);
        }

        fetchSpaceData();
    }, [spaceSwitch]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newDate = dayjs();
            // Check if the new date is different from the current state
            if (!newDate.isSame(today, 'day')) {
                setToday(newDate);
            }
        }, 1000 * 5); // Check every 5 seconds

        return () => clearInterval(intervalId);
    }, [today]);


    const [storedAppInfo, setStoredAppInfo] = useLocalStorage({
        key: 'ApplicationStore', // localStorage key
        defaultValue: null, // default value when localStorage is empty
        getInitialValueInEffect: true, // fetch value lazily on first render
    });

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


    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const themeColors = {
        bg: Array.from({ length: 13 }, (_, index) => getThemeColor(colorScheme, theme, index)),
        text: Array.from({ length: 13 }, (_, index) => getTextColor(colorScheme, theme, index))
    };

    const fullUserData = {
        fullName: userFullName, 
        initials: initials, 
        email: userEmail, 
        picture: userProfilePicture, 
        profileDto: userProfileDto
    };

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
            <Flex>

                <Box m={0} p={0}>
                    <HomeSidebarv2 
                        themeColors={themeColors}
                        colorScheme={colorScheme}
                        openSidebarToggle={openSidebarToggle}
                        setOpenSidebarToggle={setOpenSidebarToggle}
                        spaceData={{name: spaceData.name, icon: spaceData.icon}}
                        userFullName={userFullName}
                        setSpaceSwitch={setSpaceSwitch}
                    />
                </Box>

                {/* <Flex direction='column' className={`user-home-all-content ${openSidebarToggle && 'open' }`}>
                    <HomeHeader 
                        spaceName={spaceData.name}
                        themeColors={themeColors}
                        colorScheme={colorScheme}
                    />
                    
                </Flex> */}
            </Flex>
        </>
    );
};

export default Explore;