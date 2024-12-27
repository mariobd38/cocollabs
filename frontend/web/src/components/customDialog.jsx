import React from 'react';

import { Dialog,DialogContent,DialogTrigger } from "@/components/ui/dialog"

const CustomDialog = ({trigger,content, open, setOpen, width}) => {
 
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent
                setOpen={setOpen}
                className={`sm:max-w-[${width}px]`}
                onEscapeKeyDown={() => setOpen(false)}
                onPointerDownOutside={() => setOpen(false)}
            >
                {content}
            </DialogContent>
            
        </Dialog>
    );
};

export default CustomDialog;