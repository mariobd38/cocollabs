import React, { useState, useEffect,useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { useMantineTheme,useMantineColorScheme,Box,Flex } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

import HomeHeader from '@/components/Home/HomeHeader/homeHeader';
import HomeNavbar from '@/components/Home/HomeNavbar/homeNavbar';
import TaskCard from '@/components/Home/TaskCard/taskCard';
// import QuickActions from './QuickActions/quickActions';
import HomeSidebar from '@/components/Home/HomeSidebar/homeSidebar';

import { getUserProfileInfo } from '@/api/Users/getUserProfileInfo';
import { getLastActiveSpaceInfo } from '@/api/Spaces/getLastActiveSpace';
// import { getPersonalSpaceInfo } from '@/api/Spaces/getPersonalSpaceInfo';
import { getTaskInfoBySpace } from '@/api/Tasks/getTasksBySpace';
// import { getAllUserSpacesInfo } from '@/api/Spaces/getAllUserSpaces';
// import { getGoogleTaskInfo } from '../../DataManagement/Tasks/getGoogleTasks';

import { getThemeColor } from '@/components/Themes/getThemeColor';
import { getTextColor } from '@/components/Themes/getTextColor';

import './home.css';

const Home = () => {
    const dayjs = require('dayjs');
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

    const processTaskData = useCallback(() => {
        const now = dayjs();
        const overdue = [];
        const completed = [];
        const ongoing = [];

        taskData.forEach((task) => {
            const currentDueDate = task.dueDateTime ? dayjs(task.dueDateTime) : task.dueDate ? dayjs(task.dueDate) : null;
            
            if ((currentDueDate === null || currentDueDate.isAfter(now) || currentDueDate.isSame(now)) && task.status !== 'Completed') {
                ongoing.push(task);
            }
            else if (currentDueDate && currentDueDate.isBefore(now) && task.status !== 'Completed') {
                overdue.push(task);
            } else if (task.status === 'Completed') {
                completed.push(task);
            } 
        });
        setOngoingTasks(ongoing);
        setOverdueTasks(overdue);
        setCompletedTasks(completed);
    },[taskData,dayjs]);

    useEffect(() => {
        async function fetchTaskSpaceData() {
            const data = await getTaskInfoBySpace(spaceData.name);
            // console.log(data);
            setTaskData(data);
            processTaskData();
        }

        fetchTaskSpaceData();
    }, [processTaskData, spaceData]);

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const themeColors = {
        bg: Array.from({ length: 13 }, (_, index) => getThemeColor(colorScheme, theme, index)),
        text: Array.from({ length: 13 }, (_, index) => getTextColor(colorScheme, theme, index))
    };

    // const getGoogleTasks = () => {
    //     getGoogleTaskInfo();
    // }

    return (
        <>
            {userFullName && 
            <HomeNavbar 
                themeColors={themeColors}
                colorScheme={colorScheme}
                setColorScheme={setColorScheme}
                profileInfo={{fullName: userFullName,initials: initials,email: userEmail,picture: userProfilePicture,profileDto: userProfileDto}}
                openSidebarToggle={openSidebarToggle}
                setOpenSidebarToggle={setOpenSidebarToggle}
                storedUserInfo={storedAppInfo}
                setStoredUserInfo={setStoredAppInfo}
            />}
            <div className='container m-0 p-0'>
                {userFullName &&
                <HomeSidebar className='user-home-sidebar'
                    profileInfo={{fullName: userFullName, email: userEmail}}
                    themeColors={themeColors}
                    colorScheme={colorScheme}
                    openSidebarToggle={openSidebarToggle}
                    setOpenSidebarToggle={setOpenSidebarToggle}
                    spaceData={{name: spaceData.name, icon: spaceData.icon}}
                />}
            </div>

            <Flex direction='column' className={` user-home-all-content ${openSidebarToggle && 'open' }`}>
                <HomeHeader 
                    spaceName={spaceData.name}
                    themeColors={themeColors}
                    colorScheme={colorScheme}
                />

                <Box w='100%' >
                    {/* ONLY FOR GOOGLE OAUTH USERS */}
                    {/* {userProfilePicture && <Button onClick={getGoogleTasks}>Access Google tasks</Button>} */}


                    {/* <QuickActions 
                        themeColors={themeColors}
                        colorScheme={colorScheme}
                    /> */}

                    <div className="task-card-parent">
                        
                        <div className='user-home-all-content-left-spacing'>
                            {/* <Button onClick={getSpaceTasks}>get personal tasks</Button> */}
                            {/* <Button onClick={getUserSpace}>get personal tasks</Button> */}
                            <Box>
                                {userFullName &&
                                <TaskCard 
                                    colorScheme={colorScheme}
                                    themeColors={themeColors}
                                    profileInfo={{fullName: userFullName, initials: initials, email: userEmail, picture: userProfilePicture, profileDto: userProfileDto}}
                                    taskData={taskData} 
                                    setTaskData={setTaskData} 
                                    today={today} 
                                    ongoingTasks={ongoingTasks}
                                    overdueTasks={overdueTasks}
                                    completedTasks={completedTasks}
                                    spaceData={{ id: spaceData.id, slug: spaceData.slug }}
                                />}
                                {/* {userFullName &&
                                <TaskCard 
                                    colorScheme={colorScheme}
                                    themeColors={themeColors}
                                    profileInfo={{fullName: userFullName, initials: initials, email: userEmail, picture: userProfilePicture, profileDto: userProfileDto}}
                                    taskData={taskData} 
                                    setTaskData={setTaskData} 
                                    today={today} 
                                    ongoingTasks={ongoingTasks}
                                    overdueTasks={overdueTasks}
                                    completedTasks={completedTasks}
                                    spaceData={{ id: spaceData.id, slug: spaceData.slug }}
                                />} */}
                                
                            </Box>
                        </div>
                    </div>
                </Box>
            </Flex>
        </>
    );
};

export default Home;