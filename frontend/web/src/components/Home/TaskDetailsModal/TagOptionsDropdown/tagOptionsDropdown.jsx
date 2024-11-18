import React from 'react';

import { Menu,Text, Input,Divider } from '@mantine/core';
import { useForm } from '@mantine/form';

import { Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";

import {Icons} from '../../../icons/icons';
import { updateTagInfo } from '../../../../api/Tags/updateTag';

import "./tagOptionsDropdown.css";

const tagColors = [
    {color: '#fb7185', name: 'Rose'},
    {color: '#f472b6', name: 'Pink'},
    {color: '#c084fc', name: 'Purple'},
    {color: '#60a5fa', name: 'Blue'},
    {color: '#22b3be', name: 'Cyan'},
    {color: '#2da49f', name: 'Teal'},
    {color: '#4abe60', name: 'Green'},
    {color: '#daac15', name: 'Yellow'},
    {color: '#fb923c', name: 'Orange'},
    {color: '#9ca3af', name: 'Gray'}
];

export const TagOptionsDropdown = (props) => {
    const { tagItems, allTagData, handleAddTag,setOpenTagDeletionModal,setTagToDelete,setOpenParentTagDropdown,
        activeChildDropdownIndex,setActiveChildDropdownIndex,enableScroll,colorScheme,themeColors
    } = props;

    const handleTagRename = (event,tagItem) => {
        if (event.key === 'Enter') {
            const newTagName = event.target.value;
            updateTagInfo(
                event,
                allTagData,
                tagItem.name,
                newTagName,
                null,
                tagItem
            );
        }
    }

    const handleOpenTagsOptionsMenu = (open) => {
        if (!open) {
            setActiveChildDropdownIndex(null);
        }
    };

    const handleTagColorChange = (tagItem,colorItem) => {
        updateTagInfo(
            null,
            allTagData,
            null,
            null,
            colorItem.color,
            tagItem
        );
    }

    const handleOpenTagDeletionModal = (tagItem) => {
        setTagToDelete(tagItem);
        setActiveChildDropdownIndex(null);
        setOpenParentTagDropdown(false);
        enableScroll();
        setTimeout(() => {
            setOpenTagDeletionModal(true);
        }, 300);
    }

    return (
        <>
            <div className='model-dropdown-items my-1' >
                <Menu>
                    {tagItems.map((tagItem, index) => (
                        <Menu.Item
                            c='#f2f4f7'
                            w='90%'
                            bg={`${colorScheme==='dark' ? '#232426' : '#f0f0f0'}`}
                            ff='Lato'
                            key={index}
                            className={`task-card-content-dropdown-item ${colorScheme}`}
                            onClick={() => handleAddTag(tagItem)}
                            rightSection={
                                <Popover placement="right-end" isOpen={index===activeChildDropdownIndex} onOpenChange={(open) => {handleOpenTagsOptionsMenu(open)}}>
                                    <PopoverTrigger className='tags-dropdown-popover-trigger' onClick={(e) => {e.stopPropagation(); setActiveChildDropdownIndex(index)}}>
                                        <div className={`tag-options-button-div ${colorScheme}`} >
                                                {Icons('IconDots',17,24,themeColors.text[1])}
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className={`p-0 tags-dropdown-popover-parent ${colorScheme}`} onClick={(e) => e.stopPropagation()}>
                                        <div className=' p-2' style={{width: "250px",pointerEvents: `${activeChildDropdownIndex !== null ? 'auto' : 'none'}`}}>
                                            <div className='px-1 pt-1'>
                                                <Input 
                                                    w='97.5%'
                                                    placeholder="Name" 
                                                    defaultValue={tagItems[index] && tagItems[index].name} 
                                                    onKeyDown={(event) => handleTagRename(event,tagItem)}
                                                    className={`tag-options-input ${colorScheme}`}
                                                />
                                            </div>
                                            <div className='px-1 py-1'>
                                                <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                                                    {tagColors.map((colorItem, index) => (
                                                        <div key={index} style={{ width: '50%' }}>
                                                            <Menu.Item w='75%' bg='transparent' className={`tag-options-menu-item ${colorScheme}`} onClick={() => handleTagColorChange(tagItem, colorItem)}>
                                                                <div className='d-flex gap-3 align-items-center'>
                                                                    <div style={{ backgroundColor: colorItem.color, width: '20px', height: '20px', borderRadius: '3px' }} />
                                                                    <Text c={themeColors.text[1]}>{colorItem.name}</Text>
                                                                </div>
                                                            </Menu.Item>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <Divider bd={`.1px solid ${themeColors.text[11]}`} />
                                            <div className="px-1 mt-1">
                                                <Menu.Item w='87%' c='#fafafa' bg='transparent' className={`tag-options-menu-item ${colorScheme}`} onClick={() => handleOpenTagDeletionModal(tagItem)}>
                                                    <div className='d-flex align-items-center gap-3'>
                                                        {Icons('IconTrash',20,24,themeColors.text[1])}
                                                        <Text c={themeColors.text[1]}>Delete</Text>
                                                    </div>
                                                </Menu.Item>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            }
                        >
                            <Text w='fit-content' className='user-home-task-details-modal-head-text-dropdown-value' bg={`${tagItem.color}`}>{tagItem.name}</Text>
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
        </>
    );
};