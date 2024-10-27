import React from 'react';

import { Menu,Divider } from '@mantine/core';
import {Icons} from '../../icons/icons';

import { items } from './items';

import './dropdownContent.css';

const PriorityDropdownContent = (props) => {
    const {element,handleTaskUpdateNew, taskType,setTaskType,idx,setCurrentTaskPriority,existingTask,themeColors,
        dropdownColor } = props;
    const priorityItems = items("priority",themeColors);
    const itemsToRender = (existingTask ? element.priority : element)
        ? priorityItems 
        : priorityItems.slice(0, 4);

    return (
        <>
            {itemsToRender.map((item, index) => (
                <React.Fragment key={index}>
                    {index === itemsToRender.length - 1 && (existingTask ? element.priority : element)  && <Divider my="7.5" color='grey' />}
                    <Menu.Item
                        onClick={() => {
                            existingTask && setTimeout(() => handleTaskUpdateNew(element, item.name, 'priority', taskType, setTaskType, idx), 50);
                            setCurrentTaskPriority && setCurrentTaskPriority(item.name === 'None' ? null : item.name)
                        }}
                        w='87%'
                        m='4px auto'
                        bg={dropdownColor}
                        c={themeColors.text[5]}
                        ff='Lato'
                        p='6px 10px'
                        className='task-card-content-dropdown-item'
                        leftSection={item.icon}
                        rightSection={(existingTask ? element.priority : element) === item.name && Icons('IconCheck',20,20,'teal')}
                    >
                        {item.name}
                    </Menu.Item>
                </React.Fragment>
            ))}
        </>
    );
};

export default PriorityDropdownContent;