import React from 'react';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";

import NextUICalendar from '@/components/models/NextUICalendar/nextUICalendar';

import './newHomeDueDatePopover.css';

const NewHomeDueDatePopover = (props) => {

    const {popoverTarget, currentTaskDueDate, setCurrentTaskDueDate, currentTaskDueDateTime, setCurrentTaskDueDateTime,
        currentIndex,taskType,setTaskType,handleTaskUpdateNew,popoverId,openPopoverId,setOpenPopoverId,enableScroll,disableScroll,
        colorScheme} = props;

    dayjs.extend(customParseFormat);
    const dateFormatList = ['YYYY-MM-DD', 'M-D-YY', 'M-D-YYYY', 'MM-DD-YY', 'MM-DD-YYYY'];
    const dropdownColor = colorScheme==='dark' ? '#232426' : '#fafafa';

    const content = (
        <NextUICalendar 
            selectedDate={currentTaskDueDate}
            setSelectedDate={setCurrentTaskDueDate}
            selectedDateTime={currentTaskDueDateTime}
            setSelectedDateTime={setCurrentTaskDueDateTime}
            handleTaskUpdateNew={handleTaskUpdateNew}
            taskType={taskType}
            currentIndex={currentIndex}
            setTaskType={setTaskType}
            dropdownColor={dropdownColor}
            colorScheme={colorScheme}
        />
    );

    const handleOpenChange = (isOpen) => {
        if (isOpen) {
            setOpenPopoverId(popoverId);
            disableScroll();
        } else {
            setOpenPopoverId(null);
            enableScroll();
        }
    };
    
    return (
        <div>
            <Popover 
                placement="bottom" 
                isOpen={openPopoverId === popoverId}
                onOpenChange={handleOpenChange}
            >
                <PopoverTrigger className='h-100 due-date-popover-trigger'>
                    <div onClick={() => setOpenPopoverId(popoverId)}>
                        {popoverTarget}
                    </div>
                </PopoverTrigger>
                <PopoverContent className='p-0 bg-transparent'>
                    {content}
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default NewHomeDueDatePopover;