import React, { useState } from 'react';

import { DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog"
// import { Divider } from '@mantine/core';
import { Button } from "@/components/ui/button"
import { Divider } from "@/components/ui/divider";

import Cropper from 'react-easy-crop';
import { getCroppedImage } from '@/utils/getCroppedImage';

const ImageCropperContent = ({imageCropperProps, setOpen, profileProps}) => {
    const { imageToCrop,setCroppedFile } = imageCropperProps;
    const { setPreviewUrl,setActiveProfile } = profileProps;
//     const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1); 
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1);
    const [isClosing, setIsClosing] = useState(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setOpen(false);
        }, 100);
    };

    const handleApply = async () => {
        if (!imageToCrop || !croppedAreaPixels) return;
        
        try {
            const croppedImage = await getCroppedImage(imageToCrop, croppedAreaPixels);
            
            // Convert to Blob (optional: for uploading)
            const blob = await fetch(croppedImage).then(res => res.blob());
            
            // Do something with the cropped image (upload, store, etc.)
            const file = new File([blob], "", { type: "image/jpeg" });
            setCroppedFile(file);
            
            // setPreviewUrl(file);
            const preview = URL.createObjectURL(file);
            setActiveProfile(null);
            setPreviewUrl(preview);
            handleClose();

        } catch (error) {
            console.error("Error cropping image:", error);
        }
    };


    
    return (
        <div className='px-2 font-["Geist"]'>
            <DialogHeader className='text-left gap-1'>
                <DialogTitle>Crop image</DialogTitle>
                <DialogDescription>
                    Adjust the size of the grid to crop your image
                </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col w-full h-full"> 
                {/* <div className='py-3'><Divider /></div> */}
                <div className='py-4'>
                    <Divider theme='dark' />
                </div>
                <div
                className={`flex justify-center items-center crop-container relative w-full flex-grow h-[280px] max-h-[280px] transition-opacity duration-300`}
                >
                    {!isClosing && <Cropper
                        image={imageToCrop}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />}
                </div>

                <DialogFooter className='flex gap-2 pt-5'>
                    <Button onClick={handleClose} className="size-auto border border-white text-white px-4 bg-transparent hover:bg-zinc-800/50" variant="default">Cancel</Button>
                    <Button onClick={handleApply} className="size-auto border border-white px-4 bg-white hover:bg-white/80" variant="default">Apply</Button>
                </DialogFooter>
            </div>
        </div>
    );
};

export default ImageCropperContent;