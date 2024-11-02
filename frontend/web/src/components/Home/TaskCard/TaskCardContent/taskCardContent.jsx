import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Modal } from "antd";
 
import dayjs from 'dayjs';

import { Tooltip, Table, Text,Button,Textarea,Box } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

import {Icons} from '../../../icons/icons';

import NewHomeDueDatePopover from '../../newHomeDueDatePopover';
import { MantineDropdown } from '../../../models/ModelDropdown2/mantineDropdown';
import PriorityDropdownContent from '../../DropdownContent/priorityDropdownContent';
import StatusDropdownContent from '../../DropdownContent/statusDropdownContent';
import TaskOptionsPortal from './TaskOptionsPortal';
import { useScrollLock } from '../../../../utils/useScrollLock';

import './taskCardContent.css';

const TaskCardContent = (props) => {
    const {today,taskType,currentTaskDueDate, currentTaskDueDateTime, currentIndex, setCurrentIndex,setCurrentTaskDueDate,
        setCurrentTaskDueDateTime, getTagInfo,setCurrentTaskTags,setModalShow,setCurrentTaskName,setCurrentTaskCreationDate,
        setCurrentTaskLastUpdatedOn,setCurrentTaskStatus,setCurrentTaskPriority,setTaskType,isTaskTabCompleted, setCurrentTaskDescriptionHtml,handleTaskUpdateNew,
        colorScheme,themeColors
    } = props;

    const location = useLocation();

    const handleDueDatePopoverClick = (event,index,task) => {
        setCurrentIndex(index);
        setCurrentTaskDueDate(task.dueDate);
        setCurrentTaskDueDateTime(task.dueDateTime);
        //setDueDatePopoverIsOpen(!dueDatePopoverIsOpen); //todo
    };

    const OpenTaskDetailsModal = async (event, taskType,index) => {
        try {
            const currentTags = await getTagInfo(taskType[index].id);
            setTaskType(taskType);
            setCurrentTaskTags(currentTags);
            setCurrentTaskName(taskType[index].name);
            setCurrentTaskCreationDate(taskType[index].createdOn);
            setCurrentTaskLastUpdatedOn(taskType[index].lastUpdatedOn);
            setCurrentTaskDescriptionHtml(taskType[index].descriptionHtml);
            setCurrentTaskDueDate(taskType[index].dueDate);
            setCurrentTaskDueDateTime(taskType[index].dueDateTime);
            setCurrentTaskStatus(taskType[index].status);
            setCurrentTaskPriority(taskType[index].priority);
            setCurrentIndex(index);
            setModalShow(true);
        } catch(error) {
            console.error('Error opening task details modal:', error);
        }
    }
    
    const formatDate = (dateString) => {
        const dueDateDiffFromToday = dayjs(dateString).startOf('day').diff(dayjs(today).startOf('day'), 'day');

        if (dueDateDiffFromToday < 6) {
            if (dueDateDiffFromToday < 0)
                return `${dayjs(dateString).format('MMM D')}`;
            if (dueDateDiffFromToday === 0)
                return 'Today';
            if (dueDateDiffFromToday === 1)
                return 'Tomorrow';
            return `${dayjs(dateString).format('dddd')}`;
        }

        if (dayjs(dateString).year() === dayjs().year()) {
            return `${dayjs(dateString).format('MMM D')}`;
        } else {
            return `${dayjs(dateString).format('MMM D, YYYY')}`;
        }
    };

    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [showInnerContextMenu,setShowInnerContextMenu] = useState(false);
    const { disableScroll, enableScroll } = useScrollLock(); 

    const ref = useClickOutside(() => {
        if (!showInnerContextMenu) {
            enableScroll();
            setShowContextMenu(false); // Hide the parent dropdown
            setShowInnerContextMenu(false);
            setOpenMenuIndex(null);
        }
    });

    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);

    const handleTaskRowRightClick = (event,index) => {
        setCurrentTask(taskType[index]);
        setCurrentIndex(index);
        setNewTaskName(taskType[index].name);
        event.preventDefault(); // Prevent the default context menu

        const mouseX = event.clientX;
        const mouseY = event.clientY - 100;
        setContextMenuPosition({top: mouseY,left: mouseX,});
        setShowContextMenu(true);
        disableScroll();
    }

    const [openRenameModal, setOpenRenameModal] = useState(false);
    const [newTaskName,setNewTaskName] = useState(null);

    const CustomContextMenu = useMemo(() => {
        return <TaskOptionsPortal 
            ref={ref}
            contextMenuPosition={contextMenuPosition}
            showContextMenu={showContextMenu}
            setShowContextMenu={setShowContextMenu}
            openMenuIndex={openMenuIndex}
            setOpenMenuIndex={setOpenMenuIndex}
            enableScroll={enableScroll}
            setShowInnerContextMenu={setShowInnerContextMenu}
            setOpenRenameModal={setOpenRenameModal}
            taskType={taskType}
            currentIndex={currentIndex}
            setTaskType={setTaskType}
            setCurrentTask={setCurrentTask}
        />
        
    },[showContextMenu,contextMenuPosition,ref,openMenuIndex,enableScroll,currentIndex,setTaskType,taskType]);

    const handleTaskRename = () => {
        handleTaskUpdateNew(taskType[currentIndex], newTaskName, "name", taskType, setTaskType, currentIndex);
        setOpenRenameModal(false);
    }

    const handleTaskComplete = (index) => {
        handleTaskUpdateNew(taskType[index], 'Completed', "status", taskType, setTaskType, index);
    }

    const [openPopoverId, setOpenPopoverId] = useState(null);

    const buttonBorderColor = `1px solid ${colorScheme === 'dark' ? '#969696' : '#b0b0b0'}`;
    const dropdownColor = colorScheme==='dark' ? '#232426' : '#f0f0f0';

    const rows = (taskType) => {
        
        return taskType.map((element, index) => {
            
            return ( <Table.Tr key={index} className={`table-row-dark table-cell ${colorScheme}`} bd='none' style={{borderRadius: "18px"}} onContextMenu={(event) => handleTaskRowRightClick(event, index)}>
                <Table.Td className={`text-overflow-cell`}>
                    <div >
                        <div className="d-flex" style={{ color: themeColors.text[2] }}>
                            <div className='align-items-center d-flex'>
                                {isTaskTabCompleted ?
                                    <div onClick={() => handleTaskComplete(index)} className='d-flex align-items-center user-home-task-check-icon user-home-task-set-complete'>
                                        {Icons('IconCircleCheckFilled',24,24,'#048a66')}
                                    </div>
                                    : (
                                        <div onClick={() => handleTaskComplete(index)}
                                        className="user-home-task-set-complete d-flex align-items-center">
                                            {Icons('IconCircle',16,16)}
                                        </div>
                                    )
                                }
                            </div>
                        
                            <Link className='text-overflow m-0 d-flex ps-1' to={{ pathname: '/home/modal' }} state={{ background: location }} 
                                onClick={(e) => OpenTaskDetailsModal(e, taskType, index)} >
                                <div className='d-flex flex-column w-100'>
                                    <button className='task-name-link' >
                                        <div className={`task-name-text`} >
                                            <Text className='text-overflow' c={themeColors.text[2]} fz={14}>{element.name}</Text>
                                        </div>
                                    </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </Table.Td>
                <Table.Td ps={0} className='table-icons-cell'>
                        <div className='d-flex align-items-center gap-2 justify-content-end' >

                            <>{element.priority &&
                                <MantineDropdown 
                                    target={
                                        <Button p='0 12px' size="xs" radius='6' fz={13} bg='transparent' bd={buttonBorderColor} className={`user-home-calendar-icon-div ${colorScheme}`}>
                                            <span style={{ color: "#a7a7a7" }} className={`lato-font, user-home-chosen-due-date-text`} >
                                                <span className='d-flex align-items-center' style={{color: colorScheme==='dark' ? "#e5e5e5" : '#414141'}} >
                                                    <div className='me-1'>
                                                        {Icons('IconFlag3',18,18,colorScheme==='dark' ? "#e5e5e5" : '#414141')}
                                                    </div>

                                                    <span>{element.priority}</span>
                                                </span>
                                            </span>
                                        </Button> 
                                    }
                                    background={dropdownColor} width={210} dropdown={<PriorityDropdownContent element={element} handleTaskUpdateNew={handleTaskUpdateNew} taskType={taskType} setTaskType={setTaskType} idx={index} existingTask={true}
                                    themeColors={themeColors} dropdownColor={dropdownColor} /> }
                                    position='bottom-end' colorScheme={colorScheme}
                                />
                            }</>

                            <NewHomeDueDatePopover
                                popoverTarget={

                                <>{element.dueDate ?
                                    <Button fz='13' size="xs" p='0 12px' radius='6' bg='transparent' bd={buttonBorderColor}
                                    className={`user-home-calendar-icon-div ${colorScheme}`} onClick={(event) => handleDueDatePopoverClick(event, index,element)}>
                                        <span style={{ color: "#a7a7a7" }} className={`lato-font, user-home-chosen-due-date-text`} >
                                            <span className='d-flex align-items-center'
                                                style={{ color: dayjs(element.dueDate).startOf('day').diff(dayjs(today).startOf('day'), 'day') < 0 && element.status !== 'Completed' ? "#e10845cf" : 
                                                    colorScheme==='dark' ? "#e5e5e5" : '#414141'  
                                            }} >
                                                <div className='d-flex align-items-center'>
                                                    <div className='me-2'>
                                                        {Icons('IconCalendarDue',18,18,themeColors.text[1])}
                                                    </div>
                                                    <span>{formatDate(element.dueDateTime || element.dueDate)}</span>
                                                </div>
                                            </span>
                                        </span>
                                    </Button> :

                                    <span className='table-cell-icon'>
                                        <Tooltip label="Add due date" position="top" offset={8} openDelay={400} className='user-home-tooltip' >
                                            <Box bd={buttonBorderColor} className={`user-home-calendar-icon-div ${colorScheme}`} onClick={(event) => handleDueDatePopoverClick(event, index,element)}>
                                                {Icons('IconCalendarMonth',20.80,16,themeColors.text[1])}
                                            </Box>
                                        </Tooltip>
                                    </span>}
                                </>} 

                                currentTaskDueDate={currentTaskDueDate} setCurrentTaskDueDate={setCurrentTaskDueDate}
                                currentTaskDueDateTime={currentTaskDueDateTime} setCurrentTaskDueDateTime={setCurrentTaskDueDateTime}
                                dueDatePopoverIsOpen={openPopoverId === index} // Check if this popover is open
                                popoverId={index}
                                openPopoverId={openPopoverId} // Pass the current open popover ID
                                setOpenPopoverId={setOpenPopoverId}
                                currentIndex={currentIndex} taskType={taskType} setTaskType={setTaskType} handleTaskUpdateNew={(element,value, attribute, taskType,setTaskType,index) => handleTaskUpdateNew(element,value, attribute, taskType,setTaskType,index)}
                                colorScheme={colorScheme} enableScroll={enableScroll} disableScroll={disableScroll}
                            />
                    </div>
                </Table.Td>
            </Table.Tr>
        )});
    };

    return (
        <>  
            <Table bd="none">
                <Table.Tbody bd="0px">
                    <>
                        {rows(taskType)}
                        
                        {showContextMenu && CustomContextMenu }
                        {currentTask && 
                            <Modal centered open={openRenameModal} onCancel={() => {setOpenRenameModal(false);}} afterClose={() => {setCurrentTask(null); setNewTaskName(null);}} className='task-rename-modal' width={570}>
                                <div style={{width: "90%", margin: "auto"}}>
                                    <Textarea
                                        className='mt-1 mb-5 py-2'
                                        p={0}
                                        m={0}
                                        w='100%'
                                        minRows={2}
                                        autosize
                                        defaultValue={taskType && taskType[currentIndex].name}
                                        onChange={(event) => setNewTaskName(event.currentTarget.value)}
                                    />
                                    <Button disabled={currentTask.name === newTaskName || (newTaskName.length === '' || newTaskName.trim() === '')} onClick={handleTaskRename} w='-webkit-fill-available'>
                                        <div className='d-flex align-items-center'>
                                            <div className='me-2'>
                                                {Icons('IconPencil',17,17)}
                                            </div>
                                            <span>Confirm new task name</span>
                                        </div>
                                        
                                    </Button>
                                </div>
                            </Modal>
                        }
                    </>
                </Table.Tbody>
            </Table>
        </>
      );
};

export default TaskCardContent;