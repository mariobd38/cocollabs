import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Columns2 } from "lucide-react";
import Logo from "@/components/logo";
import { UserButton } from "@clerk/nextjs";


type AppSidebarProps = {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AppSidebar({ toggle, setToggle }: AppSidebarProps) {
  const sidebarRef = React.useRef(null);
  const resizeHandleRef = React.useRef(null);
  const [openOrgSidebar, setOpenOrgSidebar] = React.useState<boolean>(false)
        

  return (
    <SidebarProvider toggle={toggle} setToggle={setToggle} width={230} >
      <Sidebar className='h-full dark:bg-zinc-900 bg-white' ref={sidebarRef} >
        <SidebarHeader className={`${toggle ? 'pb-2' : 'pb-4'}`}>
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
                    onClick={() => setToggle(!open)}
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
                    {/* <Coconut className="size-5 cursor-pointer" /> */}
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
                <div
                  ref={resizeHandleRef}
                  className={`absolute top-0 bottom-0 -right-1 w-2 ${toggle ? 'cursor-w-resize' : 'cursor-e-resize'}
                  transition-all duration-700 ease-in-out dark:hover:bg-zinc-700 hover:bg-neutral-300 z-50`}
                  onClick={() => setToggle(!toggle)}
                />
          </SidebarContent>

          <SidebarFooter>
              {toggle ? 
              // <div className='flex items-center rounded-lg dark:hover:bg-zinc-800 p-2'>
              //     <HomeNavbarUserMenu 
              //         userProfileDto={profileInfo.profileDto}
              //         userFullName={profileInfo.fullName}
              //         storedUserInfo={storedUserInfo}
              //         setStoredUserInfo={setStoredUserInfo}
              //         setOpenProfileDialog={setOpenProfileDialog}
              //     />
              //     <div className="flex flex-col px-3">
              //         <span className='whitespace-nowrap text-sm overflow-hidden text-ellipsis'>{profileInfo?.profileDto?.fullName}</span>
              //         <span className='whitespace-nowrap text-xs text-muted-foreground overflow-hidden text-ellipsis'>{profileInfo?.email}</span>
              //     </div>
              // </div>
              <></>
              :
              <div className="flex flex-col items-center gap-4">
                <Button onClick={() => setToggle(!open)}
                className={`bg-transparent dark:hover:bg-zinc-800 hover:bg-zinc-300 p-2 h-auto bg-zinc-200/50' }`} >
                  <div className="flex items-center justify-center relative">
                      <div>
                        {<Columns2 className="text-zinc-800 dark:text-zinc-200" size={17}/>}
                      </div>
                  </div>
                </Button>
                <UserButton />
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