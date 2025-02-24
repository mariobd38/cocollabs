import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { Button } from '@/components/ui/button';

import CustomCommand from '@/components/customCommand';


interface HomeHeaderProps {
    firstName: string;
    colorScheme: string;
}

const getGreeting = (): string => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    if (hours < 21) return "Good evening";
    return "Good night";
  };

const HomeHeader: React.FC<HomeHeaderProps> = ({ firstName,colorScheme }) => {
    const now = dayjs();
    const date = new Date(now.year(), now.month(), now.date());
    const month = date.toLocaleString("default", { month: "long" });
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

    // document.body.style.overflowY = "hidden";

    const [openCommand, setOpenCommand] = useState<boolean>(false);
    const searchBgColor = colorScheme === 'dark' ? '#262729' : '#f6f7f9';
    const searchBdColor = colorScheme === 'dark' ? '#323335' : '#dee2e6';

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
          if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            setOpenCommand((open: boolean) => !open)
          }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
      }, [])

    return (
        <>
            <div className="flex justify-between items-center py-7">
                <div className="flex flex-col gap-1 font-['Inter']">
                    <h1 className="text-lg">
                        {getGreeting()}, {firstName}
                    </h1>
                    <p className="text-muted-foreground text-xs">
                        {dayOfWeek}, {month} {date.getDate()}, {date.getFullYear()}
                    </p>
                </div>

                <Button variant='ghost' className={`flex py-1 size-auto px-3 rounded-lg gap-24 border-solid border-[${searchBdColor}] navbar-search-button ${colorScheme} hover:all transition-all duration-300 ease-linear`} 
                style={{border: `1px solid ${searchBdColor}`, backgroundColor: `${searchBgColor}`}} onClick={() => setOpenCommand((open: boolean) => !open)}>
                    <div className='flex text-[13px] text-muted-foreground kbd'>Search
                        <div className='pl-1 hidden md:block'> anything</div>...
                    </div>

                    <div className='flex px-2 bg-gray-100 dark:bg-black gap-1 h-7 items-center rounded-md font-mono border dark:border-black border-gray-300' >
                        <span className="text-[18px] kbd pt-0.5 text-muted-foreground">⌘</span>
                        <p className='m-auto pt-[1px] text-muted-foreground kbd text-sm'>K</p>
                    </div>
                </Button>
                {/* <Button variant='ghost' className='flex justify-between w-56' onClick={() => setOpenCommand((open) => !open)}>
                    <div className='flex text-[13px] text-muted-foreground kbd'>Search
                        <div className='pl-1 hidden md:block'> anything</div>...
                    </div>
                    

                    <div className='flex px-2 bg-gray-100 dark:bg-black gap-1 h-7 items-center rounded-md font-mono border dark:border-black border-gray-300' >
                        <span className="text-[18px] kbd pt-0.5 text-muted-foreground">⌘</span>
                        <p className='m-auto pt-[1px] text-muted-foreground kbd text-sm'>K</p>
                    </div>
                </Button> */}
            </div>
            <CustomCommand 
                open={openCommand}
                setOpen={setOpenCommand}
            />

        </>
    );
};

export default HomeHeader;