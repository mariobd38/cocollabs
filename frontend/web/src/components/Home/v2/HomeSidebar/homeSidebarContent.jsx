import React from 'react';
import { useNavigate } from 'react-router-dom';

import { UnstyledButton,Tooltip } from '@mantine/core';
import { Badge } from '@/components/ui/badge';
import { SidebarGroup,SidebarGroupContent,SidebarMenu } from "@/components/ui/sidebar"
import { Icons } from "@/components/icons/icons";
import UserAvatar from '@/components/Home/UserAvatar/userAvatar';

import classes from '@/styles/home/homeSidebar.module.css';
import '@/styles/home/homeSidebar.css';

const links = [
    { icon: 'IconHome', label: 'Home', redirect: '/:slug' },
    { icon: 'IconWorldSearch', label: 'Explore', redirect: '/:slug/explore' },
    // { icon: 'IconInbox', label: 'Inbox' },
    { icon: 'IconFolder', label: 'Projects' },
    { icon: 'IconFile', label: 'Docs' },
    { icon: 'IconCalendar', label: 'Calendar' },
    // { icon: 'IconDotsCircleHorizontal', label: 'More' },
];

const HomeSidebarContent = (props) => {
    const { spaceSlug,openSidebarToggle,themeColors,colorScheme,activePage,userProfileDto,userProfilePicture } = props;
    const navigate = useNavigate(); 

    const redirectToSpace = (e,link) => {
        e.preventDefault(); 
        if (link.label !== activePage) {
            const path = link.redirect.replace(':slug', spaceSlug); // Replace :slug with actual value
            navigate(path);
        }
    }

    const mainLinks = links.map((link,index) => (
        <React.Fragment key={link.label} >
            {openSidebarToggle ? 
                <UnstyledButton onClick={(e) => redirectToSpace(e,link)}  key={link.label} 
                    className={`${classes.mainLink} last:mb-0 ${classes.active} ${activePage === link.label && classes.activeSpace }`} data-theme={colorScheme} >
                    <div className='flex justify-between w-full items-center'>
                        <div className='flex'>
                            <div className={`${classes.mainLinkIcon} ${classes.sidebarOpen}`}>
                                {Icons(link.icon, 20, 20, themeColors.text[10])}
                            </div>
                            <p className='font-["Inter"] text-sm dark:text-zinc-200 text-black/100'>
                                {link.label}
                            </p>
                        </div>
                        {link.notifications && (
                            <Badge className='border-0 size-6 px-2 h-4 flex justify-center'>
                                {link.notifications}
                            </Badge>
                        )}
                    </div>
                </UnstyledButton>
            : 
            <Tooltip 
                label={link.label} 
                position="right" 
                withArrow 
                arrowOffset={10} 
                arrowSize={4} 
                bg={`${colorScheme==='dark' ? '#121212' : '#272727'}`} 
                c='#f0f0f0' 
                openDelay={100} 
                offset={{ mainAxis: 10 }}
            >
                <UnstyledButton onClick={(e) => redirectToSpace(e,link)}  
                    key={link.label} className={`${classes.mainLink} font-["Inter"] px-[5px] last:mb-0 ${activePage === link.label && classes.activeSpace }` } data-theme={colorScheme}>
                    <div className='flex items-center justify-center relative'>
                        <div className={`${classes.mainLinkIcon}`}>
                            {Icons(link.icon, 20, 20, themeColors.text[10],1.7)}
                        </div>
                        {link.notifications && (
                            <Badge className='border-0 top-0 right-0 size-1 px-2 text-[11px] h-4 flex justify-center absolute translate-y-[-85%] translate-x-[60%]'>
                                {link.notifications}
                            </Badge>
                        )} 
                    </div>
                </UnstyledButton>
            </Tooltip>
            }
        </React.Fragment>
    ));

    return (
        // <SidebarGroup>
        //     <SidebarGroupContent className='h-[calc(100%_-8rem)] max-h-[90%]'>
        //         <SidebarMenu className='flex flex-col h-full'>
        //             <div className='my-2'>{mainLinks}</div>
        //         </SidebarMenu>
        //         <div className='flex justify-center' >
        //             <UserAvatar 
        //                 userProfileDto={userProfileDto}
        //                 userProfilePicture={userProfilePicture}
        //                 multiplier={2}
        //             />
        //         </div>
        //     </SidebarGroupContent>
        // </SidebarGroup>
        <SidebarGroup>
            <SidebarGroupContent className="h-[calc(100%_-4rem)] flex flex-col justify-between">
                <SidebarMenu>
                    <div className="my-2">{mainLinks}</div>
                </SidebarMenu>
        
                {openSidebarToggle ?
                <div className="flex items-center gap-3 py-3 px-0 border-t border-zinc-700">
                    <UserAvatar 
                        userProfileDto={userProfileDto}
                        userProfilePicture={userProfilePicture}
                        multiplier={1.8}
                    />
                </div> :
                <div className="flex justify-center items-center gap-2 p-3 border-t border-zinc-700">
                    <UserAvatar 
                        userProfileDto={userProfileDto}
                        userProfilePicture={userProfilePicture}
                        multiplier={1.8}
                    />
                </div>}
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default HomeSidebarContent;