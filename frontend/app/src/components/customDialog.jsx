import React from 'react';

import { Dialog,DialogContent,DialogTrigger } from "@/components/ui/dialog"


const CustomDialog = ({trigger,content, open, setOpen, width,openIconPopover}) => {
 
    return (
        <Dialog open={open} >
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent
                setOpen={setOpen}
                className={`sm:max-w-[${width}px]`}
                onEscapeKeyDown={() => setOpen(false)}
                // onPointerDownOutside={() => setOpen(false)}
                openIconPopover={openIconPopover}
            >
                {content}
            </DialogContent>
            
        </Dialog>
    );
};

export default CustomDialog;