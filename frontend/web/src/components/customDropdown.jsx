import React from 'react';

import { DropdownMenu,DropdownMenuContent,DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const CustomDropdown = ({trigger,dropdown,w,side,align}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>

            <DropdownMenuContent style={{width: `${w}px`}} className={` cursor-pointer`} side={side} align={align} cursor='pointer'>
                {dropdown}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CustomDropdown;