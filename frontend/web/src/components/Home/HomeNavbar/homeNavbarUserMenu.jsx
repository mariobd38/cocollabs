import React from 'react';

import { useMantineColorScheme } from '@mantine/core';

import { updateThemeInfo } from '@/api/Users/updateTheme';
import { userLogout } from '@/api/Auth/logout';

import { DropdownMenuLabel,DropdownMenuItem,DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import CustomDropdown from '@/components/customDropdown';


import { Icons } from '@/components/icons/icons';
import UserAvatar from '@/components/Home/UserAvatar/userAvatar';

const HomeNavbarUserMenu = (props) => {
    const {userProfileDto,userProfilePicture, userFullName,themeColors,storedUserInfo,setStoredUserInfo} = props;
    const { colorScheme,setColorScheme } = useMantineColorScheme();

    const handleUserLogout = () => {
        localStorage.clear();
        userLogout();
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
        { name: 'Profile',icon: 'IconUser', marginTop: '20', action: () => console.log("profile")},
        { name: 'Settings',icon: 'IconSettings', action: () => console.log("settings")},
        { name: 'Notification Settings',icon: 'IconBell', action: () => console.log("notification settings")},
        { name: 'Themes',icon: 'IconBrush', action: handleThemeUpdate},
        { name: 'Archive',icon: 'IconArchive', action: () => console.log("archive")},
        { name: 'Trash',icon: 'IconTrash', action: () => console.log("trash")},
        { name: 'Help',icon: 'IconHelp', action: () => console.log("help")},
    ];

    return (
        <>
            <CustomDropdown 
                trigger={
                    <div className={`py-1.5 px-2 flex items-center  cursor-pointer home-button ${colorScheme} rounded-lg`}>
                        <UserAvatar 
                            userProfileDto={userProfileDto}
                            userProfilePicture={userProfilePicture}
                            multiplier={2.2}
                        />
                    </div>
                }
                dropdown={
                    <div>
                        <DropdownMenuLabel className='mb-2.5'>
                            <div className='flex items-center gap-4'>
                                <UserAvatar 
                                    userProfileDto={userProfileDto}
                                    userProfilePicture={userProfilePicture}
                                    multiplier={4.8}
                                />

                                <div className='flex flex-col font-["Lato"]'>
                                    <p className='text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-40'>{userFullName}</p>
                                    <p className='text-sm font-extralight text-muted-foreground whitespace-nowrap overflow-hidden w-40 text-ellipsis'>Software EngineerEngineerEngineer</p>
                                </div>
                            </div>
                        </DropdownMenuLabel>

                        {menuItems.map((item) => (
                            <DropdownMenuItem key={item.name} onClick={item.action} className={`cursor-pointer ${colorScheme}`}>
                                <div className='flex gap-3 items-center' >
                                    {Icons(item.icon,14,14,themeColors.text[4])}
                                    {item.name}
                                </div>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className={`home-button cursor-pointer ${colorScheme}`} onClick={handleUserLogout}>
                            <div className='flex gap-3 items-center' >
                                {Icons('IconLogout',14,14,themeColors.text[4])}
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