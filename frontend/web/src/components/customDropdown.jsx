import React from 'react';

import { DropdownMenu,DropdownMenuContent,DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const CustomDropdown = ({trigger,dropdown,w,side,align}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>

            <DropdownMenuContent style={{width: `${w}px`, animationDuration: '200ms !important', animationName: 'enter'}} className={`cursor-pointer !duration-200 shadcn-dropdown`} side={side} align={align}>
                {dropdown}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CustomDropdown;