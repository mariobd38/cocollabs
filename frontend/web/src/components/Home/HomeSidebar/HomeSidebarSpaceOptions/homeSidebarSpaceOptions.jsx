import React from 'react';

import { Divider, Menu, Box } from '@mantine/core';

import { Icons } from '@/components/icons/icons';

const HomeSidebarSpaceOptions = (props) => {
    const {spaceName,setOpenSpaceCreateModal,themeColors,colorScheme } = props;
    const menuItems = [
        { name: 'Preferences', icon: 'IconAdjustmentsHorizontal' },
        { name: 'Switch space', icon: 'IconSwitchHorizontal' },
        { name: 'Space settings', icon: 'IconSettings'},
        { name: 'Manage members', icon: 'IconUsersGroup'},
    ];

    return (
        <Box my={5}>
            <Menu.Label w='225' h={25} mb={8} fz={12.3} c={`${colorScheme==='dark' ? '#999999' : '#6b6b6b'}`}
            style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{spaceName}</Menu.Label>

            {menuItems.map((item) => (
                <Menu.Item 
                    key={item.name} 
                    c={themeColors.text[3]}
                    className={`home-button ${colorScheme}`}
                    bg={themeColors.bg[12]}
                    mt={item?.marginTop} 
                    w='calc(240px - 13.8%)' 
                    leftSection={Icons(item.icon,15,15,themeColors.text[3])}
                >
                    {item.name}
                </Menu.Item>
            ))}
            <Divider size="xs" bd='.1px solid #676869' my={5} />
            <Menu.Item 
                c={themeColors.text[3]}
                bg={themeColors.bg[12]}
                className={`home-button ${colorScheme}`}
                w='calc(240px - 13.8%)' 
                leftSection={Icons('IconPlus',15,15,themeColors.text[3])} 
                onClick={() => setTimeout(() => {
                    setOpenSpaceCreateModal(true);
                },400)}
            >
                New space
            </Menu.Item>
        </Box>
    );
};

export default HomeSidebarSpaceOptions;