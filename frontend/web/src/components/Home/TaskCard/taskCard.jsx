import React, { useState } from 'react';

import { Table,Card,Text,SegmentedControl,Flex,Button,Box,Image } from '@mantine/core';

import TaskDetailsModal from '@/components/Home/TaskDetailsModal/taskDetailsModal';
import TaskCardContent from '@/components/Home/TaskCard/TaskCardContent/taskCardContent';
import TaskCreationModal from '@/components/Home/taskCreationModal/taskCreationModal';
import {Icons} from '@/components/icons/icons';

import { getTagInfo } from '@/api/Tags/getTags';
import { UpdateTaskInfoNew } from '@/api/Tasks/updateTaskNew';

import checklist from '../../../assets/illustrations/home/checklist.png';

import './taskCard.css'

const TaskSegment = ({ active, tasks, isCompleted, renderTaskContent }) => {
    if (!active) return null;
  
    return (
        <Box h='22rem' className="overflow-auto" mx={16} py={16}>
            {isCompleted ? (
                tasks.length > 0 ? (
                    <Table>
                    <Table.Tbody>{renderTaskContent(tasks, true)}</Table.Tbody>
                    </Table>
                ) : (
                    <Flex justify="center" direction="column" p={0} align="center">
                    <Image w="14rem" src={checklist} alt="" />
                    <div className="fafafa-color pt-3 lato-font">
                        Your completed tasks will appear here ✅
                    </div>
                    </Flex>
                )
                ) : (
                <Table>
                    <Table.Tbody>{renderTaskContent(tasks, false)}</Table.Tbody>
                </Table>
            )}
        </Box>
    );
};

