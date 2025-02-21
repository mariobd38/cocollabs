import React from 'react';
import { useNavigate } from 'react-router-dom';


import { useMantineColorScheme } from '@mantine/core';

import { updateThemeInfo } from '@/api/users/updateTheme';
import { userLogout } from '@/api/Auth/logout';

import { DropdownMenuLabel,DropdownMenuItem,DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import CustomDropdown from '@/components/customDropdown';
import { User, Settings, PaintRoller, Archive, LogOut, Bug } from 'lucide-react';

import UserAvatar from '@/components/Home/UserAvatar/userAvatar';

const HomeNavbarUserMenu = (props) => {
    const {userProfileDto,userProfilePicture,themeColors,storedUserInfo,setStoredUserInfo} = props;
    const { colorScheme,setColorScheme } = useMantineColorScheme();
    const navigate = useNavigate();

    const handleUserLogout = () => {
        localStorage.clear();
        userLogout(navigate);
    };

    const handleThemeUpdate = () => {
        const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
        setColorScheme(newTheme);
        updateThemeInfo(newTheme);
        if (storedUserInfo) {
            const updatedUserInfo = {
                ...storedUserInfo, // Spread existing user data
                userPreference: {
                    ...storedUserInfo.userPreferenceDto, // Spread existing preferences
                    theme: newTheme, // Update theme
                },
            };
        
            // Update localStorage with the new data
            setStoredUserInfo(updatedUserInfo);
        }
    }

    const menuItems = [
        { name: 'Profile',icon: User, marginTop: '20', action: () => console.log("profile")},
        { name: 'Settings',icon: Settings, action: () => console.log("settings")},
        // { name: 'Notification Settings',icon: Bell, action: () => console.log("notification settings")},
        { name: 'Themes',icon: PaintRoller, action: handleThemeUpdate},
        { name: 'Archive',icon: Archive, action: () => console.log("archive")},
        { name: 'Report a bug',icon: Bug, action: () => console.log("report bug")},
        // { name: 'Help',icon: 'IconHelp', action: () => console.log("help")},
    ];

    return (
        <>
            <CustomDropdown 
                trigger={
                    <div className={`py-1.5 px-2 flex items-center  cursor-pointer hover:bg-black/10 dark:hover:bg-zinc-700 rounded-lg`}>
                        <UserAvatar 
                            userProfileDto={userProfileDto}
                            userProfilePicture={userProfilePicture}
                            multiplier={1.8}
                        />
                    </div>
                }
                dropdown={
                    <div>
                        <DropdownMenuLabel className='mb-2.5'>
                            <div className='flex items-center gap-4'>
                                {userProfileDto?.fullName && <UserAvatar 
                                    userProfileDto={userProfileDto}
                                    userProfilePicture={userProfilePicture}
                                    multiplier={4.8}
                                />}

                                <div className='flex flex-col font-["Lato"]'>
                                    <p className='text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-40'>{userProfileDto?.fullName}</p>
                                    <p className='text-sm font-extralight text-muted-foreground whitespace-nowrap overflow-hidden w-40 text-ellipsis'>Software Engineer</p>
                                </div>
                            </div>
                        </DropdownMenuLabel>

                        {menuItems.map((item) => (
                            <DropdownMenuItem key={item.name} onClick={item.action} className={`cursor-pointer ${colorScheme}`}>
                                <div className='flex gap-3 items-center' >
                                    <item.icon className='text-zinc-800 dark:text-zinc-300' />
                                    <p className='text-sm'>

                                    {item.name}
                                    </p>
                                </div>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className={` cursor-pointer ${colorScheme}`} onClick={handleUserLogout}>
                            <div className='flex gap-3 items-center' >
                                <LogOut className='text-zinc-800 dark:text-zinc-300' />
                                Log out
                            </div>
                        </DropdownMenuItem>
                    </div>
                } side='bottom' align='end' w={280}
            />
        </>
    );
};

export default HomeNavbarUserMenu;