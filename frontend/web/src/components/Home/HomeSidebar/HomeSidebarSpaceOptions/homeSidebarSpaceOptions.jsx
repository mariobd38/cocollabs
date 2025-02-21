import React from 'react';

import { Box,Flex } from '@mantine/core';
import { DropdownMenuLabel,DropdownMenuItem,DropdownMenuSeparator } from "@/components/ui/dropdown-menu";


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
            <DropdownMenuLabel w='225' h={25} mb={8} fz={12.3} c={`${colorScheme==='dark' ? '#999999' : '#6b6b6b'}`}
            style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{spaceName}</DropdownMenuLabel>

            {menuItems.map((item) => (
                <DropdownMenuItem 
                    key={item.name} 
                    c={themeColors.text[3]}
                    className={`cursor-pointer ${colorScheme}`}
                    bg={themeColors.bg[12]}
                    mt={item?.marginTop} 
                    w='calc(240px - 13.8%)' 
                >
                    <Flex align='center' gap={12} fw={400}>{Icons(item.icon,15,15,themeColors.text[4])}{item.name}</Flex>
                </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator size="xs" bd='.1px solid #676869' my={5} />
            <DropdownMenuItem
                bg={themeColors.bg[12]}
                className={`${colorScheme} cursor-pointer`}
                w='calc(240px - 13.8%)' 
                onClick={() => setTimeout(() => {
                    setOpenSpaceCreateModal(true);
                },400)}
            >
                <Flex align='center' gap={12} fw={400}>{Icons('IconPlus',15,15,themeColors.text[4])}New space</Flex>
            </DropdownMenuItem>
        </Box>
    );
};

export default HomeSidebarSpaceOptions;