const TaskCard = (props) => {

    const { userFullName, initials, userEmail, taskData, setTaskData, ongoingTasks, today, overdueTasks,
        completedTasks,userProfileDto,userProfilePicture,colorScheme,themeColors,spaceData } = props; 
    const [currentIndex, setCurrentIndex] = useState(null);

    //task attributes
    const [currentTaskName, setCurrentTaskName] = useState('');
    const [currentTaskCreationDate, setCurrentTaskCreationDate] = useState('');
    const [currentTaskLastUpdatedOn, setCurrentTaskLastUpdatedOn] = useState('');
    const [currentTaskDescriptionHtml, setCurrentTaskDescriptionHtml] = useState('');
    // const [currentTaskIdNumber, setCurrentTaskIdNumber] = useState('');
    const [currentTaskStatus, setCurrentTaskStatus] = useState('');
    const [currentTaskPriority, setCurrentTaskPriority] = useState('');
    const [currentTaskTags, setCurrentTaskTags] = useState([]);

    //due date popovers
    const [currentTaskDueDate, setCurrentTaskDueDate] = useState(null);
    const [currentTaskDueDateTime, setCurrentTaskDueDateTime] = useState(null);

    const [taskType, setTaskType] = useState(null);
    //task details modal
    const [modalShow, setModalShow] = useState(false);

    const handleTaskUpdateNew = (element,value, attribute, taskType,setTaskType,index) => {
        UpdateTaskInfoNew(
            element,
            value,
            attribute,
            taskType,
            setTaskType,
            index
        );
    }
    
    const [activeSegment, setActiveSegment] = useState('1');
    const seg = [
        {value: '1', text: 'Upcoming', taskType: ongoingTasks},
        {value: '2', text: 'Overdue', taskType: overdueTasks},
        {value: '3', text: 'Completed', taskType: completedTasks},
    ];

    const segments = seg.map((item,index) => (
        { value: item.value, label: <> {
            <Text key={index} className={`d-flex align-items-center task-card-segment ${colorScheme}`} c='#f5f6f9' fw={550} ff='Nunito Sans' fz='14'>{item.text}<Text className='d-flex align-items-center text' ms={10} fz={13}>{item.taskType.length}</Text></Text>
            }
        </> }
    ));

    const renderTaskContent = (taskType,isCompleted) => (
        <TaskCardContent 
            today={today}
            taskType={taskType}
            currentTaskDueDate={currentTaskDueDate}
            currentTaskDueDateTime={currentTaskDueDateTime}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setCurrentTaskDueDate={setCurrentTaskDueDate}
            setCurrentTaskDueDateTime={setCurrentTaskDueDateTime}
            getTagInfo={getTagInfo}
            setCurrentTaskTags={setCurrentTaskTags}
            setModalShow={setModalShow}
            setCurrentTaskName={setCurrentTaskName}
            setCurrentTaskCreationDate={setCurrentTaskCreationDate}
            setCurrentTaskDescriptionHtml={setCurrentTaskDescriptionHtml}
            setCurrentTaskLastUpdatedOn={setCurrentTaskLastUpdatedOn}
            setCurrentTaskStatus={setCurrentTaskStatus}
            setCurrentTaskPriority={setCurrentTaskPriority}
            setTaskType={setTaskType}
            isTaskTabCompleted={isCompleted}
            handleTaskUpdateNew={handleTaskUpdateNew}
            colorScheme={colorScheme}
            themeColors={themeColors}
            spaceSlug={spaceData.slug}
        />
      );
    const [openTaskCreateModal, setOpenTaskCreateModal] = useState(false);

    return (

        <Box py={20} px={20} bg={themeColors.bg[4]} bd={`1px solid ${colorScheme === 'dark' ? '#323539' : '#b9b9b9'}`}
            style={{borderRadius: "10px", boxShadow: `0 2px 10px ${colorScheme==='dark' ? '#30314447' : '#70718457'}` }}>
            <div className='d-flex align-items-center justify-content-between pb-2'>
                <Text fz='18'  c={themeColors.text[3]} ff='Lato'>My Issues</Text>
                {Icons('IconDots',24,24,themeColors.text[3])}
            </div>

            <Flex align='center' mt={10} mb={15} justify='space-between'>
                <SegmentedControl
                    className={`task-card-segmented-control ${colorScheme}`}
                    bg={themeColors.bg[7]}
                    // color={`${colorScheme==='dark' ? '#048369' : '#24b689e3'}`}
                    color={`${colorScheme==='dark' ? '#1e1f21' : '#fafafa'}`}
                    withItemsBorders={false}
                    data={segments}
                    value={activeSegment}
                    onChange={setActiveSegment}
                    radius={6}
                />

                <Button bd={`.1px solid ${colorScheme==='dark' ? '#048369' : '#24b689e3'}`}
                className='task-card-create-task-button' c='#fafafa' radius={8} p='0px 12px' 
                bg='#24b689df' onClick={() => setOpenTaskCreateModal(true)}>
                    <div className='d-flex align-items-center'>
                        <Box me={7} >
                        {Icons('IconPlus',15,15,'#fafafa')}
                        </Box>
                        <span>New issue</span>
                    </div>
                </Button>
            </Flex>

            <Card w='100%' radius={10} p={0}  bd={`1.7px solid ${colorScheme === 'dark' ? '#323539' : '#c6c6c6'}`} >
                <Box bg={themeColors.bg[4]}>
                    {['1', '2', '3'].map(segment => (
                        <TaskSegment
                            key={segment}
                            active={activeSegment === segment}
                            tasks={
                            segment === '1'
                                ? ongoingTasks
                                : segment === '2'
                                ? overdueTasks
                                : completedTasks
                            }
                            isCompleted={segment === '3'}
                            renderTaskContent={renderTaskContent}
                        />
                    ))}
                </Box>
            </Card>

            <TaskDetailsModal
                userFullName={userFullName}
                colorScheme={colorScheme}
                themeColors={themeColors}
                initials={initials}
                userEmail={userEmail}
                show={modalShow}
                onHide={() => setModalShow(false)}
                currentIndex={currentIndex}
                taskType={taskType}
                setTaskType={setTaskType}
                currentTaskName={currentTaskName}
                currentTaskCreationDate={currentTaskCreationDate}
                currentTaskLastUpdatedOn={currentTaskLastUpdatedOn}
                currentTaskDescriptionHtml={currentTaskDescriptionHtml}
                currentTaskDueDate={currentTaskDueDate}
                currentTaskDueDateTime={currentTaskDueDateTime}
                currentTaskStatus={currentTaskStatus}
                currentTaskPriority={currentTaskPriority}
                currentTaskTags={currentTaskTags}
                setCurrentTaskName={setCurrentTaskName}
                setCurrentTaskDueDate={setCurrentTaskDueDate}
                setCurrentTaskDueDateTime={setCurrentTaskDueDateTime}
                setCurrentIndex={setCurrentIndex}
                setCurrentTaskPriority={setCurrentTaskPriority}
                setCurrentTaskDescriptionHtml={setCurrentTaskDescriptionHtml}
                setCurrentTaskTags={setCurrentTaskTags}
                setCurrentTaskStatus={setCurrentTaskStatus}
                userProfileDto={userProfileDto}
                userProfilePicture={userProfilePicture}
                handleTaskUpdateNew={(element,value, attribute, taskType,setTaskType,index) => handleTaskUpdateNew(element,value, attribute, taskType,setTaskType,index)}
            />

            <TaskCreationModal 
                openTaskCreateModal={openTaskCreateModal}
                setOpenTaskCreateModal={setOpenTaskCreateModal}
                taskData={taskData}
                setTaskData={setTaskData}
                colorScheme={colorScheme}
                themeColors={themeColors}
                spaceId={spaceData.id}
            />
        </Box>
    );
};

export default TaskCard;