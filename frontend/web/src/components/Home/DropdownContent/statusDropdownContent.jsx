import React, { useState,useEffect } from 'react';

import { Menu, Input,Text } from '@mantine/core';
import {Icons} from '../../icons/icons';

import { items } from './items';

import './dropdownContent.css';

const StatusDropdownContent = (props) => {
    const {element,handleTaskUpdateNew, taskType,setTaskType,idx,setCurrentTaskStatus,existingTask,themeColors,colorScheme,
        dropdownColor } = props;
    
    const originalStatusItems = items("status",themeColors);
    const statusNames = originalStatusItems.map(item => item.name);
    const [statusItems, setStatusItems] = useState(statusNames);
    const [statusInputValue, setStatusInputValue] = useState('');
    
    async function handleStatusSearch(event) {
        const statusInput = event.target.value;
        if (event.key === 'Enter' && !/^\s*$/.test(statusInput)) {
            // console.log(statusItems.filter(item => console.log(item)));
            // console.log(statusItems.filter(item => item.name.toLowerCase() === statusInput.trim()));
            if (statusItems.filter(item => item.name.toLowerCase() === statusInput.trim())) {
                const statusEntered = statusItems.find(item => item.name.toLowerCase() === statusInput.trim());
                if (statusEntered !== undefined) {
                    try {
                        console.log(statusEntered);
                    } catch (error) {
                        console.error('Error creating status:', error);
                    }
                } else {
                    // handleTagCreation(tagName);
                }
                // setIsDropdownOpen(!isDropdownOpen);
            }
        }
        setStatusInputValue(statusInput);
    }

    useEffect(() => {
        const filteredItems = statusInputValue === ""
            ? originalStatusItems
            : originalStatusItems.filter((item) =>
                item.name.toLowerCase().startsWith(statusInputValue.toLowerCase().trim())
            );
        
        setStatusItems(filteredItems);
    }, [statusInputValue]);

    return (
        <>
            <div className='d-flex align-items-center' style={{borderBottom: "1px solid #898989", marginBottom: "6px"}}>
                <form className="model-dropdown-search" role='search' onSubmit={(event) => {event.preventDefault(); return false;}}>
                    <Input
                        className={`model-dropdown-search-input ${colorScheme}`}
                        type="text"
                        placeholder={`Search`}                                               
                        onChange={handleStatusSearch}
                        onKeyDown={handleStatusSearch}
                        value={statusInputValue}
                    />
                </form>
            </div> 
            {statusItems.length > 0 ? statusItems.map((item, index) => (
                
                <Menu.Item
                    onClick={() => {
                        existingTask && handleTaskUpdateNew(element,item.name, 'status', taskType,setTaskType,idx);
                        setCurrentTaskStatus && setCurrentTaskStatus(item.name);}
                    }
                    key={index}
                    w='87%'
                    bg={dropdownColor}
                    m='4px auto'
                    c={themeColors.text[5]}
                    ff='Lato'
                    p='6px 10px'
                    className='task-card-content-dropdown-item'
                    leftSection={item.icon}
                    rightSection={(existingTask ? element.status : element) === item.name && Icons('IconCheck',20,20,'teal')}
                >
                    {item.name}
                </Menu.Item>
            )) : 
                <Text m='8px auto' fz='14.5' w='95%' c={themeColors.text[9]}>No results</Text>
            }
        </>
    );
};

export default StatusDropdownContent;