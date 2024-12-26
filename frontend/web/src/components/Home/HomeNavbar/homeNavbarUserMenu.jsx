import React from 'react';

import { updateThemeInfo } from '@/api/Users/updateTheme';
import { userLogout } from '@/api/Users/logout';

import { Text,Flex,Box } from '@mantine/core';
import { DropdownMenuLabel,DropdownMenuItem,DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import CustomDropdown from '@/components/customDropdown';

import {Icons} from '@/components/icons/icons';
import UserAvatar from '@/components/Home/UserAvatar/userAvatar';

const HomeNavbarUserMenu = (props) => {
    const {userProfileDto,userProfilePicture, userFullName, initials,colorScheme,setColorScheme,themeColors,
        storedUserInfo,setStoredUserInfo
     } = props;

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
                    <Flex align='center' p='5.5px 8px' className={`cursor-pointer home-button ${colorScheme}`} style={{borderRadius: "6px"}}>
                        <UserAvatar 
                            userProfileDto={userProfileDto}
                            userProfilePicture={userProfilePicture}
                            initials={initials}
                            multiplier={2.075}
                            fontSize={1}
                        />
                    </Flex>
                }
                dropdown={
                    <Box>
                        <DropdownMenuLabel className='mb-2.5'>
                            <Flex align='center' gap={16}>
                                <UserAvatar 
                                    userProfileDto={userProfileDto}
                                    userProfilePicture={userProfilePicture}
                                    initials={initials}
                                    multiplier={4.8}
                                    fontSize={2.1}
                                />

                                <Flex direction='column'>
                                    <Text c={themeColors.text[2]} fz={17} fw={650} className='home-navbar-menu-fullnamedesc'>{userFullName}</Text>
                                    <Text c={colorScheme === 'dark' ? '#cccccc' : '#616161'} fz={14} fw={200} className='home-navbar-menu-fullnamedesc'>Software Engineer</Text>
                                </Flex>
                            </Flex>
                        </DropdownMenuLabel>

                        {menuItems.map((item) => (
                            <DropdownMenuItem key={item.name} onClick={item.action} className={`cursor-pointer ${colorScheme}`}>
                                <Flex gap={12} align='center' >
                                    {Icons(item.icon,14,14,themeColors.text[4])}
                                    {item.name}
                                </Flex>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className={`home-button cursor-pointer ${colorScheme}`} onClick={handleUserLogout}>
                            <Flex gap={12} align='center'>
                                {Icons('IconLogout',14,14,themeColors.text[4])}
                                Log out
                            </Flex>
                        </DropdownMenuItem>
                    </Box>
                } side='bottom' align='end' w={280}
            />
        </>
    );
};

export default HomeNavbarUserMenu;