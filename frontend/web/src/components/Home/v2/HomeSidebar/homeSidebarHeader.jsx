import React, { forwardRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar,Box,UnstyledButton,Flex,Text } from '@mantine/core';
import { readLocalStorageValue } from '@mantine/hooks';

import { DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuSub,DropdownMenuSubTrigger,
    DropdownMenuPortal,DropdownMenuSubContent } from "@/components/ui/dropdown-menu"
import { SidebarMenu,SidebarMenuButton,SidebarMenuItem,useSidebar } from "@/components/ui/sidebar"
import CustomDropdown from '@/components/customDropdown';
import { Icons } from '@/components/icons/icons';

import activateSpace from '@/api/UserSpaces/activateSpace';
import getProfileSize from '@/utils/calculateProfileIconSize';

import classes from '@/styles/home/homeSidebar.module.css';
import '@/styles/home/homeSidebar.css';

const HomeSidebarHeader = forwardRef((props, ref) => {
    const { data, openSidebarToggle, themeColors, colorScheme, setOpenSpaceCreateModal, setDialogTrigger,setSpaceSwitch } = props;
    const currentSpace = data.space.name;
    const { isMobile } = useSidebar();
    const navigate = useNavigate(); 
    const app = readLocalStorageValue({ key: 'ApplicationStore' }) ?? { userSpace: [] };

    const profileAvatar = (size,currSpace) => {
        return (<Avatar className="ease-linear duration-500 transition-all hover:brightness-125" w={getProfileSize(size)} h={getProfileSize(size)} miw={getProfileSize(size)} 
            color={currSpace?.icon?.color} radius={currSpace?.icon?.radius} >
                <span style={{ fontSize: `calc(${getProfileSize(size)} * 0.5)` }}>
                    {currSpace?.icon?.children}
                </span>
        </Avatar>);
    }

    const routeChange = (path) => { 
        navigate(path);
    }

    const sortedSpaces = useMemo(() => {
        return [...app.userSpace].sort((a, b) => {
            if (a.name === currentSpace) return -1;
            if (b.name === currentSpace) return 1;
            return 0;
        });
    }, [app.userSpace, currentSpace]);

    const activateCurrentSpace = async (space) => {
        if (space === currentSpace) return;
        try {
            const response = await activateSpace(space);
            if (response && response.ok) {
                setSpaceSwitch((prev) => prev + 1);
                const slug = app.userSpace.filter(item => item.name === space)[0].slug;
                slug && routeChange(`/${slug}`);
            }
        } catch (error) {
            console.error("Failed to activate space:", error);
        }
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <CustomDropdown 
                    trigger={
                        <SidebarMenuButton size="lg"
                            className="p-0 hover:bg-transparent border-transparent bg-transparent focus:ring-0 ring-0 ring-transparent "
                        >
                            <Flex className={classes.profile} w='100%'>
                                {openSidebarToggle ? (
                                    <UnstyledButton className={`${classes.mainLink} flex justify-between last:mb-0 gap-1.5 ${classes.active}`} data-theme={colorScheme}>
                                            {profileAvatar(1.8875,data.space)}
                                            <Text maw='90%' ps={3}  c={themeColors.text[3]} fw={550} fz={15.5} ff="Inter" className="whitespace-nowrap overflow-hidden text-ellipsis">
                                                {currentSpace}
                                            </Text>
                                        <Box ml='auto' >
                                            {Icons('IconSelector',20,20, themeColors.text[3])}
                                        </Box>
                                    </UnstyledButton>
                                ) : <>{profileAvatar(1.8875,data.space)}</> }
                            </Flex>
                        </SidebarMenuButton>
                    }
                    dropdown={
                        <Box>
                            <DropdownMenuLabel className="flex items-center gap-3.5">
                                {profileAvatar(2.1,data.space)}
                                <Flex ff='Inter' lts={0.25} direction='column' gap={0.5} className=" max-w-[80%] whitespace-nowrap overflow-hidden text-ellipsis">
                                    <Box fz={13} className=''>{currentSpace}</Box>
                                    <Box fz={11} className='text-muted-foreground'>1 contributor</Box>
                                </Flex>
                                {/* {spaceData.name}kafshfhahffjjhsfsjkh */}
                            </DropdownMenuLabel>
                            <DropdownMenuSub className="focus:bg-gray-100">
                                <DropdownMenuSubTrigger className="gap-2 p-2 cursor-pointer " >
                                    {/* <UserPlus /> */}
                                    <Flex align='center' justify='center' className="size-6 rounded-sm border">
                                            {Icons('IconSwitchHorizontal')}
                                    </Flex>
                                    <Box>Switch space</Box>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent className='w-56'>
                                        {sortedSpaces.map((space, index) => (
                                            <DropdownMenuItem key={index} className="cursor-pointer" onClick={() => activateCurrentSpace(space.name)}>
                                            <Flex justify="space-between" align="center" w="100%">
                                                <Flex gap={5} className="min-w-0">
                                                {profileAvatar(1.3, space)}
                                                <span className="pl-[2px] max-w-[85%] min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">
                                                    {space.name}
                                                </span>
                                                </Flex>
                                                <Flex className="shrink-0">
                                                {space.name === currentSpace && Icons('IconCheck')}
                                                </Flex>
                                            </Flex>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            {data.options.map((option) => (
                                <DropdownMenuItem key={option.name} className="gap-2 p-2 cursor-pointer" >
                                    <Flex align='center' justify='center' className="size-6 rounded-sm border">
                                        {Icons(option.icon)}
                                    </Flex>
                                    {option.name}
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 p-2 cursor-pointer" onClick={() => setOpenSpaceCreateModal(true)}>
                                <Flex align='center' justify='center'  className="size-6 rounded-sm border">
                                    {Icons('IconPlus')}
                                </Flex>
                                <Box ref={ref} onClick={() => setDialogTrigger(ref)}>New space</Box>
                            </DropdownMenuItem>
                        </Box>
                    } side={isMobile ? "bottom" : "right"} align='start' w={240} 
                /> 
            </SidebarMenuItem>
        </SidebarMenu>
    );
});

HomeSidebarHeader.displayName = "HomeSidebarHeader";
export default HomeSidebarHeader;