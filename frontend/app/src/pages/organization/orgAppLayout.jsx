import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Outlet } from 'react-router-dom';

import { useMantineTheme,useMantineColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

import HomeNavbarv2 from '@/components/Home/HomeNavbar/homeNavbar';
import HomeSidebar from '@/components/Home/v2/HomeSidebar/homeSidebar';

import { getUserProfileInfo } from '@/api/users/getUserProfileInfo';
// import { getLastActiveSpaceInfo } from '@/api/spaces/getLastActiveSpace';
import { getLastActiveOrganizationInfo } from '@/api/organizations/getLastActive';


// import { getPersonalSpaceInfo } from '@/api/Spaces/getPersonalSpaceInfo';
// import { getTaskInfoBySpace } from '@/api/Tasks/getTasksBySpace';
// import { getAllUserSpacesInfo } from '@/api/Spaces/getAllUserSpaces';
// import { getGoogleTaskInfo } from '../../DataManagement/Tasks/getGoogleTasks';

import { getThemeColor } from '@/components/Themes/getThemeColor';
import { getTextColor } from '@/components/Themes/getTextColor';

const OrgAppLayout = ({content}) => {
    document.body.style.overflowY = "hidden";
    // const dayjs = require('dayjs');
    const theme = useMantineTheme();
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const location = useLocation();
    const passedUserInfo = location.state?.userInfo;
    const passedSpaceInfo = location.state?.spaceInfo;
    const [userEmail, setUserEmail] = useState(passedUserInfo?.email || '');
    const [userProfilePicture, setUserProfilePicture] = useState('');
    const [userProfileDto, setUserProfileDto] = useState('');
    const [spaceData, setSpaceData] = useState(passedSpaceInfo || []);
    const [orgData, setOrgData] = useState(passedSpaceInfo || []);
    const [userSpaces, setUserSpaces] = useState([]);
    const [userOrgs, setUserOrgs] = useState([]);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const { slug } = useParams();
    const currentSpace = userSpaces.find(item => item.slug === slug);
    // const currentOrg = userOrgs.find(item => item?.slug === slug);
    const currentOrg = userOrgs?.length > 0 ? userOrgs.find(item => item?.slug === slug) : null;

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
        email: userEmail, 
        picture: userProfilePicture, 
        profileDto: userProfileDto
    };
    
    // useEffect(() => {
    //     async function fetchSpaceData() {
    //         const data = await getLastActiveOrganizationInfo();
    //         setTimeout(() => {
    //             setSpaceData(data);
    //         },250)
    //     }
    //     fetchSpaceData();
    // }, [slug])
    // useEffect(() => {
    //     async function fetchOrganizationsData() {
    //         const data = await getLastActiveOrganizationInfo();
    //         setTimeout(() => {
    //             setOrgData(data);
    //         },250)
    //     }
    //     fetchOrganizationsData();
    // }, [slug]);

    const appProps = {
        space: spaceData,
        // organizations: orgData,
        organizations: userOrgs,
        profile: userProfileDto,
    }

    useEffect(() => {
        const fetchProfileData = async () => {
          if (storedAppInfo) {
            // Use the cached data if available
            // setUserFullName(storedAppInfo.user.fullName);
            setUserEmail(storedAppInfo.user.email);
            setUserProfilePicture(storedAppInfo.user.picture);
            setUserProfileDto(storedAppInfo.profile);
            setUserSpaces(storedAppInfo.userSpace);
            setUserOrgs(storedAppInfo.organizations);
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
                    userSpace: data.userSpaceDto,
                    organizations: data.organizationDto
                }
                // setUserFullName(jsonData.user.fullName);
                setUserEmail(jsonData.user.email);
                setUserProfilePicture(jsonData.user.picture);
                setUserProfileDto(jsonData.profile);
                setColorScheme(jsonData.userPreference.theme);
                setUserSpaces(jsonData.userSpace);
                setUserOrgs(jsonData.organizations);
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
                        resize={true}
                        themeColors={themeColors}
                        colorScheme={colorScheme}
                        openSidebarToggle={openSidebarToggle}
                        setOpenSidebarToggle={setOpenSidebarToggle}
                        spaceData={{name: currentSpace?.name, icon: currentSpace?.icon,slug: currentSpace?.slug}}
                        activePage={activePage}
                        userProfileDto={fullUserData.profileDto}
                        userProfilePicture={fullUserData.picture}
                    />
                </div>
                <div className={`bg-background flex flex-col w-full relative px-6 top-10 py-6 overflow-y-scroll max-h-[calc(100dvh_-_2rem)] ${openSidebarToggle && 'open' }`}>
                    <Outlet context={{themeColors,appProps,currentSpace,currentOrg,colorScheme}}/>
                </div>
            </div>
        </>
    );
};

export default OrgAppLayout;