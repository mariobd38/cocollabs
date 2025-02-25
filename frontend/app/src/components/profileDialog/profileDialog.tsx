import { useEffect, lazy, Suspense, useState } from 'react';
import { useForm } from "react-hook-form";


import { getAllProfilesInfo } from '@/api/profiles/getAllProfiles';

import UserAvatar from '@/components/Home/UserAvatar/userAvatar';

import { profileSchema } from '@/utils/schemas/profileSchema';

// import linkedin from '@/assets/logos/linkedin.png';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover"


// import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod';

import { getAvatars } from '@/utils/getProfileAvatarList';
const avatarList = getAvatars();

const LoadingFallback = () => <></>;
const CustomDialog = lazy(() => import('@/components/customDialog'));
const ImageCropperContent = lazy(() => import('@/components/imageCropperContent'));



interface Profile {
    firstName: string;
    lastName: string;
    fullName: string;
    type: string;
    svg: string;
    preSignedUrl: string;
}

interface ProfileDialogProps {
    userProfileDto: any;
    imageToCrop: any;
    setImageToCrop: React.Dispatch<React.SetStateAction<any>>;
    username: string;
    // setOpenImageCropper: React.Dispatch<React.SetStateAction<boolean>>;
}


const ProfileDialog: React.FC<ProfileDialogProps> = ({userProfileDto, imageToCrop, setImageToCrop,username}) => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [visible, setVisible] = useState(false);
    // const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [croppedFile, setCroppedFile] = useState<File | null>(null);
    const [openImageCropper, setOpenImageCropper] = useState<boolean>(false);
    const [isAvatarPopoverOpen, setIsAvatarPopoverOpen] = useState(false);
    const [activeProfile, setActiveProfile] = useState<any | null>(userProfileDto);

    const [align, setAlign] = useState<"start" | "center" | "end">("center");

    useEffect(() => {
        const handleResize = () => {
        setAlign(window.innerWidth < 640 ? "center" : "start"); // `sm` breakpoint is 640px
        };

        handleResize(); // Call once to set initial state
        window.addEventListener("resize", handleResize);
        
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const form = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: userProfileDto.fullName,
            username: username,
            avatar: null,
            picture: null,
            image: null,
        },
    });
    const imageRef = form.register("image");

    const onSubmit = async (data:any) => {
        // try {
        //     const response = await handleProfileCreation({
        //         fullName: form.getValues('fullName'),
        //         username: form.getValues('username'),
        //         avatarName: form.getValues('avatar'),
        //     }, form,croppedFile);
        //     if (response && response.status === 200) {
        //         setStepNum(stepNum + 1);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    return (
        
        <div className='py-2'>
            <h2 className='text-lg'>Edit profile</h2>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="flex flex-col sm:flex-row justify-between gap-5 sm:gap-16 py-8">
                    <div className='flex justify-center sm:justify-start'>
                        <div className={`flex items-center justify-center relative w-28 w-28 sm:h-36 sm:w-36 bg-transparent cursor-pointer border
                            transition-all duration-500 linear hover:border-zinc-700 border-zinc-300 dark:hover:border-zinc-100 dark:border-zinc-700 rounded-full`}>
                            <Popover open={isAvatarPopoverOpen} onOpenChange={setIsAvatarPopoverOpen}>
                                <PopoverTrigger asChild >
                                    <div>
                                        <UserAvatar 
                                            userProfileDto={activeProfile}
                                            multiplier={8}
                                            initials={userProfileDto?.fullName?.split(' ').map((n: string) => n[0]).join('')}
                                        />
                                    </div>
                                </PopoverTrigger>
                                {/* onClose={() => setIsAvatarPopoverOpen(false)} */}
                                <PopoverContent className="absolute -translate-x-1/2 sm:translate-x-0 w-[300px] sm:w-[334px] bg-background" side="bottom" align={align}>
                                    <div className="grid gap-4">
                                        <div className="space-y-2 grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="avatar"
                                                render={({ field: { onChange } }) => (
                                                    <FormItem>
                                                        <div className='flex items-center pb-2.5'>
                                                            <FormLabel className='text-zinc-700 dark:text-zinc-200'>Avatar</FormLabel>
                                                        </div>

                                                        <div className='flex flex-wrap gap-[10px]'>
                                                            {avatarList.map((item, index) => (
                                                                <img 
                                                                    onClick={async () => {
                                                                        try {
                                                                            setActiveProfile(item);
                                                                            onChange(item.name);
                                                                            setPreviewUrl(null);
                                                                            form.setValue('image', null);
                                                                            setCroppedFile(null);
                                                                        } catch (error) {
                                                                            console.error("Error fetching SVG content:", error);
                                                                        }
                                                                    }} 
                                                                    key={index} 
                                                                    src={item.svg} 
                                                                    alt="avatar" 
                                                                    className={`cursor-pointer w-8 h-8 rounded-full border-solid border-[1.5px]  
                                                                        ${activeProfile?.svg === item.svg ? 'border-white' : 'border-transparent'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="image"
                                                render={({ field: { value, onChange, ...fieldProps } }) => (
                                                    <FormItem>
                                                        <FormLabel className='text-zinc-700 dark:text-zinc-200'>Picture</FormLabel>

                                                        <FormControl>
                                                            <Input
                                                                {...fieldProps}
                                                                {...imageRef}
                                                                placeholder="Picture"
                                                                type="file"
                                                                accept="image/*"
                                                                className='cursor-pointer h-9 py-1.5 text-muted-foreground'
                                                                onChange={(event) => {
                                                                    const file = event.target.files?.[0];
                                                                    onChange(file);

                                                                    if (file) {
                                                                        const imageUrl = URL.createObjectURL(file);
                                                                        setIsAvatarPopoverOpen(false);
                                                                        setImageToCrop(imageUrl);
                                                                        setTimeout(() => { setOpenImageCropper(true); },50);
                                                                    }
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div className='flex flex-col w-full sm:w-72'>
                        <div className='flex flex-col gap-3'>
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className='text-zinc-700 dark:text-zinc-200'>Full name</FormLabel>
                                        <Input
                                            autoComplete="off"
                                            placeholder="John Doe"
                                            className='h-9 pb-2 px-2.5 placeholder:text-muted-foreground text-zinc-700 dark:text-zinc-200'
                                            {...field} 
                                        />
                                        <FormMessage className='py-0 text-red-700 text-[13px]'/>
                                    </FormItem>
                                    
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className='text-zinc-700 dark:text-zinc-200'>Username</FormLabel>
                                        <Input
                                            autoComplete="off"
                                            placeholder="johndoe123"
                                            className='h-9 px-2.5 placeholder:text-muted-foreground text-zinc-700 dark:text-zinc-200'
                                            {...field}
                                        />
                                        <FormMessage className='py-0 text-red-700 text-[13px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex gap-3 sm:justify-end'>
                    <Button type="submit" className='px-5 w-full sm:w-fit h-5 bg-zinc-100 text-zinc-800 hover:bg-white/80 transition-all duration-300'>Save changes</Button>
                </div>
            </form>
        </Form>

        <Suspense fallback={<LoadingFallback />}>
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
        </Suspense>
        
            
        </div>
    );
};

export default ProfileDialog;
