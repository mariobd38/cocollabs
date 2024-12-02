import React, { useState, useEffect, useRef, useCallback } from 'react';

import dayjs from 'dayjs';

import { Modal } from 'antd';
import { Text, Button,Textarea,Flex,Box } from '@mantine/core';
import { Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";

import { useScrollLock } from '@/utils/useScrollLock';
import getStatusProperty from '@/utils/getStatusProperty';
import getPriorityProperty from '@/utils/getPriorityProperty';

import { Icons } from '@/components/icons/icons';
import UserAvatar from '@/components/Home/UserAvatar/userAvatar';
import { ProfileCard } from '@/components/Home/TaskDetailsModal/ProfileCard/profileCard';
import { MantineDropdown } from '@/components/models/ModelDropdown2/mantineDropdown';
import NewHomeDueDatePopover from '@/components/Home/DueDatePopover/newHomeDueDatePopover';
import TagDeletionModal from '@/components/Home/TaskDetailsModal/TagDeletionModal/tagDeletionModal';
import TaskDetailsModalHeader from '@/components/Home/TaskDetailsModal/TaskDetailsModalHeader/taskDetailsModalHeader';
import StatusDropdownContent from '@/components/Home/DropdownContent/statusDropdownContent';
import PriorityDropdownContent from '@/components/Home/DropdownContent/priorityDropdownContent';
import TagsDropdownContent from '@/components/Home/DropdownContent/tagsDropdownContent';
import TaskDescriptionTipTap from '@/components/Home/TaskDetailsModal/TaskDescriptionTipTap/taskDescriptionTipTap'

import { dropdownProps } from '@/animations/dropdownProps';

import { removeTagInfo } from '@/api/Tags/removeTag';
import { deleteTagInfo } from '@/api/Tags/deleteTag';

import './taskDetailsModal.css';

const TaskDetailsModal = (props) => {
    const {
        userFullName, initials,userEmail, currentIndex, currentTaskName, currentTaskPriority, currentTaskDueDate, currentTaskStatus, currentTaskCreationDate, currentTaskLastUpdatedOn,
        setCurrentTaskName, setCurrentTaskDueDate, setCurrentIndex, setCurrentTaskPriority, currentTaskTags, setCurrentTaskTags,setCurrentTaskDescriptionHtml,
        taskType, setTaskType, currentTaskDueDateTime, setCurrentTaskDueDateTime,onHide, show,setCurrentTaskStatus, currentTaskDescriptionHtml,themeColors, colorScheme,
        userProfileDto,userProfilePicture,handleTaskUpdateNew
    } = props;

    const content = currentTaskDescriptionHtml;
    const [originalTaskName, setOriginalTaskName] = useState(currentTaskName);

    const currentTaskDateFormatter = (dateString) => {
        if (dateString === null)
            return 'None';
        if (dayjs(dateString).year() === dayjs().year() && currentTaskDueDateTime) {
            return `${dayjs(currentTaskDueDateTime).format(`MMM D, h${dayjs(currentTaskDueDateTime).minute() !== 0 ? ':mm' : ''}a`)}`;
        } else {
            return `${dayjs(dateString).format('MMM D[,] YYYY')}`;
        }
    }
    useEffect(() => {

        if (show && !originalTaskName) {
            setOriginalTaskName(currentTaskName);
        }
    }, [show, currentTaskName, originalTaskName]);

    const handleTaskDetailsModalClose = () => {
        if (!modalDropdownIsOpen) {
            setTiptapExpanded(false);
            setOriginalTaskName(null);
            setCurrentTaskDescriptionHtml(null);
            onHide();
            // navigate(-1);
        }
    };

    // useEffect(() => {
    //     if (location.pathname === '/home/modal' && !show) {

    //         const timeout = setTimeout(() => {
    //             navigate('/home');
    //         }, 300);
    //         return () => clearTimeout(timeout);
    //     }
    // }, [location.pathname, show, navigate]);


    //task due date
    const handleDueDatePopoverClick = (event, index) => {
        setCurrentIndex(index);
        setCurrentTaskDueDate(taskType[index].dueDate);
        setCurrentTaskDueDateTime(taskType[index].dueDateTime);
    };

    const handleDueDatePopoverClose = (event) => {
        setCurrentTaskDueDate(taskType[currentIndex].dueDate);
        setCurrentTaskDueDateTime(taskType[currentIndex].dueDateTime);
    };


    const modalTextColor = colorScheme === 'dark' ? '#fafafa' : '#3a3a3a';
    const assigneeContent = (
        <div className={`user-home-task-details-modal-head-property-value ${colorScheme}`} >
            <Flex align='center' className='user-home-task-details-modal-assignee-div'>
                <Box me={10}>
                    <UserAvatar
                        userProfileDto={userProfileDto}
                        userProfilePicture={userProfilePicture}
                        initials={initials}
                        multiplier={2.2}
                        fontSize={1.1}
                    />
                </Box>
                <Text ff='Lato' c={modalTextColor}>
                    {userFullName}
                </Text>
            </Flex>
         </div>
    );

    const handleTagRemoval = (event,currentTagIndex) => {
        event.stopPropagation();
        removeTagInfo(
            currentTaskTags[currentTagIndex].id,
            taskType[currentIndex].id,
            currentTaskTags,
            setCurrentTaskTags
        );
        const updatedTaskTags = [...currentTaskTags];
        updatedTaskTags.splice(currentTagIndex, 1);
        setCurrentTaskTags(updatedTaskTags);

        setFirstRowTags(updatedTaskTags);

        // Recalculate rowOverflow state if needed
        calculateFirstRow(updatedTaskTags);
    }

     //tag delete logic
    const [tagToDelete, setTagToDelete] = useState(null);
    const [openTagDeletionModal,setOpenTagDeletionModal] = useState(false);

    const handleUpdateTaskName = (e) => {
        if (e.currentTarget.value === '') {
            handleTaskUpdateNew(taskType[currentIndex], originalTaskName, "name", taskType, setTaskType, currentIndex);
        } else {
            handleTaskUpdateNew(taskType[currentIndex], e.currentTarget.value, "name", taskType, setTaskType, currentIndex);
        }
    }

    const buttonRefs = useRef([]);
    const tagButtonContainerRef = useRef(null);
    const tagButtonsRef = useRef(null);
    const [firstRowTags, setFirstRowTags] = useState([]);
    const [rowOverflow, setRowOverflow] = useState(false);

    const calculateFirstRow = useCallback((tags) => {
        // Ensure buttonRefs are correctly initialized
        buttonRefs.current = tags.map((_, i) => buttonRefs.current[i] || React.createRef());

        // Check if all refs are ready
        if (!buttonRefs.current.every(ref => ref.current)) {
            setTimeout(() => calculateFirstRow(tags), 0);
            return;
        }

        if (!tagButtonContainerRef.current || !tagButtonsRef.current) {
            return;
        }

        // Cache container width and initial variables
        const containerWidth = tagButtonContainerRef.current.offsetWidth;
        const containerHeight = tagButtonContainerRef.current.offsetHeight;
        const buttonsHeight = tagButtonsRef.current.offsetHeight;

        const tagsInFirstRow = [];
        let totalWidth = 0;

        // Determine if there is overflow
        const hasOverflow = buttonsHeight > containerHeight;
        setRowOverflow(hasOverflow);

        // Calculate tags that fit in the first row
        buttonRefs.current.every((ref, index) => {
            const buttonWidth = ref.current.offsetWidth + 21; // Adjust for margin/padding if needed
            if (totalWidth + buttonWidth <= containerWidth) {
                tagsInFirstRow.push(tags[index]);
                totalWidth += buttonWidth;
                return true; // Continue looping
            } else {
                return false; // Stop looping, row is full
            }
        });

        setFirstRowTags(tagsInFirstRow);
    }, []);

    useEffect(() => {
        setTimeout(() => calculateFirstRow(currentTaskTags), 0);
    },[currentTaskTags, calculateFirstRow]);

    const [openPopoverId, setOpenPopoverId] = useState(null);
    const [openParentTagDropdown, setOpenParentTagDropdown] = useState(false);
    const [activeChildDropdownIndex, setActiveChildDropdownIndex] = useState(null);

    const {enableScroll, disableScroll} = useScrollLock('task-details-modal-parent');
    const [tiptapExpanded, setTiptapExpanded] = useState(false);

    const [modalDropdownIsOpen, setModalDropdownIsOpen] = useState(false);
    const fadedTextColor = `${colorScheme==='dark' ? '#aaabae' : '#808184'}`;
    const dropdownColor = colorScheme==='dark' ? '#232426' : '#fff';

    return (
        <Modal
        styles={{ body: { backgroundColor: themeColors.bg[12], border: `1px solid ${colorScheme==='dark' ? '#57585a' : '#c7c7c7'}`} }} 
            centered
            open={show}
            onCancel={() => {handleTaskDetailsModalClose(); setTiptapExpanded(false); }}
            width={1000}
            className='task-details-modal-parent'
            closeIcon
        >
            <TaskDetailsModalHeader
                userFullName={userFullName}
                handleTaskDetailsModalClose={handleTaskDetailsModalClose}
                colorScheme={colorScheme}
                themeColors={themeColors}
            />

            <Box className='overflow-y-auto' mah={680} mih={630} p='5px 20px' >
                <Flex justify='space-between' pb={24} >
                    <Box w='100%'>
                        <Textarea
                            className={`mt-2 mb-3 py-2 user-home-task-details-modal-name ${colorScheme}`}
                            minRows={1}
                            value={currentTaskName}
                            onChange={(event) => {
                                setCurrentTaskName(event.currentTarget.value);
                                handleUpdateTaskName(event);
                            }}
                            autosize
                        />

                        <div className='d-flex flex-column flex-lg-row  flex-wrap row-gap-3 lato-font'>
                            <Flex fz='1.06rem' className='user-home-task-details-modal-head-property-group' >
                                <Text className={`user-home-task-details-modal-property-lefttext ${colorScheme}`} c={modalTextColor}>Assignee</Text>
                                <ProfileCard
                                    userFullName={userFullName}
                                    initials={initials}
                                    userEmail={userEmail}
                                    userProfileDto={userProfileDto}
                                    userProfilePicture={userProfilePicture}
                                    target={<div>{assigneeContent}</div>}
                                    themeColors={themeColors}
                                />
                            </Flex>

                            <Flex fz='1.06rem' className='user-home-task-details-modal-head-property-group' >
                                    <Text className={`user-home-task-details-modal-property-lefttext ${colorScheme}`} c={modalTextColor}>Due Date</Text>
                                    <NewHomeDueDatePopover
                                        popoverTarget={
                                            <Flex justify='space-between' className={`user-home-task-details-modal-head-property-value ${colorScheme}`} onClick={(event) => handleDueDatePopoverClick(event, currentIndex)}>
                                                <Text ff='Lato' fz={16.5} c={currentTaskDateFormatter(currentTaskDueDate) !== 'None' ? modalTextColor : fadedTextColor}>
                                                    {currentTaskDateFormatter(currentTaskDueDate)}
                                                </Text>
                                                {currentTaskDateFormatter(currentTaskDueDate) !== 'None' &&
                                                <span className='user-home-task-details-modal-due-date-remove'
                                                onClick={(e) => { e.stopPropagation(); handleTaskUpdateNew(taskType[currentIndex], null, "clear due date", taskType, setTaskType, currentIndex);
                                                    setCurrentTaskDueDate(null); setCurrentTaskDueDateTime(null); }}>
                                                    <Flex align='center' className='user-home-task-details-modal-due-date-remove-icon'>
                                                        {Icons('IconX',24,24)}
                                                    </Flex>
                                                </span>}
                                            </Flex>
                                        }
                                        currentIndex={currentIndex} taskType={taskType} setTaskType={setTaskType}
                                        currentTaskDueDate={currentTaskDueDate} setCurrentTaskDueDate={setCurrentTaskDueDate}
                                        currentTaskDueDateTime={currentTaskDueDateTime} setCurrentTaskDueDateTime={setCurrentTaskDueDateTime}
                                        popoverId={currentIndex}
                                        openPopoverId={openPopoverId} // Pass the current open popover ID
                                        setOpenPopoverId={setOpenPopoverId}
                                        handleDueDatePopoverClose={handleDueDatePopoverClose} handleTaskUpdateNew={(element,value, attribute, taskType,setTaskType,index) => handleTaskUpdateNew(element,value, attribute, taskType,setTaskType,index)}
                                        enableScroll={enableScroll} disableScroll={disableScroll} colorScheme={colorScheme}
                                    />
                            </Flex>

                            <Flex fz='1.06rem' className='user-home-task-details-modal-head-property-group' >
                                <Text className={`user-home-task-details-modal-property-lefttext ${colorScheme}`} c={modalTextColor}>Status</Text>
                                <MantineDropdown
                                    target={
                                        <div className={`user-home-task-details-modal-head-property-value ${colorScheme}`} onClick={() => setModalDropdownIsOpen(true)}>
                                            <Box className='user-home-task-details-modal-head-text-dropdown-value' c='#e7e7e7' bg={currentTaskStatus && getStatusProperty(currentTaskStatus).background} >
                                                <Flex>
                                                    <Flex align='center' className='me-2'>{currentTaskStatus && getStatusProperty(currentTaskStatus).icon}</Flex>
                                                    <span>{currentTaskStatus}</span>
                                                </Flex>
                                            </Box>
                                        </div>
                                    }
                                    background={dropdownColor} width={190} dropdown={<StatusDropdownContent element={taskType && taskType[currentIndex]} handleTaskUpdateNew={handleTaskUpdateNew} taskType={taskType}
                                    setTaskType={setTaskType} idx={currentIndex} setCurrentTaskStatus={setCurrentTaskStatus}  existingTask={true} themeColors={themeColors} colorScheme={colorScheme} dropdownColor={dropdownColor} /> }
                                    position='bottom-start' setModalDropdownIsOpen={setModalDropdownIsOpen} colorScheme={colorScheme} modalName='task-details-modal-parent'
                                />
                            </Flex>

                            <Flex fz='1.06rem' className='user-home-task-details-modal-head-property-group' >
                                <Text className={`user-home-task-details-modal-property-lefttext ${colorScheme}`} c={modalTextColor}>Priority</Text>
                                <MantineDropdown
                                    target={
                                        <div className={`user-home-task-details-modal-head-property-value ${colorScheme}`} onClick={() => setModalDropdownIsOpen(true)}>
                                            {currentTaskPriority ?
                                            <Box className='user-home-task-details-modal-head-text-dropdown-value' bg={currentTaskPriority && getPriorityProperty(currentTaskPriority).color} >
                                                <Flex>
                                                    <Flex align='center' className='me-2'>{currentTaskPriority && getPriorityProperty(currentTaskPriority).icon}</Flex>
                                                    <span>{currentTaskPriority}</span>
                                                </Flex>
                                            </Box>
                                            : <Text c={fadedTextColor}>Empty</Text>}
                                        </div>
                                    }
                                    background={dropdownColor} width={210} dropdown={<PriorityDropdownContent element={taskType && taskType[currentIndex]} handleTaskUpdateNew={handleTaskUpdateNew} taskType={taskType}
                                    setTaskType={setTaskType} idx={currentIndex} setCurrentTaskPriority={setCurrentTaskPriority} existingTask={true} themeColors={themeColors} dropdownColor={dropdownColor} /> }
                                    position='bottom-start' setModalDropdownIsOpen={setModalDropdownIsOpen} colorScheme={colorScheme} modalName='task-details-modal-parent'
                                />
                            </Flex>


                            <Flex fz='1.06rem' className='user-home-task-details-modal-head-property-group' >
                                <Text className={`user-home-task-details-modal-property-lefttext ${colorScheme}`} c={modalTextColor}>Tags</Text>
                                <Popover 
                                motionProps={dropdownProps}

                                placement="bottom-start" isOpen={openParentTagDropdown} onOpenChange={(open) => {setOpenParentTagDropdown(open); if (!open) enableScroll();}}
                                >
                                    <PopoverTrigger className='tags-dropdown-popover-trigger' onClick={() => disableScroll()}>
                                    <div className={`user-home-task-details-modal-head-property-value ${colorScheme}`} ref={tagButtonContainerRef}>
                                            <div className="flex flex-wrap" ref={tagButtonsRef}>
                                                {rowOverflow && firstRowTags.length < currentTaskTags.length ?
                                                    <span>
                                                {firstRowTags.map((tag, index) => (
                                                    <Button ref={buttonRefs.current[index]} key={index} bg={tag.color} className='user-home-task-details-modal-tags-button' fw={400} h='22' ff='Lato' fz={16}>
                                                        <span className='flex'>
                                                            <span className='align-middle user-home-task-details-modal-tags-button-text' >
                                                            {tag.name}
                                                            </span>
                                                        </span>

                                                        <span className='align-middle user-home-task-details-modal-tags-button-close'
                                                        onClick={(event) => handleTagRemoval(event,index)}>
                                                            {Icons('IconX',18,18)}
                                                        </span>
                                                    </Button>)) } <span className='align-middle user-home-task-details-modal-tags-button-additional'>+{currentTaskTags.length - firstRowTags.length}</span>
                                                    </span>
                                                : currentTaskTags.map((tag, index) => (
                                                    <Button ref={buttonRefs.current[index]} key={index} bg={tag.color} className='user-home-task-details-modal-tags-button' fw={400} h='22' ff='Lato' fz={16}>
                                                        <Flex>
                                                            <span className='align-middle user-home-task-details-modal-tags-button-text' >
                                                            {tag.name}
                                                            </span>
                                                        </Flex>

                                                        <span className='align-middle user-home-task-details-modal-tags-button-close'
                                                        onClick={(event) => handleTagRemoval(event,index)}>
                                                            {Icons('IconX',18,18)}
                                                        </span>
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className={`tags-dropdown-popover-parent ${colorScheme}`} >
                                        <TagsDropdownContent task={taskType && taskType[currentIndex]} taskType={taskType} setTaskType={setTaskType}
                                        idx={currentIndex} setCurrentTaskTags={setCurrentTaskTags} currentTaskTags={currentTaskTags}
                                        setTagToDelete={setTagToDelete} setOpenTagDeletionModal={setOpenTagDeletionModal}
                                        openParentTagDropdown={openParentTagDropdown} setOpenParentTagDropdown={setOpenParentTagDropdown}
                                        activeChildDropdownIndex={activeChildDropdownIndex} setActiveChildDropdownIndex={setActiveChildDropdownIndex}
                                        enableScroll={enableScroll} colorScheme={colorScheme} themeColors={themeColors}
                                        />

                                    </PopoverContent>
                                </Popover>
                            </Flex>
                            </div>

                    </Box>
                </Flex>

                <div className='mt-3 mb-5'>
                    <TaskDescriptionTipTap
                        colorScheme={colorScheme}
                        themeColors={themeColors}
                        content={content}
                        currentIndex={currentIndex}
                        taskType={taskType}
                        setTaskType={setTaskType}
                        handleTaskUpdateNew={(element,value, attribute, taskType,setTaskType,index) => handleTaskUpdateNew(element,value, attribute, taskType,setTaskType,index)}
                        expanded={tiptapExpanded}
                        setExpanded={setTiptapExpanded}
                        modalName='task-details-modal-parent'
                    />
                </div>

                {tagToDelete && <TagDeletionModal
                    show={openTagDeletionModal}
                    handleClose={() => setOpenTagDeletionModal(false)}
                    handleConfirmDeleteTagButtonClick={() => deleteTagInfo(tagToDelete)}
                    tagName={tagToDelete.name}
                    themeColors={themeColors}
                    colorScheme={colorScheme}
                />}

            </Box>
        </Modal>
    );
};

export default TaskDetailsModal;
