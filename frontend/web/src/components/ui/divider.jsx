import React from 'react';

const Divider = ({text,theme}) => {
    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className={`w-full border-t ${theme === 'light' ? '' : 'border-[#424345]'}`}></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground text-neutral-400">{text}</span>
            </div>
        </div>

    );
};

export { Divider};