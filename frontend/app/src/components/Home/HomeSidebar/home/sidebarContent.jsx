import React from 'react';
import { useNavigate } from 'react-router-dom';

import { UnstyledButton } from '@mantine/core';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SidebarGroup,SidebarGroupContent,SidebarMenu,SidebarHeader,SidebarGroupLabel } from "@/components/ui/sidebar"
import { Home, MessageCircle, Folder, File, Users, Inbox } from 'lucide-react';
// import UserAvatar from '@/components/Home/UserAvatar/userAvatar';

import classes from '@/styles/home/homeSidebar.module.css';
import '@/styles/home/homeSidebar.css';
import { Separator } from '@radix-ui/react-separator';


const links = {
    top: [
        // { icon: Home, label: 'Home', redirect: '/' },
        { icon: Inbox, label: 'Inbox' },
        { icon: MessageCircle, label: 'Chat' },
        { icon: Users, label: 'Find devs', link: '/developers' },
        // { icon: Folder, label: 'Projects' },
        // { icon: File, label: 'Docs' },
        // { icon: Calendar, label: 'Calendar' },
    ],
    middle: [
        { icon: 'IconWorldSearch', label: 'Explore', redirect: '/:slug/explore' },
    ]
};


const SidebarContent = (props) => {
    const { appData,spaceSlug,openSidebarToggle,colorScheme,activePage,userProfileDto,userProfilePicture } = props;
    const navigate = useNavigate(); 

    const redirectToSpace = (e,link) => {
        e.preventDefault(); 
        if (link.label !== activePage) {
            const path = link.redirect.replace(':slug', spaceSlug); // Replace :slug with actual value
            navigate(path);
        }
    }

    // const renderLinks = (linksArray) => (
    //     appData.organizations.map((org, index) => {
    //       const link = linksArray[index % linksArray.length];
      
    //       return (
    //         <React.Fragment key={org.name} >
    //           {openSidebarToggle ? (
    //             <Button
    //               variant='ghost'
    //               className={`${classes.mainLink} last:mb-0 ${classes.active}`}
    //               data-theme={colorScheme}
    //             >
    //               <div className="flex justify-between w-full items-center">
    //                 <div className="flex items-center">
    //                   <div className={`${classes.mainLinkIcon} ${classes.sidebarOpen}`}>
    //                     {link.icon && <link.icon className='text-zinc-800 dark:text-zinc-200' size={16} />}
    //                   </div>
    //                   <a
    //                     href='/#'
    //                     onClick={(e) => {
    //                       e.preventDefault();
    //                       navigate(`/org/${org.slug}`);
    //                     }}
    //                     className="text-sm dark:text-zinc-200 text-black/100 overflow-hidden w-[150px] whitespace-nowrap text-ellipsis"
    //                   >
    //                     {org.name}
    //                   </a>
    //                 </div>
    //               </div>
    //             </Button>
    //           ) : (
    //             <Button
    //               onClick={(e) => redirectToSpace(e, link)}
    //               className={`bg-transparent hover:bg-zinc-800  last:mb-0 h-fit ${
    //                 activePage === link.label && classes.activeSpace
    //               }`}
    //             >
    //               <div className="flex items-center justify-center relative">
    //                 <div className={`${classes.mainLinkIcon}`}>
    //                 <link.icon className='text-zinc-800 dark:text-zinc-200' size={16} />
    //                 </div>
    //                 {link.notifications && (
    //                   <Badge className="border-0 top-0 right-0 size-1 px-2 text-[11px] h-4 flex justify-center absolute translate-y-[-85%] translate-x-[60%]">
    //                     {link.notifications}
    //                   </Badge>
    //                 )}
    //               </div>
    //             </Button>
    //         )}
    //       </React.Fragment>
    //       )})
    // );
    const renderLinks = (linksArray) => (
        linksArray.map((option, index) => {
      
          return (
            <React.Fragment key={index} >
              {openSidebarToggle ? (
                <Button
                  variant='ghost'
                  className={`${classes.mainLink} ${classes.active} m-0`}
                  data-theme={colorScheme}
                >
                  <div className="flex justify-between w-full items-center">
                    <div className="flex items-center">
                      <div className={`${classes.mainLinkIcon} ${classes.sidebarOpen}`}>
                        {option.icon && <option.icon className='text-zinc-800 dark:text-zinc-200' size={14} />}
                      </div>
                      <a
                        href='/#'
                        onClick={(e) => {
                          e.preventDefault();
                        //   navigate(`/org/${org.slug}`);
                        }}
                        className="text-sm dark:text-zinc-200 text-black/100 overflow-hidden w-[150px] whitespace-nowrap text-ellipsis"
                      >
                        {option.label}
                      </a>
                    </div>
                  </div>
                </Button>
              ) : (
                <Button
                  onClick={(e) => option.link && navigate(option.link)}
                  className={`bg-transparent hover:bg-zinc-800 h-auto ${
                    activePage === option.label && classes.activeSpace
                  }`}
                >
                  <div className="flex items-center justify-center relative">
                    <div className={`${classes.mainLinkIcon}`}>
                    <option.icon className='text-zinc-800 dark:text-zinc-200' size={14} />
                    </div>
                    {option.notifications && (
                      <Badge className="border-0 top-0 right-0 size-1 px-2 text-[11px] h-4 flex justify-center absolute translate-y-[-85%] translate-x-[60%]">
                        {option.notifications}
                      </Badge>
                    )}
                  </div>
                </Button>
            )}
          </React.Fragment>
          )})
    );

    return (
        <SidebarGroup>
            <SidebarGroupContent className="h-[calc(100%_-4rem)] flex flex-col justify-between">
                <SidebarMenu className='font-["Inter"]'>
                    {/* <SidebarHeader>Dashboard</SidebarHeader> */}
                    {/* <Separator className='bg-zinc-600/80 w-full h-[1px]' /> */}
                    {/* <SidebarGroupLabel>Organizations</SidebarGroupLabel> */}
                    <div className='flex gap-1 flex-col'>{renderLinks(links.top)}</div>
                    <Separator className='bg-zinc-600/80 w-full h-[1px]' />
                    
                    {/* <div className="my-2">{renderLinks(links.middle)}</div> */}
                </SidebarMenu>

        
                {/* {openSidebarToggle ?
                <div className="flex items-center gap-3 py-3 px-0 border-t border-zinc-600/80">
                    <UserAvatar 
                        userProfileDto={userProfileDto}
                        userProfilePicture={userProfilePicture}
                        multiplier={1.8}
                    />
                    <UnstyledButton
                    className={`${classes.mainLink} last:mb-0 ${classes.active}`} data-theme={colorScheme} >
                    <div className='flex justify-between w-full items-center'>
                        <div className='flex flex-col gap-2'>
                            <p className='font-["Inter"] text-sm dark:text-zinc-200 text-black/100 whitespace-nowrap'>
                                {userProfileDto?.fullName}
                            </p>
                            <p className='font-["Inter"] text-xs text-muted-foreground whitespace-nowrap'>
                                {userProfileDto?.fullName}
                            </p>
                        </div>
                    </div>
                </UnstyledButton>
                </div> :
                <div className="flex justify-center items-center gap-2 p-3 border-t border-zinc-700">
                    <UserAvatar 
                        userProfileDto={userProfileDto}
                        userProfilePicture={userProfilePicture}
                        multiplier={1.8}
                    />
                    
                </div>} */}
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default SidebarContent;