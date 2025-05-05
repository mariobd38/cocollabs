
import { redirect, usePathname } from 'next/navigation'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building, Columns2, Home, Inbox, LucideIcon, MessageCircle, Users } from "lucide-react";
import Logo from "@/components/logo";
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import UserMenu from '@/components/userMenu';
import Coconut from '@/components/coconut';


type AppSidebarProps = {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    dbUser: User | null;
};

interface Link {
  icon: LucideIcon;
  label: string;
  redirect?: string;
  collapsible?: boolean;
  notifications?: number;
}

const links: {
  top: Link[];
  middle: Link[];
} = {
  top: [
    { icon: Home, label: 'Home', redirect: '/' },
    { icon: Inbox, label: 'Inbox' },
    { icon: MessageCircle, label: 'Chat' },
    { icon: Users, label: 'Developers', redirect: '/developers' },
  ],
  middle: [
    { icon: Building, label: 'Organizations', collapsible: true },
  ]
};

export function AppSidebar({ toggle, setToggle, dbUser }: AppSidebarProps) {
  const pathname = usePathname()
  const sidebarRef = React.useRef(null);
  const resizeHandleRef = React.useRef(null);
  const [openOrgSidebar, setOpenOrgSidebar] = React.useState<boolean>(false)


  const renderLinks = (linksArray: Link[]) => (
    linksArray.map((option, index:number) => {
  
    return (
        <React.Fragment key={index} >
            {toggle ? (
                option.collapsible ?
                (   <SidebarGroup className='py-0'>
                    <SidebarGroupLabel className='px-0 gap-1'>
                      Organizations
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                      {/* {allOrgs.map((org, index) => (
                        <SidebarMenu key={index}>
                          <SidebarMenuItem className='mr-2'>
                              <a href='/#' onClick={(e) => { e.preventDefault(); navigate(`/org/${org.slug}`) }} className='px-1 text-[13.5px] hover:text-blue-400 whitespace-nowrap overflow-hidden text-ellipsis'>
                                {org.name}
                              </a>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      ))} */}
                    </SidebarGroupContent>
                  </SidebarGroup>
                   )
                : <Button variant='ghost' className={`h-auto rounded px-3 py-1.5 flex items-center m-0 hover:bg-zinc-200/50 dark:hover:bg-sidebar-accent
                    ${pathname === option?.redirect && 'dark:bg-sidebar-accent bg-zinc-200/50' }`}
                    onClick={() => option.redirect && redirect(option.redirect)} >
                    <div className="flex justify-between w-full items-center">
                        <div className="flex items-center">
                            <div className='mr-3'>
                                {option.icon && <option.icon className='text-zinc-800 dark:text-zinc-200' size={14} />}
                            </div>
                            <a href='/#' onClick={(e) => { e.preventDefault(); //navigate(`/org/${org.slug}`);
                                }}
                                className="flex text-[13.5px] dark:text-zinc-200 text-black/100 overflow-hidden w-[150px] whitespace-nowrap text-ellipsis"
                            >
                                {option.label}
                            </a>
                        </div>
                    </div>
                </Button>
            ) : (
                <TooltipProvider>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                        <Button onClick={() =>option.redirect && redirect(option.redirect)}
                            className={`bg-transparent dark:hover:bg-zinc-800 h-auto hover:bg-zinc-200/50
                                ${pathname === option?.redirect && 'dark:bg-sidebar-accent bg-zinc-200/50' }`}
                        >
                            <div className="flex items-center justify-center relative">
                                <div>
                                    {option.icon && <option.icon className='text-zinc-800 dark:text-zinc-200' size={14} />}
                                    
                                </div>
                                {option.notifications && (
                                <Badge className="border-0 top-0 right-0 size-1 px-2 text-[11px] h-4 flex justify-center absolute translate-y-[-85%] translate-x-[60%]">
                                    {option.notifications}
                                </Badge>
                                )}
                            </div>
                        </Button>
                        </TooltipTrigger>
                        <TooltipContent side='right' sideOffset={5} className='text-xs'>
                            <p>{option.label}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </React.Fragment>
    )})
);
        

  return (
    <SidebarProvider toggle={toggle} setToggle={setToggle} width={230} >
      <Sidebar className='h-full dark:bg-zinc-900 py-3 bg-sidebar' ref={sidebarRef} >
        <SidebarHeader className='pb-2'>
          <div className="flex justify-center">
            <AnimatePresence mode="wait" >
              {toggle ? (
                <motion.div
                className="w-full px-2"
                key="logo"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                >
                  <div className="flex justify-between">
                    <Logo className="w-32" />
                    
                    <Button 
                    onClick={() => setToggle(!toggle)}
                    className={`bg-transparent dark:hover:bg-zinc-800 hover:bg-zinc-300 p-1.5 h-auto bg-zinc-200/50' }`}
                    >
                      <div className="flex items-center justify-center relative">
                        {<Columns2 className="text-zinc-800 dark:text-zinc-200" size={19}/>}
                      </div>
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                key="coconut"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                //onClick={() => navigate('/')}
                >
                    <Coconut className="size-5 cursor-pointer" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SidebarHeader>
          <SidebarContent>
              {/* <AppSidebarContent
                  allOrgs={appData.organizations}
                  openSidebarToggle={openSidebarToggle}
                  
              />
                */}
                <SidebarGroup>
                    <SidebarGroupContent className="h-[calc(100%_-4rem)] flex flex-col justify-between">
                        <SidebarMenu>
                            {/* <SidebarHeader>Dashboard</SidebarHeader> */}
                            {/* <Separator className='bg-zinc-600/80 w-full h-[1px]' /> */}
                            {/* <SidebarGroupLabel>Organizations</SidebarGroupLabel> */}


                            <div className='flex gap-1 flex-col'>{renderLinks(links.top)}</div>
                            <Separator className='bg-zinc-600/80 w-full h-[1px] my-2' />
                            <div className="flex gap-1 flex-col">{renderLinks(links.middle)}</div>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div
                  ref={resizeHandleRef}
                  className={`absolute top-0 bottom-0 -right-1 w-2 ${toggle ? 'cursor-w-resize' : 'cursor-e-resize'}
                  transition-all duration-700 ease-in-out dark:hover:bg-zinc-700 hover:bg-neutral-200 z-50`}
                  onClick={() => setToggle(!toggle)}
                />
          </SidebarContent>

          <SidebarFooter>
              {toggle ? 
              <div className='flex items-center rounded-lg dark:hover:bg-zinc-800 p-2'>
                  {/* <HomeNavbarUserMenu 
                      userProfileDto={profileInfo.profileDto}
                      userFullName={profileInfo.fullName}
                      storedUserInfo={storedUserInfo}
                      setStoredUserInfo={setStoredUserInfo}
                      setOpenProfileDialog={setOpenProfileDialog}
                  /> */}
                  <UserMenu 
                    trigger={
                      <div className='flex items-center'>
                        {dbUser?.profile_image_url && (
                          <Avatar>
                            <AvatarImage src={dbUser.profile_image_url} />
                            <AvatarFallback className='bg-teal-600 text-white'>{`${dbUser.first_name?.charAt(0) ?? ''}`}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col px-3">
                        <span className='whitespace-nowrap text-sm w-36 overflow-hidden text-ellipsis'>{dbUser?.full_name}</span>
                        <span className='whitespace-nowrap text-xs w-36 text-muted-foreground overflow-hidden text-ellipsis'>{dbUser?.email}</span>
                        </div>
                        </div>
                    }
                  />
                  {/* <div className="flex flex-col px-3">
                      <span className='whitespace-nowrap text-sm overflow-hidden text-ellipsis'>{dbUser?.full_name}</span>
                      <span className='whitespace-nowrap text-xs text-muted-foreground overflow-hidden text-ellipsis'>{dbUser?.email}</span>
                  </div> */}
              </div>
              // <></>
              :
              <div className="flex flex-col items-center gap-4">
                <Button onClick={() => setToggle(!toggle)}
                className={`bg-transparent dark:hover:bg-zinc-800 hover:bg-zinc-300 p-2 h-auto bg-zinc-200/50' }`} >
                  <div className="flex items-center justify-center relative">
                      <div>
                        {<Columns2 className="text-zinc-800 dark:text-zinc-200" size={17}/>}
                      </div>
                  </div>
                </Button>
                <UserMenu 
                trigger={
                  dbUser?.profile_image_url && (
                    <Avatar>
                      <AvatarImage src={dbUser.profile_image_url} />
                      <AvatarFallback className='bg-teal-600 text-white'>{`${dbUser.first_name?.charAt(0) ?? ''}`}</AvatarFallback>
                    </Avatar>
                  )
                }
                />
                {/* <UserButton /> */}
              {/* <HomeNavbarUserMenu 
                  userProfileDto={profileInfo.profileDto}
                  userFullName={profileInfo.fullName}
                  storedUserInfo={storedUserInfo}
                  setStoredUserInfo={setStoredUserInfo}
                  setOpenProfileDialog={setOpenProfileDialog}
              /> */}
              </div>
              }
          </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}