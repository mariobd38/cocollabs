import React from 'react';

import Cookies from 'js-cookie';
import { userLogout } from '../../../DataManagement/Users/logout';
// import { constructImageSrc } from '../../../utils/constructImageSrc';

import { Text,Menu } from '@mantine/core';

import {Icons} from '../../icons/icons';
import UserAvatar from '../UserAvatar/userAvatar';
import { MantineDropdown } from '../../models/ModelDropdown2/mantineDropdown';

const HomeNavbarUserMenu = (props) => {
    const {userProfileDto,userProfilePicture, userFullName, initials,colorScheme,setColorScheme,themeColors } = props;

    const handleUserLogout = () => {
        localStorage.clear();
        Cookies.set('isAuthenticated', false);
        userLogout();
    };

    const menuItems = [
        { name: 'Profile',icon: 'IconUser', marginTop: '20', action: () => console.log("profile")},
        { name: 'Settings',icon: 'IconSettings', action: () => console.log("settings")},
        { name: 'Notification Settings',icon: 'IconBell', action: () => console.log("notification settings")},
        { name: 'Themes',icon: 'IconBrush', action: () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')},
        { name: 'Archive',icon: 'IconArchive', action: () => console.log("archive")},
        { name: 'Trash',icon: 'IconTrash', action: () => console.log("trash")},
        { name: 'Help',icon: 'IconHelp', action: () => console.log("help")},
    ];

    return (
        <>
            <MantineDropdown 
                target={
                    <div className={`d-flex align-items-center home-button ${colorScheme}`} style={{borderRadius: "8px", cursor: "pointer", padding: "5.5px 8px"}}>
                        <UserAvatar 
                            userProfileDto={userProfileDto}
                            userProfilePicture={userProfilePicture}
                            initials={initials}
                            multiplier={2.275}
                            fontSize={1}
                        />
                        <span className='ps-1'>
                            {Icons('IconChevronDown',15,15,themeColors.text[1])}
                        </span>
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
                        <Menu.Item key={item.name} onClick={item.action} className={`home-button ${colorScheme}`} bg={themeColors.bg[2]} c={themeColors.text[4]} mt={item?.marginTop} w='91.5%' leftSection={Icons(item.icon,14,14,themeColors.text[4])}>
                            {item.name}
                        </Menu.Item>
                    ))}
                    <Menu.Divider size="xs" bd='.1px solid #676869' />
                    <Menu.Item w='91.5%' className={`home-button ${colorScheme}`} bg={themeColors.bg[2]} c={themeColors.text[4]} onClick={handleUserLogout} leftSection={Icons('IconLogout',14,14,themeColors.text[4])}>
                        Log out
                    </Menu.Item>
                    </div>
                }
                background={themeColors.bg[2]} position='bottom-end' colorScheme={colorScheme}
            />
        </>
    );
};

export default HomeNavbarUserMenu;