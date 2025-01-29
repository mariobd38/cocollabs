import React, { useRef,useState,useCallback,useEffect,lazy,Suspense } from "react";
 
import { Sidebar,SidebarContent,SidebarHeader } from "@/components/ui/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

import HomeSidebarContent from "./homeSidebarContent";
import HomeSidebarHeader from "./homeSidebarHeader";
import SpaceCreationModal from '@/components/Home/SpaceCreationModal/spaceCreationModal';

import '@/styles/home/homeSidebar.css';
const CustomDialog = lazy(() => import('@/components/customDialog'));
const LoadingFallback = () => <></>;

const HomeSidebarv2 = (props) => {
    const {openSidebarToggle, themeColors, colorScheme, setOpenSidebarToggle, spaceData,userFullName,activePage} = props;

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
    const [openIconPopover, setOpenIconPopover] = useState(false);

    useEffect(() => {
        return () => {
            document.body.style.pointerEvents = '';
        };
    }, [openSpaceCreateModal]);
        
    return (
        <>
            <SidebarProvider openSidebarToggle={openSidebarToggle} currentWidth={width}>
                <Sidebar className='top-[64.2px] h-full' ref={sidebarRef} >
                <SidebarHeader className='h-[55px]'>
                    {data && <HomeSidebarHeader 
                        data={data} 
                        openSidebarToggle={openSidebarToggle}
                        themeColors={themeColors}
                        colorScheme={colorScheme}
                        setOpenSpaceCreateModal={setOpenSpaceCreateModal}
                        setDialogTrigger={setDialogTrigger}
                    />}
                </SidebarHeader>
                    <SidebarContent >
                        <HomeSidebarContent
                            spaceSlug={spaceData.slug}
                            openSidebarToggle={openSidebarToggle}
                            themeColors={themeColors}
                            colorScheme={colorScheme}
                            activePage={activePage}
                        />
                        <div ref={resizeHandleRef} className={`resize-handle ${colorScheme}`} onMouseDown={startResize} />
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>

            
            <Suspense fallback={<LoadingFallback />}>
                <CustomDialog
                    trigger={dialogTrigger}
                    content={
                        <SpaceCreationModal 
                        openSpaceCreateModal={openSpaceCreateModal}
                        setOpenSpaceCreateModal={setOpenSpaceCreateModal}
                        userFullName={data.user.name}
                        colorScheme={colorScheme}
                        setOpenIconPopover={setOpenIconPopover}
                    />}
                    open={openSpaceCreateModal} 
                    setOpen={setOpenSpaceCreateModal} 
                    width={835}
                    openIconPopover={openIconPopover}
                />
            </Suspense>
            
        </>
    )
}

export default HomeSidebarv2;