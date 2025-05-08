import { redirect, usePathname } from 'next/navigation'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarMenuButton, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Columns2, LayoutDashboard, LucideIcon, MessageCircle, Blocks, ChartColumnIncreasing, Code } from "lucide-react";
import Logo from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserMenu from '@/components/userMenu';
import Coconut from '@/components/coconut';
import Link from 'next/link';
import { useDbUser } from '@/app/contexts/userContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


type AppSidebarProps = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

interface Link {
  icon: LucideIcon;
  label: string;
  redirect?: string;
  collapsible?: boolean;
  notifications?: number;
}


export function AppSidebar({ toggle, setToggle }: AppSidebarProps) {
  const pathname = usePathname()
  const sidebarRef = React.useRef(null);
  const resizeHandleRef = React.useRef(null);
  const { dbUser } = useDbUser();


  const items = [
    {
      title: "Home",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Chat",
      url: "/chat",
      icon: MessageCircle,
    },
    {
      title: "Repositories",
      url: "/repositories",
      icon: Code,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: ChartColumnIncreasing,
    },
    {
      title: "Integrations",
      url: "/integrations",
      icon: Blocks,
    },
  ]
        

  return (
    <SidebarProvider toggle={toggle} setToggle={setToggle} width={230} >
      <Sidebar className={`h-full dark:bg-zinc-900 ${toggle ? 'py-2' : 'py-3'} bg-sidebar`} ref={sidebarRef} >
        <SidebarHeader className='pb-2'>
          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              {toggle ? (
                <motion.div
                key="sidebar-expanded"
                className="w-full px-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                >
                  <div className="flex justify-between">
                    <Logo className="w-32" />
                    <Button
                    onClick={() => setToggle(!toggle)}
                    className="bg-transparent dark:hover:bg-zinc-800 hover:bg-zinc-300 p-1.5 h-auto"
                    >
                      <div className="flex items-center justify-center relative">
                        <Columns2 className="text-zinc-800 dark:text-zinc-200 size-4" />
                      </div>
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                key="sidebar-collapsed"
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                >
                  <Coconut className="size-5 cursor-pointer" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {items.map((item) => (
                toggle ? (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <TooltipProvider key={item.title}>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link href={item.url}>
                              <item.icon />
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </TooltipTrigger>
                      <TooltipContent side='right' sideOffset={5} className='text-xs'>
                        <p>{item.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              ))}
            </SidebarMenu>
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
              <UserMenu 
                trigger={
                  <div className='flex items-center'>
                    <Avatar>
                      <AvatarImage src={dbUser?.profile_image_url} />
                      <AvatarFallback className='bg-teal-600 text-white'>{`${dbUser?.first_name?.charAt(0) ?? ''}`}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col px-3">
                      <span className='whitespace-nowrap text-sm w-36 overflow-hidden text-ellipsis'>{dbUser?.full_name}</span>
                      <span className='whitespace-nowrap text-xs w-36 text-muted-foreground overflow-hidden text-ellipsis'>{dbUser?.email}</span>
                    </div>
                  </div>
                }
              />
            </div>
          :
            <div className="flex flex-col items-center gap-4">
              <Button onClick={() => setToggle(!toggle)}
              className={`bg-transparent dark:hover:bg-zinc-800 hover:bg-zinc-300 p-2 h-auto bg-zinc-200/50' }`} >
                <div className="flex items-center justify-center relative">
                  <Columns2 className="text-zinc-800 dark:text-zinc-200" />
                </div>
              </Button>
              <UserMenu 
              trigger={
                <Avatar className='w-7 h-7'>
                  <AvatarImage src={dbUser?.profile_image_url} />
                  <AvatarFallback className='bg-teal-600 text-white'>{`${dbUser?.first_name?.charAt(0) ?? ''}`}</AvatarFallback>
                </Avatar>
              }
              />
            </div>
          }
        </SidebarFooter>

      </Sidebar>
    </SidebarProvider>
  );
}