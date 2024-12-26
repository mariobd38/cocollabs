import React, { useRef,useState,useCallback,useEffect } from "react";
 
import { Sidebar,SidebarContent,SidebarHeader } from "@/components/ui/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

import HomeSidebarContent from "./homeSidebarContent";
import HomeSidebarHeader from "./homeSidebarHeader";
import SpaceCreationModal from '@/components/Home/SpaceCreationModal/spaceCreationModal';
import CustomDialog from "@/components/customDialog";

import { Button } from "@/components/ui/button"
import { DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import '@/styles/home/homeSidebar.css';

const HomeSidebarv2 = ({openSidebarToggle, themeColors, colorScheme, setOpenSidebarToggle, spaceData,userFullName}) => {

    const sidebarRef = useRef(null);
    const [width, setWidth] = useState(210);

    const data = {
        user: {
            name: userFullName,
            email: "m@example.com",
        },
        space: spaceData,
        options: [
            {
                name: "Settings",
                plan: "Startup",
                icon: 'IconSettings'
            },
            {
                name: "Members",
                plan: "Free",
                icon: 'IconUsersGroup'
            },
        ]
    }

    const resizeHandleRef = useRef(null);
    const [isResizing, setIsResizing] = useState(false);

    // Configuration
    const MIN_WIDTH = 210;
    const MAX_WIDTH = 310;
    
    const handleMouseMove = useCallback((e) => {
        if (!isResizing) return;
    
        // Calculate new width
        const newWidth = e.clientX - (sidebarRef.current?.getBoundingClientRect().left || 0);
        
        // Constrain width
        const constrainedWidth = Math.max(MIN_WIDTH, Math.min(newWidth, MAX_WIDTH));
        
        setWidth(constrainedWidth);
        setOpenSidebarToggle(e.clientX > 150);
        // setIsExpanded(constrainedWidth > MIN_WIDTH);
      }, [isResizing,setOpenSidebarToggle, setWidth, sidebarRef]);

    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    // Add/remove event listeners for resizing
    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, handleMouseMove, handleMouseUp]);

    const startResize = (e) => {
        e.preventDefault();
        setIsResizing(true);
    };

    const [openSpaceCreateModal, setOpenSpaceCreateModal] = useState(false);
    const [dialogTrigger, setDialogTrigger] = useState(null);

    useEffect(() => {
        document.body.style.pointerEvents = !openSpaceCreateModal ? '' : 'none';

        return () => {
            document.body.style.pointerEvents = '';
        };
    }, [openSpaceCreateModal]);

    return (
        <>
            <SidebarProvider openSidebarToggle={openSidebarToggle} currentWidth={width}>
                <Sidebar className='top-[64.2px] h-full' ref={sidebarRef} >
                <SidebarHeader className='h-[55px]'>
                    <HomeSidebarHeader 
                        data={data} 
                        openSidebarToggle={openSidebarToggle}
                        themeColors={themeColors}
                        colorScheme={colorScheme}
                        setOpenSpaceCreateModal={setOpenSpaceCreateModal}
                        setDialogTrigger={setDialogTrigger}
                    />
                </SidebarHeader>
                    <SidebarContent >
                        <HomeSidebarContent 
                            openSidebarToggle={openSidebarToggle}
                            themeColors={themeColors}
                            colorScheme={colorScheme}
                        />
                        <div ref={resizeHandleRef} className={`resize-handle ${colorScheme}`} onMouseDown={startResize} />
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>

            {/* <SpaceCreationModal 
                openSpaceCreateModal={openSpaceCreateModal}
                setOpenSpaceCreateModal={setOpenSpaceCreateModal}
                userFullName={data.user.name}
                themeColors={themeColors}
                colorScheme={colorScheme}
            /> */}
            <CustomDialog 
                trigger={dialogTrigger}
                content={<><DialogHeader>
                    <DialogTitle>Create space</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                defaultValue="Pedro Duarte"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="slug" className="text-right">
                                Slug
                            </Label>
                            <Input
                                id="slug"
                                defaultValue="Pedro Duarte"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                            Username
                            </Label>
                            <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Create space</Button>
                    </DialogFooter></>}
                open={openSpaceCreateModal} 
                setOpen={setOpenSpaceCreateModal} 
            />
            
        </>
    )
}

export default HomeSidebarv2;