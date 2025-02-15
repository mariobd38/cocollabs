import React from 'react';
import dayjs from 'dayjs';

import { Button } from '@mantine/core';
import { Icons } from '@/components/icons/icons';


interface HomeHeaderProps {
    spaceName: string;
    themeColors: { text: string[] };
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ spaceName, themeColors }) => {
    const now = dayjs();
    const date = new Date(now.year(), now.month(), now.date());
    const month = date.toLocaleString("default", { month: "long" });
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

    document.body.style.overflowY = "hidden";

    return (
        <div className="flex justify-between items-center py-7">
            <div className="flex flex-col gap-1 font-['Inter']">
                <div className="flex items-center gap-2.5">
                    <div className="flex justify-center items-center">
                        {Icons("IconHome", 20, 20, themeColors.text[3])}
                    </div>
                    <p className="font-semibold text-lg">{spaceName}</p>
                </div>
                <p className="text-muted-foreground text-[12px]">
                    {dayOfWeek}, {month} {date.getDate()}, {date.getFullYear()}
                </p>
            </div>

            <div>
                <Button
                    className="px-3 rounded-lg bg-transparent border border-black/30 dark:border-zinc-200 transition-all duration-100 ease-linear hover:bg-white/5"
                >
                    <div className="flex items-center">
                        {/* <div className="mr-2">{Icons("IconFidgetSpinner", 18, 18, "#e0e0e0")}</div> */}
                        <span className='text-black/70 dark:text-zinc-200'>Customize</span>
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default HomeHeader;