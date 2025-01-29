import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Flex,Box,Divider } from '@mantine/core';
import { Button } from "@/components/ui/button"

import Cropper from 'react-easy-crop';
import { getCroppedImage } from '@/utils/getCroppedImage';

import { DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog"


const ImageCropperContent = ({imageCropperProps, setOpen, profileProps}) => {
    const { imageToCrop, setImageToCrop,setCroppedFile } = imageCropperProps;
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
            const uniqueFileName = `image-${uuidv4()}.jpg`;
            const file = new File([blob], uniqueFileName, { type: "image/jpeg" });
            console.log(file);
            setCroppedFile(file);
            
            //TODO; save file to s3
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
        <Box ff='Geist' className='px-2'>
            <DialogHeader className='text-left gap-1'>
                <DialogTitle>Crop image</DialogTitle>
                <DialogDescription>
                    Adjust the size of the grid to crop your image
                </DialogDescription>
            </DialogHeader>
            {/* <Flex direction="column" className="w-full h-[450px]">
                <Box className='py-3'><Divider /></Box>
                <Flex align="center" justify="center" className="flex-grow"> */}
            <Flex direction="column" className="w-full h-full"> 
                <Box className='py-3'><Divider /></Box>
                <Flex align="center" justify="center" 
                className={`crop-container relative w-full flex-grow h-[280px] max-h-[280px] transition-opacity duration-300`}
                
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
            </Flex>

                <DialogFooter className='flex gap-2 pt-5'>
                    <Button onClick={handleClose} className="size-auto border border-white text-white px-3 bg-transparent" variant="default">Cancel</Button>
                    <Button onClick={handleApply} className="size-auto border border-white px-3 bg-white" variant="default">Apply</Button>
                </DialogFooter>
            </Flex>
        </Box>
    );
};

export default ImageCropperContent;