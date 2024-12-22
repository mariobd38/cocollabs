import React, { useState, useEffect,useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { useMantineTheme,useMantineColorScheme,Box,Flex } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

import HomeHeader from '@/components/Home/HomeHeader/homeHeader';
// import HomeNavbar from '@/components/Home/HomeNavbar/homeNavbar';
import HomeNavbarv2 from '../../components/Home/v2/HomeNavbar/homeNavbarv2';
import TaskCard from '@/components/Home/TaskCard/taskCard';
import QuickActions from '@/components/Home/QuickActions/quickActions';
import HomeSidebar from '@/components/Home/HomeSidebar/homeSidebar';
import HomeSidebarv2 from '@/components/Home/v2/HomeSidebar/homeSidebarv2';

import { getUserProfileInfo } from '@/api/Users/getUserProfileInfo';
import { getLastActiveSpaceInfo } from '@/api/Spaces/getLastActiveSpace';
// import { getPersonalSpaceInfo } from '@/api/Spaces/getPersonalSpaceInfo';
import { getTaskInfoBySpace } from '@/api/Tasks/getTasksBySpace';
// import { getAllUserSpacesInfo } from '@/api/Spaces/getAllUserSpaces';
// import { getGoogleTaskInfo } from '../../DataManagement/Tasks/getGoogleTasks';

import dayjs from 'dayjs';

import { getThemeColor } from '@/components/Themes/getThemeColor';
import { getTextColor } from '@/components/Themes/getTextColor';

import '@/styles/home/home.css';

const Homev2 = () => {
    // const dayjs = require('dayjs');
    const theme = useMantineTheme();
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    const [taskData, setTaskData] = useState([]);
    const [overdueTasks, setOverdueTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [ongoingTasks, setOngoingTasks] = useState([]);
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
    // const [userSpaces, setUserSpaces] = useState([]);

    useEffect(() => {
        async function fetchSpaceData() {
            const data = await getLastActiveSpaceInfo();
            setSpaceData(data);
        }

        fetchSpaceData();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newDate = dayjs();
            // Check if the new date is different from the current state
            if (!newDate.isSame(today, 'day')) {
                setToday(newDate);
            }
        }, 1000 * 5); // Check every 5 seconds

        return () => clearInterval(intervalId);
    }, [today,dayjs]);


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
            // setUserSpaces(storedAppInfo.userSpace);
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
                    // userSpace: data.userSpaceDto
                }
                setUserFullName(jsonData.user.fullName);
                setInitials((jsonData.user.fullName.split(' ')[0][0] + jsonData.user.fullName.split(' ')[1][0]).toUpperCase());
                setUserEmail(jsonData.user.email);
                setUserProfilePicture(jsonData.user.picture);
                setUserProfileDto(jsonData.profile);
                setColorScheme(jsonData.userPreference.theme);
                // setUserSpaces(jsonData.userSpace);

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

    // const getGoogleTasks = () => {
    //     getGoogleTaskInfo();
    // }

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

            <div className=' m-0 p-0'>
                {/* {userFullName &&
                <HomeSidebar className='user-home-sidebar'
                    profileInfo={{fullName: userFullName, email: userEmail}}
                    themeColors={themeColors}
                    colorScheme={colorScheme}
                    openSidebarToggle={openSidebarToggle}
                    setOpenSidebarToggle={setOpenSidebarToggle}
                    spaceData={{name: spaceData.name, icon: spaceData.icon}}
                />} */}
                <HomeSidebarv2 
                    themeColors={themeColors}
                    colorScheme={colorScheme}
                    openSidebarToggle={openSidebarToggle}
                    setOpenSidebarToggle={setOpenSidebarToggle}
                    spaceData={{name: spaceData.name, icon: spaceData.icon}}
                />
            </div>

            <Flex direction='column' className={`user-home-all-content ${openSidebarToggle && 'open' }`}>
                <HomeHeader 
                    spaceName={spaceData.name}
                    themeColors={themeColors}
                    colorScheme={colorScheme}
                />

                <Box w='100%' >

                    <div className="task-card-parent">
                        
                        <div className='user-home-all-content-left-spacing'>
                            <Box>
                                <QuickActions 
                                    themeColors={themeColors}
                                    colorScheme={colorScheme}
                                /> 
                                
                            </Box>
                        </div>
                    </div>
                </Box>
            </Flex>
            </Flex>
        </>
    );
};

export default Homev2;