import React, { forwardRef,useState } from 'react';

import { Menu,Box,Portal, Divider } from '@mantine/core';

import {Icons} from '@/components/icons/icons';

import { deleteTaskInfo } from '@/api/Tasks/deleteTask';

const TaskOptionsPortal = forwardRef((props, ref) => {
    const { contextMenuPosition,showContextMenu,setShowContextMenu,openMenuIndex,setOpenMenuIndex,
        enableScroll,setShowInnerContextMenu,setOpenRenameModal,taskType,setTaskType,currentIndex,
        setCurrentTask,colorScheme } = props;

    const menuItems = [
        {label: 'Rename', icon: Icons('IconEdit',17,17), cascade: false, 
            action: () => handleRenameButtonClick()
        },
        {label: 'Status', icon: Icons('IconLoader',17,17), cascade: true,
            child: {
                width: '200'
            }, action: () => console.log('test')
        },
        {label: 'Priority', icon: Icons('IconFlag3',17,17), cascade: true,
            child: {
                width: '200'
            }, action: () => console.log('test')
        },
        // {label: 'Set due date', icon: Icons('IconCalendarPlus',17,17), cascade: false, action: () => console.log('test')},
        // {label: 'Delete', icon: Icons('IconTrash',17,17), cascade: false, action: () => {setCurrentTask(null); deleteTaskInfo(currentIndex,taskType,setTaskType)}}
        {label: 'Set due date', icon: Icons('IconCalendarPlus',17,17), cascade: false, action: () => setShowContextMenu(false)},
        {label: 'Delete', icon: Icons('IconTrash',17,17), cascade: false, action: () => deleteTask()}
    ]

    const deleteTask = () => {
        setCurrentTask(null);
        deleteTaskInfo(currentIndex,taskType,setTaskType);
        setShowContextMenu(false);
        enableScroll();
    }

    const handleRenameButtonClick = () => {
        enableScroll();
        setOpenRenameModal(true);
        setShowInnerContextMenu(false);
        setShowContextMenu(false);
    }

    const handleMouseEnter = (index) => {
        setOpenMenuIndex(index);
        setFirstSectionActive(true);
    };
    
    const [firstSectionActive, setFirstSectionActive] = useState(false);

    return (
        <Portal>
            <Box 
                bg='#28292b'
                w='200px'
                ref={ref}  // Attach the ref here
                bd='.1px solid #757779'
                top={`${contextMenuPosition.top}px`}
                left={`${contextMenuPosition.left}px`}
                pos='absolute'
                style={{ 
                    borderRadius: "7px", 
                    zIndex: 100,
                    pointerEvents: "auto",
                }}
            >
                <Menu
                    opened={showContextMenu}
                    withinPortal
                    w='92%' 
                    style={{ borderRadius: "6px",pointerEvents: "auto", }}
                    closeOnItemClick={false}
                    
                >
                    <Box 
                        mah={300}
                        className='p-2' 
                        style={{ borderRadius: "7px", boxShadow: "0 14px 28px rgba(0, 0, 0, 0.35)", overflow: "auto" }}
                    >

                        <Menu >
                            {/* <Menu.Dropdown> */}
                            {menuItems.map((item, index) => (
                                <Menu
                                    trigger="hover"
                                    openDelay={150} 
                                    closeDelay={150}
                                    key={index}
                                    position="right-start"
                                    opened={openMenuIndex === index}
                                    closeOnItemClick={false}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                >
                                    {index === 4 && <Divider my={8} bd='.1px solid #6a6a6a'/>}

                                    <Menu.Target closeOnItemClick={false}  >
                                        <Menu.Item
                                            w='86%'
                                            className={`rte-styles-options-button ${openMenuIndex === index && firstSectionActive   ? 'isActive' : ''} ${colorScheme}`}
                                            bg='#28292b'
                                            c='#eaebed'
                                            leftSection={item.icon}
                                            rightSection={item.cascade && Icons('IconChevronRight',17,17,'#d3d5d7')}
                                            onClick={item.action} 
                                        >
                                            <span>{item.label}</span>
                                        </Menu.Item>
                                    </Menu.Target>
                                    {item.cascade &&
                                    <Menu.Dropdown 
                                        onMouseEnter={() => {
                                            setShowInnerContextMenu(true);
                                        }}
                                        onMouseLeave={() => {
                                            setShowInnerContextMenu(false);
                                        }}
                                        w={item.child ? `${item.child.width}px` : 'auto'}
                                        bg='#28292b'
                                        c='#eaebed' 
                                        bd='.1px solid #757779' 
                                        m='0' 
                                        left={`${contextMenuPosition.left+200}px`}
                                        style={{pointerEvents: "auto"}} 
                                    >
                                        <Menu.Item w='84%' m='auto' bg='#28292b' c='inherit'  className={`rte-styles-options-button ${colorScheme}`}>a</Menu.Item>
                                        <Menu.Item w='84%' m='auto' bg='#28292b' c='inherit'  className={`rte-styles-options-button ${colorScheme}`}>a</Menu.Item>
                                    </Menu.Dropdown>}
                                </Menu>
                            ))}
                        </Menu>
                    </Box>
                </Menu>
            </Box>
        </Portal>
    );
});

TaskOptionsPortal.displayName = "TaskOptionsPortal";

export default TaskOptionsPortal;
