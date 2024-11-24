import React from 'react';

import { userLogout } from '@/api/Users/logout';
import { updateThemeInfo } from '@/api/Users/updateTheme';

import { Text,Menu } from '@mantine/core';

import {Icons} from '@/components/icons/icons';
import UserAvatar from '@/components/Home/UserAvatar/userAvatar';
import { MantineDropdown } from '@/components/models/ModelDropdown2/mantineDropdown';

const HomeNavbarUserMenu = (props) => {
    const {userProfileDto,userProfilePicture, userFullName, initials,colorScheme,setColorScheme,themeColors,
        storedUserInfo,setStoredUserInfo } = props;

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
                userPreferenceDto: {
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
        // { name: 'Themes',icon: 'IconBrush', action: () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')},
        { name: 'Themes',icon: 'IconBrush', action: handleThemeUpdate},
        { name: 'Archive',icon: 'IconArchive', action: () => console.log("archive")},
        { name: 'Trash',icon: 'IconTrash', action: () => console.log("trash")},
        { name: 'Help',icon: 'IconHelp', action: () => console.log("help")},
    ];


    return (
        <>
            <MantineDropdown 
                target={
                    <div className={`d-flex align-items-center home-button ${colorScheme}`} style={{borderRadius: "6px", cursor: "pointer", padding: "5.5px 8px"}}>
                        <UserAvatar 
                            userProfileDto={userProfileDto}
                            userProfilePicture={userProfilePicture}
                            initials={initials}
                            multiplier={2.075}
                            fontSize={1}
                        />
                        {/* <span className='ps-1'>
                            {Icons('IconChevronDown',15,15,themeColors.text[1])}
                        </span> */}
                    </div>
                }
                width={300}
                dropdown={
                    <div className={`user-home-navbar-menu-dropdown`}
                    >
                    <Menu.Label>
                        <div className='d-flex gap-3 align-items-center'>
                            <UserAvatar 
                                userProfileDto={userProfileDto}
                                userProfilePicture={userProfilePicture}
                                initials={initials}
                                multiplier={4.8}
                                fontSize={2.1}
                            />

                            <div className='d-flex flex-column'>
                                <Text c={themeColors.text[2]} fz={17} fw={650} ff='Lato' className='home-navbar-menu-fullnamedesc'>{userFullName}</Text>
                                <Text c={colorScheme === 'dark' ? '#cccccc' : '#616161'} fz={14} fw={200} ff='Lato' className='home-navbar-menu-fullnamedesc'>Software Engineer</Text>
                            </div>
                        </div>
                    </Menu.Label>

                    {menuItems.map((item) => (
                        <Menu.Item key={item.name} onClick={item.action} className={`home-button ${colorScheme}`} bg={themeColors.bg[12]} c={themeColors.text[4]} mt={item?.marginTop} w='91.5%' leftSection={Icons(item.icon,14,14,themeColors.text[4])}>
                            {item.name}
                        </Menu.Item>
                    ))}
                    <Menu.Divider size="xs" bd={`.1px solid ${colorScheme==='dark' ? '#484a4b' : '#d0d2d3'}`}/>
                    <Menu.Item w='91.5%' className={`home-button ${colorScheme}`} bg={themeColors.bg[12]} c={themeColors.text[4]} onClick={handleUserLogout} leftSection={Icons('IconLogout',14,14,themeColors.text[4])}>
                        Log out
                    </Menu.Item>
                    </div>
                }
                background={themeColors.bg[12]} position='bottom-end' colorScheme={colorScheme}
            />
        </>
    );
};

export default HomeNavbarUserMenu;