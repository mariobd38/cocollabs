import React, { forwardRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar,UnstyledButton } from '@mantine/core';
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
    const { data, openSidebarToggle, themeColors, colorScheme, setOpenSpaceCreateModal, setDialogTrigger } = props;
    const currentSpace = data.space.name;
    const { isMobile } = useSidebar();
    const navigate = useNavigate(); 
    const app = readLocalStorageValue({ key: 'ApplicationStore' }) ?? { userSpace: [] };

    const profileAvatar = (size,currSpace) => {
        const iconChildren = currSpace?.icon?.children;
        
        if (iconChildren?.type === 'svg') {
            return (
                <Avatar 
                    className="ease-linear duration-500 transition-all hover:brightness-110" 
                    w={getProfileSize(size)} 
                    h={getProfileSize(size)} 
                    miw={getProfileSize(size)} 
                    bg={currSpace?.icon?.background} 
                    radius={currSpace?.icon?.radius}
                >
                    <svg
                        xmlns={iconChildren.props.xmlns}
                        width={iconChildren.props.width}
                        height={iconChildren.props.height}
                        viewBox={iconChildren.props.viewBox}
                        fill={iconChildren.props.fill}
                        className={iconChildren.props.className}
                    >
                        {iconChildren.props.paths?.map((pathData, index) => (
                            <path 
                                key={index}
                                {...pathData}
                            />
                        ))}
                    </svg>
                </Avatar>
            );
        }
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
                        <SidebarMenuButton size="lg" className="font-['Inter'] p-0 hover:bg-transparent border-transparent bg-transparent focus:ring-0 ring-0 ring-transparent">
                            <div className={classes.profile + " flex w-full"}  >
                                {openSidebarToggle ? (
                                    <UnstyledButton className={`${classes.mainLink} flex justify-between last:mb-0 gap-1.5 ${classes.active}`} data-theme={colorScheme}>
                                            {profileAvatar(1.8875,data.space)}
                                            <p className="dark:text-white text-black/100 font-semibold pl-1 max-w-['90%'] text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                                                {currentSpace}
                                            </p>
                                        <div className='ml-auto'>{Icons('IconSelector',20,20, themeColors.text[3])}</div>
                                    </UnstyledButton>
                                ) : <>{profileAvatar(1.8875,data.space)}</> }
                            </div>
                        </SidebarMenuButton>
                    }
                    dropdown={
                        <div className='font-["Inter"]'>
                            <DropdownMenuLabel className="flex items-center gap-3.5">
                                {profileAvatar(2.1,data.space)}
                                <div className="flex flex-col gap-1 max-w-[80%] tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">
                                    <span>{currentSpace}</span>
                                    <span className='text-xs text-muted-foreground'>1 contributor</span>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSub className="focus:bg-gray-100">
                                <DropdownMenuSubTrigger className="gap-2 p-2 cursor-pointer " >
                                    <div className="flex items-center justify-center size-6 rounded-sm border">
                                        {Icons('IconSwitchHorizontal')}
                                    </div>
                                    <div>Switch space</div>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent className='w-56'>
                                        {sortedSpaces.map((space, index) => (
                                            <DropdownMenuItem key={index} className="cursor-pointer" onClick={() => activateCurrentSpace(space.name)}>
                                                <div className='flex justify-between items-center w-full'>
                                                    <div className="flex gap-2 min-w-0">
                                                        {profileAvatar(1.3, space)}
                                                        <span className="pl-[2px] max-w-[85%] min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">
                                                            {space.name}
                                                        </span>
                                                    </div>
                                                    <div className='shrink-0'>
                                                        {space.name === currentSpace && Icons('IconCheck')}
                                                    </div>
                                                </div>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            {data.options.map((option) => (
                                <DropdownMenuItem key={option.name} className="gap-2 px-2 py-[7px] cursor-pointer" >
                                    <div className="flex items-center justify-center size-6 rounded-sm border">
                                        {Icons(option.icon)}
                                    </div>
                                    {option.name}
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 px-2 py-1.5 cursor-pointer" onClick={() => setOpenSpaceCreateModal(true)}>
                                <div className="flex items-center justify-center size-6 rounded-sm border">
                                    {Icons('IconPlus')}
                                </div>
                                <div onClick={() => setDialogTrigger(ref)}>New space</div>
                            </DropdownMenuItem>
                        </div>
                    } side={isMobile ? "bottom" : "right"} align='start' w={240} 
                /> 
            </SidebarMenuItem>
        </SidebarMenu>
    );
});

HomeSidebarHeader.displayName = "HomeSidebarHeader";
export default HomeSidebarHeader;
