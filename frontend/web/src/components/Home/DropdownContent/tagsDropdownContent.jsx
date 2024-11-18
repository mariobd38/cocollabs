import React, { useState, useEffect } from 'react';

import { Input,Button, Divider } from '@mantine/core';
import { getAllTagsInfo } from '../../../api/Tags/getAllTags';
import { addExistingTagInfo } from '../../../api/Tags/addExistingTag';
import { createTagInfo } from '../../../api/Tags/createTag';
import { TagOptionsDropdown } from '../TaskDetailsModal/TagOptionsDropdown/tagOptionsDropdown';

import './dropdownContent.css';
    
const TagsDropdownContent = (props) => {
    const {task, taskType,setTaskType,idx,setCurrentTaskTags,currentTaskTags, setTagToDelete,setOpenTagDeletionModal,
        openParentTagDropdown, setOpenParentTagDropdown,activeChildDropdownIndex,setActiveChildDropdownIndex,enableScroll,
        colorScheme,themeColors
     } = props;

    const [allTagData, setAllTagData] = useState([]);
    const [tagItems, setTagItems] = useState(allTagData);
    const [tagInputValue, setTagInputValue] = useState('');
    const tagNames = allTagData.map(item => item.name);
    const [nonIncludedTaskTags, setNonIncludedTaskTags] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allTagsData =  await getAllTagsInfo(setAllTagData);
                // const filteredTags = allTagsData.filter(tag => !currentTaskTags.includes(tag.name));
                const currentTaskTagsSet = new Set(currentTaskTags.map(tag => tag.name));
                const filteredTags = allTagsData.filter(tag => !currentTaskTagsSet.has(tag.name));
                setNonIncludedTaskTags(filteredTags);
                setAllTagData(allTagsData);
            } catch(error) {
                //
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idx, currentTaskTags]);

    const updateTaskTags = (updatedTags) => {
        const updatedTasks = [...taskType];
        updatedTasks[idx].tags = updatedTags;
        setTaskType(updatedTasks);
        setCurrentTaskTags([...updatedTags]);
    };

    const handleTagCreation = async (tagName) => {
        try {
            const newTag = await createTagInfo(task.id, tagName);
    
            if (newTag) {
                const updatedTags = [...currentTaskTags, newTag];
                setCurrentTaskTags(updatedTags);
                updateTaskTags(updatedTags);
            } else {
                console.error('Error creating tag: Tag data is null');
            }
        } catch (error) {
            console.error('Error creating tag:', error);
        }
    };
    
    async function handleTagSearch(event) {
        const tagInput = event.target.value;
        if (event.key === 'Enter' && !/^\s*$/.test(tagInput)) {
            if (tagNames.filter(item => item.name === tagInput.trim())) {
                const tagEntered = allTagData.find(item => item.name === tagInput.trim());
                if (tagEntered !== undefined) {
                    const isTagIncluded = currentTaskTags.some(
                        tag => tag.id === tagEntered.id
                    );
                    if (!isTagIncluded) {
                        handleAddTag(tagEntered)
                    }
                } else {
                    handleTagCreation(tagInput);
                    setTagInputValue('');
                }
                return;
            }
        }
        setTagInputValue(tagInput);
    }

    useEffect(() => {
        const filteredItems = tagInputValue === ""
            ? nonIncludedTaskTags
            : nonIncludedTaskTags.filter((item) =>
                item.name.toLowerCase().startsWith(tagInputValue.toLowerCase().trim())
            );
        
        setTagItems(filteredItems);
    }, [tagInputValue,allTagData,nonIncludedTaskTags]);

    // console.log(ref.current.offsetWidth);
    
    async function handleAddTag (item) {
        try {
            const addedTag = await addExistingTagInfo(task.id,item.id);
            if (addedTag) {
                const updatedTags = [...currentTaskTags, addedTag];
                setCurrentTaskTags(updatedTags);
                setTagInputValue('');
            } else {
                console.error('Error creating tag: Tag data is null');
            }
        } catch (error) {
            console.error('Error creating tag:', error);
        }
    }
    // console.log(openParentTagDropdown && activeChildDropdownIndex === null);
    // console.log(openParentTagDropdown);
    return (
        <div style={{width: "240px", pointerEvents: `${openParentTagDropdown && activeChildDropdownIndex === null ? 'auto' : 'none'}`}}>
            {currentTaskTags.length > 0 &&
            <><div className='py-2 px-1 d-flex flex-wrap user-home-task-details-modal-tags-button-parent'>
                {currentTaskTags.map((item, index) => (
                    <Button key={index} bg={item.color} className='user-home-task-details-modal-tags-button' fw={400} h='22' ff='Lato' fz={16}>
                        {item.name}
                    </Button>
                ))}
            </div>
            <Divider color={`${colorScheme==='dark' ? '#595959' : '#a9a9a9'}`} />
            </>}
            <div className='model-dropdown-search-wrapper'>
                <div className='d-flex align-items-center' style={{borderBottom: `1px solid ${colorScheme==='dark' ? '#595959' : '#a9a9a9'}`}}>
                    <form className="model-dropdown-search" role='search' onSubmit={(event) => {event.preventDefault(); return false;}}>
                        <Input
                            className={`form-control model-dropdown-search-input ${colorScheme}`}
                            type="text"
                            placeholder={`Search or create a new tag`}                                               
                            onChange={handleTagSearch}
                            onKeyDown={handleTagSearch}
                            value={tagInputValue}
                        />
                    </form>
                </div> 
            </div>
            <TagOptionsDropdown 
                tagItems = {tagItems}
                allTagData={allTagData}
                handleAddTag={handleAddTag}
                setOpenTagDeletionModal={setOpenTagDeletionModal}
                setTagToDelete={setTagToDelete}
                setOpenParentTagDropdown={setOpenParentTagDropdown}
                activeChildDropdownIndex={activeChildDropdownIndex}
                setActiveChildDropdownIndex={setActiveChildDropdownIndex}
                enableScroll={enableScroll}
                colorScheme={colorScheme}
                themeColors={themeColors}
            />
        </div>
    );
};

export default TagsDropdownContent;