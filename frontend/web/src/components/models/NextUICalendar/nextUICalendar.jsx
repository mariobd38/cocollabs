import React, { useState, useRef } from 'react';

import dayjs from 'dayjs';
import { parseDate } from '@internationalized/date';

import { Calendar } from "@nextui-org/react";
import { Box,Flex,Select,Button } from '@mantine/core';
import { DatePicker as AntDatePicker }  from 'antd';

import { Icons } from '@/components/icons/icons';

import './nextUICalendar.css';

const generateTimeIntervals = () => {
    const times = [];
    let start = 0;
    
    for (let i = 0; i < 48; i++) { // 48 intervals in a day (30 minutes each)
        const hours = Math.floor(start / 60);
        const minutes = start % 60;
  
        const formattedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes === 0 ? '00' : minutes} ${hours < 12 ? 'AM' : 'PM'}`;
        times.push(formattedTime);
    
        start += 30; // increment by 30 minutes
    }
    return times;
  };

const NextUICalendar = (props) => {
    const { selectedDate, setSelectedDate,selectedDateTime, setSelectedDateTime,handleTaskUpdateNew,taskType,currentIndex,setTaskType,
        dropdownColor, colorScheme } = props;

    const timeOptions = generateTimeIntervals().map((time) => ({ value: time, label: time }));

    const [open, setOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    // console.log(dayjs(selectedDate));
    // console.log(selectedDateTime);
    const dayjsParser = (date, time = undefined, inc = 0) => {
        let parsedDate = dayjs(date)
            .set('year', dayjs(date).year())
            .set('month', dayjs(date).month())
            .set('date', dayjs(date).date() + inc);
            
        if (time) {
            parsedDate = parsedDate
            .set('hour', dayjs(time).isValid() ? dayjs(time).hour() : time.hour)
            .set('minute', dayjs(time).isValid() ? dayjs(time).minute() : time.minute);
        } else {
            parsedDate = parsedDate.endOf('day').toDate()
                // .set('hour', 23)
                // .set('minute', 59);
        }
    
        return parsedDate;
    };
    // console.log(selectedDate);
    const handleSelectedDateChange = (date, isFromCalendar) => {
        if (date === null) {
            setSelectedDate(undefined);
            setSelectedDateTime(undefined);
            setTimeout(() => {
                handleTaskUpdateNew && handleTaskUpdateNew(taskType[currentIndex], null, "due date", taskType, setTaskType);
            }, 100);
            handleTaskUpdateNew && handleTaskUpdateNew(taskType[currentIndex], null, "due date time", taskType, setTaskType);

        } else {
            const inc = isFromCalendar ? 1 : 0;
            let updatedDate = dayjsParser(date, selectedDateTime, inc);
            setSelectedDate(updatedDate);

            setTimeout(() => {
                handleTaskUpdateNew && handleTaskUpdateNew(taskType[currentIndex], updatedDate, "due date", taskType, setTaskType);
            }, 100);

            if (selectedDateTime) {
                setSelectedDateTime(updatedDate);
                handleTaskUpdateNew && handleTaskUpdateNew(taskType[currentIndex], updatedDate, "due date time", taskType, setTaskType);
            }
        }
        setDatePicker(undefined);
    };

    const normalizeText = (text) => {
        return text
            .toLowerCase() // Convert to lowercase
            .replace(/\s+/g, '') // Remove all spaces
            .replace(/[^\w]/g, ''); // Remove all non-alphanumeric characters (punctuation, etc.)
    };
      
    const optionsFilter = ({ options, search }) => {
        const normalizedSearch = normalizeText(search);
      
        return options.filter((option) => {
            const normalizedLabel = normalizeText(option.label);
            return normalizedLabel.includes(normalizedSearch);
        });
    };

    const debounce = (func, delay) => {
        let debounceTimer;
        return (...args) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, args), delay);
        };
    };
    

    const handleDateTimeChange = debounce((time) => {
        if (time !== null) {
            const [timePart, period] = time.split(' ');
            const [hour, minute] = timePart.split(':');
            let parsedHour = parseInt(hour, 10);
    
            // Adjust hour for AM/PM
            if (period.toLowerCase() === 'pm' && parsedHour < 12) {
                parsedHour += 12;
            } else if (period.toLowerCase() === 'am' && parsedHour === 12) {
                parsedHour = 0;
            }
    
            const updatedDateTime = dayjsParser(selectedDate, {
                hour: parsedHour,
                minute: parseInt(minute, 10),
            });
    
            setSelectedDateTime(updatedDateTime);
            setTimeout(() => {
                handleTaskUpdateNew && handleTaskUpdateNew(taskType[currentIndex], updatedDateTime, "due date time", taskType, setTaskType);
            }, 100); 

        } else {
            setSelectedDateTime(undefined);
            setSelectedDate(dayjsParser(selectedDate));
            setTimeout(() => {
                handleTaskUpdateNew && handleTaskUpdateNew(taskType[currentIndex], null, "due date time", taskType, setTaskType);
            }, 100);   
            setTimeout(() => {
                handleTaskUpdateNew && handleTaskUpdateNew(taskType[currentIndex], dayjsParser(selectedDate), "due date", taskType, setTaskType);
            }, 100);           
        }
    }, 50);

    const selectRef = useRef(null);

    const handleDropdownOpen = () => {
        setTimeout(() => {
            const calendarParents = document.querySelectorAll('.nextui-calendar-parent');
            
            calendarParents.forEach(calendarParent => {
                const dropdown = calendarParent.querySelector('.mantine-Select-dropdown');
                if (!dropdown) return;
    
                const options = dropdown.querySelectorAll('.mantine-Select-option');
                if (options.length === 0) return;
    
                const [hours, minutes] = [dayjs().hour(), dayjs().minute()].map(Number);
                const totalMinutes = hours * 60 + minutes;
                let intervalNumber = Math.floor(totalMinutes / 30);
                const index = Math.min(intervalNumber + 4, 47);
    
                options[index].scrollIntoView({ behavior: 'auto', block: 'center' });
            });
        }, 0);
    };

    const [datePicker, setDatePicker] = useState(undefined);

    const datePickerEnter = (e) => {
        setIsTyping(true);
        if (e.key === 'Enter') {
            const inputValue = e.target.value;
            const parsedDate = dayjs(inputValue, 'M/D/YYYY');
            
            if (parsedDate.isValid()) {
                let updatedDate = dayjsParser(parsedDate, selectedDateTime);
    
                if (selectedDateTime) {
                    setSelectedDateTime(updatedDate);

                    setTimeout(() => {
                        handleTaskUpdateNew && handleTaskUpdateNew(taskType[currentIndex], updatedDate, "due date time", taskType, setTaskType);
                    }, 100); 
                }
        
                setSelectedDate(updatedDate);
                setDatePicker(parsedDate);
                setIsTyping(false);

                setTimeout(() => {
                    handleTaskUpdateNew && handleTaskUpdateNew(taskType[currentIndex], updatedDate, "due date", taskType, setTaskType);
                }, 100); 
            } else {
                console.error('Invalid date format');
            }
        }
    };

    const handlePresetOptions = (inc) => {
        const newDate = dayjsParser(dayjs(), selectedDateTime, inc);
        setSelectedDate(newDate);
        setTimeout(() => {
            handleTaskUpdateNew && handleTaskUpdateNew(taskType[currentIndex], newDate, "due date", taskType, setTaskType);
        }, 100); 
        if (selectedDateTime) {
            setSelectedDateTime(dayjsParser(dayjs(), selectedDateTime, inc));
            handleTaskUpdateNew && handleTaskUpdateNew(taskType[currentIndex], newDate, "due date time", taskType, setTaskType);
        }
        setDatePicker(undefined);
    }

    const presetOptions = [
        {name: 'Today', handler: () => handlePresetOptions(0)},
        {name: 'Tomorrow', handler: () => handlePresetOptions(1)},
        {name: 'Next week', handler: () => handlePresetOptions(7)},
        {name: 'Next month', handler: () => handlePresetOptions(dayjs().add(1, 'month').startOf('month').diff(dayjs(), 'day')+1)},
    ];

    return (
        <Box bg='#232426' p='10px 5px' className={`nextui-calendar-parent ${colorScheme}`}>
            <Box p='5px 15px'>
                <Flex gap={15} justify='center'>
                    <AntDatePicker 
                        defaultValue={selectedDate ? dayjs(selectedDate) : undefined}
                        //value={selectedDate !== undefined ? dayjs(selectedDate) : undefined}
                        value={!isTyping && (datePicker ? dayjs(datePicker) : selectedDateTime ? dayjs(selectedDateTime) : selectedDate ? dayjs(selectedDate) : undefined)}
                        placeholder={'Select date'} 
                        className={`user-home-calendar-date-input user-home-calendar-time-picker ${colorScheme}`}
                        // className='user-home-calendar-date-input user-home-calendar-time-picker'
                        open={open}
                        variant="filled"
                        onClick={() => setOpen(false)} 
                        onKeyDown={datePickerEnter}
                        format='M/D/YYYY'
                        suffixIcon={Icons('IconCalendarMonth',17,17,`${colorScheme==='dark' ? '#fafafa' : '#323539'}`)} 
                        onChange={(date) => {setIsTyping(false); handleSelectedDateChange(date,false);}}
                    />

                    <Select
                        placeholder="Select time"
                        className={`date-time-picker-select ${colorScheme}`}
                        data={timeOptions}
                        clearable
                        comboboxProps={{ withinPortal: false }}
                        transitionProps={{
                            transition: 'fade',
                            duration: 100,
                            timingFunction: 'ease'
                        }}
                        searchable
                        limit={12}
                        checkIconPosition="right"
                        w='49%'
                        defaultValue={selectedDateTime !== undefined ? dayjs(selectedDateTime).format('h:mm A') : undefined}
                        disabled={!selectedDate}
                        value={selectedDateTime ? dayjs(selectedDateTime).format('h:mm A') : null}
                        onChange={(time) => handleDateTimeChange(time)}
                        filter={optionsFilter}
                        onDropdownOpen={handleDropdownOpen}
                        ref={selectRef}
                    />
                </Flex>
            </Box>
            <Flex bg={dropdownColor} justify='flex-end'>
                <Flex gap={30} justify='center' direction='column'>
                    {presetOptions.map((preset) => (
                        <Button radius={4} key={preset.name} fw={600} className={`preset-button ${colorScheme}`} onClick={preset.handler}>
                            {preset.name}
                        </Button>
                    ))}
                </Flex>

                <Calendar 
                    style={{background: dropdownColor}} 
                    disableAnimation
                    className={`calendar ${colorScheme}`}
                    selected={selectedDate !== undefined ? dayjs(selectedDate) : undefined} 
                    onChange={(date) => handleSelectedDateChange(date,true)} 
                    value={selectedDate !== undefined && dayjs(selectedDate).isValid() && parseDate(`${dayjs(selectedDate).year()}-${String(dayjs(selectedDate).month() + 1).padStart(2, '0')}-${String(dayjs(selectedDate).date()).padStart(2, '0')}`)}
                    focusedValue={selectedDate !== undefined && dayjs(selectedDate).isValid() && parseDate(`${dayjs(selectedDate).year()}-${String(dayjs(selectedDate).month() + 1).padStart(2, '0')}-${String(dayjs(selectedDate).date()).padStart(2, '0')}`)}
                    // value={selectedDate !== undefined && selectedDate.isValid() && parseDate(`${selectedDate.year()}-${String(selectedDate.month() + 1).padStart(2, '0')}-${String(selectedDate.date()).padStart(2, '0')}`)}
                    // focusedValue={selectedDate !== undefined && selectedDate.isValid() && parseDate(`${selectedDate.year()}-${String(selectedDate.month() + 1).padStart(2, '0')}-${String(selectedDate.date()).padStart(2, '0')}`)}
                    
                    
                    // defaultFocusedValue={selectedDate !== undefined && selectedDate.isValid() 
                    //     ? parseDate(`${selectedDate.year()}-${String(selectedDate.month() + 1).padStart(2, '0')}-${String(selectedDate.date()).padStart(2, '0')}`)
                    //     : undefined}
                    // onFocusChange={(newFocusedDate) => {
                    //     if (newFocusedDate) {
                    //         console.log(newFocusedDate);
                    //         setFocusedDate(parseDate('2024-12-12'));
                    //     }
                    // }}
                />
            </Flex>
        </Box>
    );
};

export default NextUICalendar;