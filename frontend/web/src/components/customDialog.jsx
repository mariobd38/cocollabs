import React from 'react';

import { Dialog,DialogContent,DialogTrigger } from "@/components/ui/dialog"

const CustomDialog = ({trigger,content, open, setOpen}) => {
 
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            {open && (
                <DialogContent
                    setOpen={setOpen}
                    className="sm:max-w-[425px]"
                    onEscapeKeyDown={() => setOpen(false)}
                    onPointerDownOutside={() => setOpen(false)}
                >
                    {content}
                </DialogContent>
            )}
        </Dialog>
    );
};

export default CustomDialog;