import { useState,Suspense,lazy } from 'react';

import { Separator } from '@/components/ui/separator';
import { Inbox,Square,Minus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import Logo2 from '@/components/Logo/logo2';
import HomeNavbarUserMenu from '@/components/Home/HomeNavbar/homeNavbarUserMenu';
import ProfileDialog from '@/components/profileDialog/profileDialog';
import CustomDialog from '@/components/customDialog';
// import SpaceCreationModal from '@/components/Home/SpaceCreationModal/spaceCreationModal';

import '@/styles/home/homeNavbar.css';


const HomeNavbar = (props) => {
    const {themeColors,colorScheme,setColorScheme,profileInfo,setOpenSidebarToggle,openSidebarToggle,storedUserInfo,setStoredUserInfo} = props;
    const handleOpenSidebarToggle = () => {
        setOpenSidebarToggle(!openSidebarToggle);
        if (openSidebarToggle) {
            document.body.classList.remove('active');
        } else {
            document.body.classList.add('active');
        }
    }

    const [dialogTrigger, setDialogTrigger] = useState(null);
    const [openProfileDialog, setOpenProfileDialog] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);
    // const [openImageCropper, setOpenImageCropper] = useState(false);

    return (
        <nav className="flex items-center w-full fixed h-14 top-0 z-20 border-b border-zinc-300 dark:border-zinc-700" style={{backgroundColor: themeColors.bg[2]}}>
            <div className='container px-4 w-full max-w-full' >
                <div className='flex justify-between h-full items-center place-items-center'>
                    <div className='flex items-center gap-6'>
                        <div className={`w-fit p-1.5 cursor-pointer rounded  ${colorScheme}`} onClick={handleOpenSidebarToggle}>
                            <Square className='text-zinc-800 dark:text-zinc-200' size={20} />
                            <div style={{left: `${openSidebarToggle ? 23 : 19}px`}} className={`top-[12px] absolute transition-all duration-200 ease-linear`}>
                                <Minus className='text-zinc-800 dark:text-zinc-200 rotate-90' width={21} height={31} />
                            </div>
                        </div>
                        <div className='items-center hidden sm:flex' >
                            <div className='w-32' >
                                <Logo2 strokeColor={colorScheme === 'dark' ? '#f4fff6' : '#323335'}/>
                            </div>
                        </div> 

                    </div>
                    
                    
                    <div className='flex items-center justify-end font-["Inter"] gap-5'>
                        {/* <div className='pr-3 md:pr-4'>
                            <Button size='auto' variant='ghost' className={`flex py-1 px-3 rounded-lg gap-32 border-solid border-[${searchBdColor}] navbar-search-button ${colorScheme} hover:all transition-all duration-300 ease-linear`} 
                            style={{border: `1px solid ${searchBdColor}`, backgroundColor: `${searchBgColor}`}} onClick={() => setOpenCommand((open) => !open)}>
                                <div className='flex text-[13px] text-muted-foreground kbd'>Search
                                    <div className='pl-1 hidden md:block'> anything</div>...
                                </div>

                                <div className='flex px-2 bg-gray-100 dark:bg-black gap-1 h-7 items-center rounded-md font-mono border dark:border-black border-gray-300' >
                                    <span className="text-[18px] kbd pt-0.5 text-muted-foreground">⌘</span>
                                    <p className='m-auto pt-[1px] text-muted-foreground kbd text-sm'>K</p>
                                </div>
                            </Button>
                        </div> */}
                        <div>

                        <Button className='h-4 px-2 bg-transparent dark:hover:bg-zinc-700/50 hover:bg-zinc-300 transition-all duration-300 linear'>
                            <Inbox className='text-zinc-800 dark:text-zinc-200' size={16} />
                        </Button>
                        </div>
                        {/* <Separator orientation='vertical' className='hidden sm:flex h-8 mx-3 bg-zinc-600' /> */}

                        <HomeNavbarUserMenu 
                            userProfileDto={profileInfo.profileDto}
                            userProfilePicture={profileInfo.picture}
                            userFullName={profileInfo.fullName}
                            storedUserInfo={storedUserInfo}
                            setStoredUserInfo={setStoredUserInfo}
                            setOpenProfileDialog={setOpenProfileDialog}
                        />
                        

                        <CustomDialog
                            trigger={dialogTrigger}
                            content={
                                <ProfileDialog 
                                    userProfileDto={profileInfo.profileDto}
                                    imageToCrop={imageToCrop}
                                    setImageToCrop={setImageToCrop}
                                    username={storedUserInfo?.user.username}
                                    // setOpenImageCropper={setOpenImageCropper}
                                />
                            }
                            open={openProfileDialog} 
                            setOpen={setOpenProfileDialog} 
                            width={500}
                        />

                        {/* <Suspense fallback={<LoadingFallback />}>
                            {imageToCrop &&
                            <CustomDialog
                                trigger={openImageCropper}
                                content={
                                    <ImageCropperContent 
                                    imageCropperProps={{ imageToCrop,setCroppedFile }}
                                    setOpen={setOpenImageCropper}
                                    profileProps={{ setPreviewUrl,setActiveProfile }}
                                    />
                                }
                                open={openImageCropper} 
                                setOpen={setOpenImageCropper} 
                                width={800}
                            />}
                        </Suspense> */}

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default HomeNavbar;