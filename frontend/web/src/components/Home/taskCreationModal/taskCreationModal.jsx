import React, { useState, useRef, useEffect } from 'react';

import { Modal } from "antd";

import { Text,Textarea,Button,Box,Flex,Divider } from '@mantine/core';
import { Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";

import {Icons} from '@/components/icons/icons';
import { MantineDropdown } from '@/components/models/ModelDropdown2/mantineDropdown';
import PriorityDropdownContent from '@/components/Home/DropdownContent/priorityDropdownContent';
import StatusDropdownContent from '@/components/Home/DropdownContent/statusDropdownContent';
import NextUICalendar from '@/components/models/NextUICalendar/nextUICalendar';
import TaskDescriptionTipTap from '@/components/Home/TaskDetailsModal/TaskDescriptionTipTap/taskDescriptionTipTap';

import { useScrollLock } from '@/utils/useScrollLock';
import getPriorityProperty from '@/utils/getPriorityProperty';
import { createTaskInfo } from '@/api/Tasks/createTaskv2';

import './taskCreationModal.css';
import dayjs from 'dayjs';

const TaskCreationModal = (props) => {
    const {openTaskCreateModal,setOpenTaskCreateModal, taskData, setTaskData,colorScheme,themeColors,spaceId} = props;
    
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState(null);
    const [newTaskStatus, setNewTaskStatus] = useState(null);
    const [selectedDate, setSelectedDate] = useState(undefined); // Initialize with current date using Day.js
    const [selectedDateTime, setSelectedDateTime] = useState(undefined);
    const [dueDatePopoverOpened, setDueDatePopoverOpened] = useState(false);
    const textareaRef = useRef(null);
    const newTaskNameDisabled = newTaskName.trim() === '';

    useEffect(() => {
        if (openTaskCreateModal && textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.focus(); // Focus the textarea
            textarea.setSelectionRange(textarea.value.length, textarea.value.length); // Set cursor to the end
        }
    }, [openTaskCreateModal]);

    const handleTaskCreation = async () => {
        try {
            const newTask = await createTaskInfo(
                newTaskName,
                newTaskDescription,
                newTaskStatus,
                newTaskPriority,
                selectedDate,
                selectedDateTime,
                spaceId
            );
    
            setTaskData([...taskData, newTask]);
            setOpenTaskCreateModal(false);
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const { disableScroll, enableScroll } = useScrollLock('task-creation-modal'); 

    const buttonColor = colorScheme==='dark' ? '#e0e2e6' : '#121212';
    const buttonBg = colorScheme==='dark' ? '#242629' : '#e0e3e6';
    const dropdownColor = colorScheme==='dark' ? '#232426' : '#fff';

    // console.log(dueDatePopoverOpened)
    return (
        <Modal styles={{ body: { backgroundColor: themeColors.bg[12], border: `1px solid ${colorScheme==='dark' ? '#57585a' : '#c7c7c7'}`} }} 
        open={openTaskCreateModal} onCancel={() => {setOpenTaskCreateModal(false) }} className='task-creation-modal' width={650} >
            <Box m='auto' w='100%' >
                <Box p='15px 20px' w='100%'>
                    <Textarea
                        ref={textareaRef}
                        className={`title ${colorScheme}`}
                        p='8px 0'
                        m='4px 0px'
                        w='100%'
                        minRows={1}
                        autosize
                        placeholder='Issue title'
                        value={newTaskName}
                        onChange={(event) => {
                            setNewTaskName(event.currentTarget.value);
                        }}
                    />
                    <Box className={`task-creation-tiptap ${colorScheme}`} mt={20} mb={40}>
                        <TaskDescriptionTipTap 
                            setNewTaskDescription={setNewTaskDescription}
                            colorScheme={colorScheme}
                            themeColors={themeColors}
                            modalName='task-creation-modal'
                        />
                    </Box>
    
                    <Box>
                        <Flex justify='space-between' align='center' >
                            <Flex gap='10'>
                                <Button radius={5} h='30' p='0 8px' bg={buttonBg} bd='.1px solid #048369'>
                                    {Icons('IconUser',14,14,buttonColor)}
                                    <Text ms='8' ff='Inter' fz='12.5' c={buttonColor}>Assignee</Text>
                                </Button>

                                <MantineDropdown 
                                    target={
                                        <Button c={buttonColor} radius={5} h='30' p='0 8px' bg={buttonBg} bd='.1px solid #048369'>
                                            {Icons('IconLoader',14,14,buttonColor)}
                                            <Text ms='8' ff='Inter' fz='12.5' >{newTaskStatus ? newTaskStatus : 'Status'}</Text>
                                        </Button>
                                    }
                                    background={dropdownColor} width={190}
                                    dropdown={<StatusDropdownContent element={newTaskStatus} setCurrentTaskStatus={setNewTaskStatus} existingTask={false} 
                                        themeColors={themeColors} colorScheme={colorScheme} dropdownColor={dropdownColor} /> }
                                    position='bottom-start' colorScheme={colorScheme} modalName='task-creation-modal'
                                />

                                <MantineDropdown 
                                    target={
                                        <Button c={buttonColor} radius={5} h='30' p='0 8px' bg={buttonBg} bd='.1px solid #048369'>
                                            {Icons('IconFlag3',14,14,newTaskPriority ? getPriorityProperty(newTaskPriority).icon.props.fill : buttonColor)}
                                            <Text ms='8' ff='Inter' fz='12.5' >{newTaskPriority ? newTaskPriority : 'Priority'}</Text>
                                        </Button>
                                    }
                                    background={dropdownColor} width={180} 
                                    dropdown={<PriorityDropdownContent element={newTaskPriority} setCurrentTaskPriority={setNewTaskPriority} existingTask={false}
                                        themeColors={themeColors} dropdownColor={dropdownColor} /> }
                                    position='bottom-start' colorScheme={colorScheme} modalName='task-creation-modal'
                                />
                                <Popover placement="bottom" isOpen={dueDatePopoverOpened} onOpenChange={(open) => {setDueDatePopoverOpened(open); if (!open) enableScroll(); else disableScroll();}}>
                                <PopoverTrigger onClick={() => setDueDatePopoverOpened }>
                                        <Button fw={300} c={buttonColor} className='nextui-calendar-popover-trigger-button' radius={5} h='30' p='0 8px' bg={buttonBg} bd='.1px solid #048369' 
                                        >
                                            {Icons('IconCalendarMonth',14,14,buttonColor)} 
                                            <Text ms='8' ff='Inter' fz='12.5' >
                                                {selectedDateTime && selectedDateTime.isValid() 
                                                    ? selectedDateTime.format(`MMM D, h${selectedDateTime.minute() !== 0 ? ':mm' : ''}a`)
                                                    : selectedDate && dayjs(selectedDate).isValid() ? `${dayjs(selectedDate).format('MMM D')} ` : 'Due Date'
                                                }
                                            </Text>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className='p-0 bg-transparent' >
                                        <NextUICalendar 
                                            selectedDate={selectedDate}
                                            setSelectedDate={setSelectedDate}
                                            selectedDateTime={selectedDateTime}
                                            setSelectedDateTime={setSelectedDateTime}
                                            dropdownColor={dropdownColor}
                                            colorScheme={colorScheme}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
                <Divider size={1} color={`${colorScheme==='dark' ? '#57585a' : '#c7c7c7'}`}/>
                <Box m='auto' w='100%' >
                    <Box p='13px 20px' w='100%'>
                        <Flex justify='end' align='center'>
                            <Button disabled={newTaskNameDisabled} 
                            // bd={`1px solid ${newTaskNameDisabled ? '#434446 ' : `${colorScheme==='dark' ? '#048369' : '#24b689e3'}`}`} 
                            className={`${newTaskName && 'task-card-create-task-button'}`} radius={8} p='0px 12px' 
                            c={newTaskNameDisabled ? `${colorScheme==='dark' ? '#838486' : '#757575d8'}` : '#fafafa'} 
                            bg={newTaskNameDisabled ? `${colorScheme==='dark' ? '#434446' : '#c5c5c5'}` : `${colorScheme==='dark' ? '#048369' : '#24b689e3'}`} onClick={handleTaskCreation}>
                                <Flex align='center'>
                                    <Box me={5} >
                                        {Icons('IconPlus',14,14)}
                                    </Box>
                                    <span>Create</span>
                                </Flex>
                            </Button>
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default TaskCreationModal;