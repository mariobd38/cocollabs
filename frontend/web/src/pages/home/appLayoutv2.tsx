import React, { useState, useEffect,useLayoutEffect } from 'react';
import { useLocation, useParams, Outlet } from 'react-router-dom';

import { useMantineTheme,useMantineColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

import HomeNavbarv2 from '@/components/Home/v2/HomeNavbar/homeNavbarv2';
import HomeSidebar from '@/components/Home/v2/HomeSidebar/homeSidebar';

import { getUserProfileInfo } from '@/api/users/getUserProfileInfo';
import { getLastActiveSpaceInfo } from '@/api/spaces/getLastActiveSpace';
// import { getPersonalSpaceInfo } from '@/api/Spaces/getPersonalSpaceInfo';
// import { getTaskInfoBySpace } from '@/api/Tasks/getTasksBySpace';
// import { getAllUserSpacesInfo } from '@/api/Spaces/getAllUserSpaces';
// import { getGoogleTaskInfo } from '../../DataManagement/Tasks/getGoogleTasks';

import { getThemeColor } from '@/components/Themes/getThemeColor';
import { getTextColor } from '@/components/Themes/getTextColor';



interface UserState {
  fullName: string;
  email: string;
  profilePicture: string;
  profileDto: string;
  spaces: any[];
}

interface SpaceData {
    name?: string;
    icon?: string;
    slug?: string;
  }
  
  interface FullUserData {
    fullName: string;
    email: string;
    picture: string;
    profileDto: string;
  }

const AppLayoutv2: React.FC = (content) => {
    // const dayjs = require('dayjs');
    const [storedAppInfo, setStoredAppInfo] = useLocalStorage<{
        user: { fullName: string; email: string; picture: string };
        profile: string;
        userSpace: any[];
        userPreference: { theme: string };
      }>({
        key: 'ApplicationStore',
        defaultValue: {
          user: { fullName: '', email: '', picture: '' },
          profile: '',
          userSpace: [],
          userPreference: { theme: '' },
        },
        getInitialValueInEffect: true,
      });

    const [userState, setUserState] = useState<UserState>({
        fullName: storedAppInfo?.user?.fullName || '',
        email: storedAppInfo?.user?.email || '',
        profilePicture: storedAppInfo?.user?.picture || '',
        profileDto: storedAppInfo?.profile || '',
        spaces: storedAppInfo?.userSpace || [],
    });

    const theme = useMantineTheme();
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const location = useLocation();
    const passedUserInfo = location.state?.userInfo;
    const passedSpaceInfo = location.state?.spaceInfo;
    const [userFullName, setUserFullName] = useState<string>(passedUserInfo?.fullName || '');
    const [userEmail, setUserEmail] = useState<string>(passedUserInfo?.email || '');
    const [userProfilePicture, setUserProfilePicture] = useState<string>('');
    const [userProfileDto, setUserProfileDto] = useState<string>('');
    const [spaceData, setSpaceData] = useState<any[]>(passedSpaceInfo || []);
    const [userSpaces, setUserSpaces] = useState<any[]>([]); // Type this more specifically if possible
    const [openSidebarToggle, setOpenSidebarToggle] = useState<boolean>(false);
    const { slug } = useParams();
    const currentSpace = userState.spaces.find(item => item.slug === slug);
    

    const themeColors = {
        bg: Array.from({ length: 13 }, (_, index) => getThemeColor(colorScheme, theme, index)),
        text: Array.from({ length: 13 }, (_, index) => getTextColor(colorScheme, theme, index))
    };
    

    const fullUserData: FullUserData = {
        fullName: userFullName,
        email: userEmail,
        picture: userProfilePicture,
        profileDto: userProfileDto,
      };
    
    useEffect(() => {
        async function fetchSpaceData() {
            const data = await getLastActiveSpaceInfo();
            setTimeout(() => {
                setSpaceData([data]);
            },250)
        }
        fetchSpaceData();
    }, [slug])
    const [isLoading, setIsLoading] = useState(true); 

    // useEffect(() => {
    //     const fetchProfileData = async () => {
    //         setIsLoading(true);
    //         try {
    //       if (storedAppInfo) {
    //         // Use the cached data if available
    //         setUserFullName(storedAppInfo.user.fullName);
    //         setUserEmail(storedAppInfo.user.email);
    //         setUserProfilePicture(storedAppInfo.user.picture);
    //         setUserProfileDto(storedAppInfo.profile);
    //         setUserSpaces(storedAppInfo.userSpace);
    //         setColorScheme(storedAppInfo.userPreference.theme as 'light' | 'dark' | 'auto');
    //         // const jsonData = { user: storedAppInfo };
    //       } 
    //       else {
    //         // Fetch data from API if no data in localStorage
    //         const data = await getUserProfileInfo();
    //         if (data) {
    //             const jsonData = {
    //                 user: data.userDto,
    //                 profile: data.profileDto,
    //                 userPreference: data.userPreferenceDto,
    //                 userSpace: data.userSpaceDto
    //             }
    //             setUserFullName(jsonData.user.fullName);
    //             setUserEmail(jsonData.user.email);
    //             setUserProfilePicture(jsonData.user.picture);
    //             setUserProfileDto(jsonData.profile);
    //             setColorScheme(jsonData.userPreference.theme);
    //             setUserSpaces(jsonData.userSpace);

    //             setStoredAppInfo(jsonData);
    //         }
    //       }
    //     } finally {
    //         setIsLoading(false); // End loading
    //     }
          
    //     }
    //     fetchProfileData();
    //   }, [passedUserInfo, storedAppInfo, setStoredAppInfo]);
    useEffect(() => {
        const fetchProfileData = async () => {
        //   setIsLoading(true);
          
          try {
            if (storedAppInfo) {
                console.log(storedAppInfo);
              // Update all state in one batch
              setUserState({
                fullName: storedAppInfo.user.fullName,
                email: storedAppInfo.user.email,
                profilePicture: storedAppInfo.user.picture,
                profileDto: storedAppInfo.profile,
                spaces: storedAppInfo.userSpace
              });
              setColorScheme(storedAppInfo.userPreference.theme as 'light' | 'dark' | 'auto');
            } else {
              const data = await getUserProfileInfo();
              console.log('ds');
              if (data) {
                const jsonData = {
                  user: data.userDto,
                  profile: data.profileDto,
                  userPreference: data.userPreferenceDto,
                  userSpace: data.userSpaceDto
                };
                
                // Atomic update
                setUserState({
                  fullName: jsonData.user.fullName,
                  email: jsonData.user.email,
                  profilePicture: jsonData.user.picture,
                  profileDto: jsonData.profile,
                  spaces: jsonData.userSpace
                });
                setColorScheme(jsonData.userPreference.theme);
                setStoredAppInfo(jsonData);
              }
            }
          } finally {
            // Delay loading state to ensure React has flushed updates
            // requestAnimationFrame(() => setIsLoading(false));
          }
        };
      
        fetchProfileData();
      }, [storedAppInfo, setStoredAppInfo]);
      

    const [activePage, setActivePage] = useState("Home");

    useEffect(() => {
        const path = location.pathname;
        if (path.includes("explore")) {
            setActivePage("Explore");
        } else {
            setActivePage("Home");
        }
    }, [location.pathname]);

    // if (isLoading) {
    //     return <div className="flex justify-center bg-red-500 items-center text-black h-screen">Loading...</div>;
    // }
    console.log(userState);


    return (
        <>
            <HomeNavbarv2 
                themeColors={themeColors}
                colorScheme={colorScheme}
                setColorScheme={setColorScheme}
                // profileInfo={fullUserData}
                profileInfo={{fullName: userState.fullName,email:userState.email,picture:userState.profilePicture,profileDto:userState.profileDto}}
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
                        // spaceData={{name: userState.spaces.name, icon: currentSpace?.icon,slug: currentSpace?.slug}}
                        userFullName={userFullName}
                        activePage={activePage}
                        userProfileDto={fullUserData.profileDto}
                        userProfilePicture={fullUserData.picture}
                    />
                </div>
                <div className={`bg-background flex flex-col w-full relative px-6 top-10 py-6 overflow-y-scroll max-h-[calc(100dvh_-_2rem)] ${openSidebarToggle && 'open' }`}>
                    <Outlet context={{themeColors,spaceData,currentSpace}}/>
                </div>
            </div>
        </>
    );
};

export default AppLayoutv2;