import React, { useState, useEffect,useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { useMantineTheme,useMantineColorScheme} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

import HomeHeader from '@/components/Home/HomeHeader/homeHeader';
import HomeNavbar from '@/components/Home/HomeNavbar/homeNavbar';
import TaskCard from '@/components/Home/TaskCard/taskCard';
// import QuickActions from './QuickActions/quickActions';
import HomeSidebar from '@/components/Home/HomeSidebar/homeSidebar';

import { getUserInfo } from '@/api/Users/getUserInfo';
// import { getTaskInfo } from './../../DataManagement/Tasks/getTasks';
import { getPersonalSpaceInfo } from '@/api/Spaces/getPersonalSpaceInfo';
import { getTaskInfoBySpace } from '@/api/Tasks/getTasksBySpace';
// import { getGoogleTaskInfo } from '../../DataManagement/Tasks/getGoogleTasks';

import { getThemeColor } from '@/components/Themes/getThemeColor';
import { getTextColor } from '@/components/Themes/getTextColor';

import './newHome.css';

const NewHome = () => {
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

    useEffect(() => {
        async function fetchSpaceData() {
            const data = await getPersonalSpaceInfo();
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

    // useEffect(() => {
    //     const fetchData = async () => {
    //             const data = await getUserInfo(passedUserInfo || null);
    //             if (data) {
    //                 setUserFullName(data.fullName);
    //                 setInitials((data.fullName.split(' ')[0][0] + data.fullName.split(' ')[1][0]).toUpperCase());
    //                 setUserEmail(data.email);
    //                 setUserProfilePicture(data.picture);
    //                 setUserProfileDto(data.profileDto);
    //             }
    //     };
    //     fetchData();
    // }, [userProfileDto, passedUserInfo]);

    const [storedUserInfo, setStoredUserInfo] = useLocalStorage({
        key: 'clientInfo', // localStorage key
        defaultValue: null, // default value when localStorage is empty
        getInitialValueInEffect: true, // fetch value lazily on first render
      });

    useEffect(() => {
        const fetchData = async () => {
          if (storedUserInfo) {
            // Use the cached data if available
            setUserFullName(storedUserInfo.fullName);
            setInitials((storedUserInfo.fullName.split(' ')[0][0] + storedUserInfo.fullName.split(' ')[1][0]).toUpperCase());
            setUserEmail(storedUserInfo.email);
            setUserProfilePicture(storedUserInfo.picture);
            setUserProfileDto(storedUserInfo.profileDto);
            setColorScheme(storedUserInfo.userPreferenceDto.theme);

          } else {
            // Fetch data from API if no data in localStorage
            const data = await getUserInfo(passedUserInfo || null);
            if (data) {
                setUserFullName(data.fullName);
                setInitials((data.fullName.split(' ')[0][0] + data.fullName.split(' ')[1][0]).toUpperCase());
                setUserEmail(data.email);
                setUserProfilePicture(data.picture);
                setUserProfileDto(data.profileDto);
                setColorScheme(data.userPreferenceDto.theme);
    
              // Store the user info in localStorage
              setStoredUserInfo(data);
            }
          }
        };
        fetchData();
      }, [passedUserInfo, storedUserInfo, setStoredUserInfo, setColorScheme]);

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
    },[dayjs,taskData]);

    useEffect(() => {
        if (spaceData && spaceData.name) {
            getTaskInfoBySpace(setTaskData, spaceData.name);
            processTaskData();
        }
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
                userFullName={userFullName}
                initials={initials}
                userEmail={userEmail}
                userProfilePicture={userProfilePicture}
                userProfileDto={userProfileDto}
                openSidebarToggle={openSidebarToggle}
                setOpenSidebarToggle={setOpenSidebarToggle}
                storedUserInfo={storedUserInfo}
                setStoredUserInfo={setStoredUserInfo}
            />}
            <div className='container m-0 p-0'>
                {userFullName &&
                <HomeSidebar className='user-home-sidebar p-0'
                    userFullName={userFullName}
                    themeColors={themeColors}
                    colorScheme={colorScheme}
                    userEmail={userEmail}
                    openSidebarToggle={openSidebarToggle}
                    setOpenSidebarToggle={setOpenSidebarToggle}
                    spaceName={spaceData.name}
                    spaceIcon={spaceData.icon}
                />}
            </div>

            <div className={` parent-container`}>
            <div className={`row user-home-all-content ${openSidebarToggle && 'open' }`}>
                <HomeHeader 
                    spaceName={spaceData.name}
                    themeColors={themeColors}
                    colorScheme={colorScheme}
                />

                <div style={{width: "100%"}}>
                    {/* ONLY FOR GOOGLE OAUTH USERS */}
                    {/* {userProfilePicture && <Button onClick={getGoogleTasks}>Access Google tasks</Button>} */}

                    <div className='row mb-5'>
                        {/* <QuickActions 
                            themeColors={themeColors}
                            colorScheme={colorScheme}
                        /> */}

                        <div className="task-card-parent">
                            
                            <div className='user-home-all-content-left-spacing'>
                                {/* <Button onClick={getSpaceTasks}>get personal tasks</Button> */}
                                {/* <Button onClick={getUserSpace}>get personal tasks</Button> */}
                                <div>
                                    {userFullName &&
                                    <TaskCard 
                                        colorScheme={colorScheme}
                                        themeColors={themeColors}
                                        userFullName={userFullName}
                                        initials={initials}
                                        userEmail={userEmail}
                                        taskData={taskData} 
                                        setTaskData={setTaskData} 
                                        today={today} 
                                        ongoingTasks={ongoingTasks}
                                        overdueTasks={overdueTasks}
                                        completedTasks={completedTasks}
                                        userProfileDto={userProfileDto}
                                        userProfilePicture={userProfilePicture}
                                        spaceId={spaceData.id}
                                    />}
                                    {/* {userFullName &&
                                    <TaskCard 
                                        colorScheme={colorScheme}
                                        themeColors={themeColors}
                                        userFullName={userFullName}
                                        initials={initials}
                                        userEmail={userEmail}
                                        taskData={taskData} 
                                        setTaskData={setTaskData} 
                                        today={today} 
                                        ongoingTasks={ongoingTasks}
                                        overdueTasks={overdueTasks}
                                        completedTasks={completedTasks}
                                        userProfileDto={userProfileDto}
                                        userProfilePicture={userProfilePicture}
                                        spaceId={spaceData.id}
                                    />} */}
                                    
                                </div>
                            </div>

                            {/* <div className='d-flex justify-content-between py-2 user-home-all-content-left-spacing'>
                                <ProjectCard 
                                />
                            </div> */}
                        </div>

                        {/* <div className="user-home-right-side-block">
                            <div className='d-md-block col-12 user-home-all-content-left-spacing'>
                                <div className="row">
                                    <div className='col-lg-12 calendar-block-parent'>
                                        <CalendarBlock 
                                            taskData={taskData}
                                            today={today}
                                        />
                                    </div>
                                    <div className='col-lg-12 milestone-block-parent'>
                                        <MilestoneBlock />

                                    </div>
                                    
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default NewHome;