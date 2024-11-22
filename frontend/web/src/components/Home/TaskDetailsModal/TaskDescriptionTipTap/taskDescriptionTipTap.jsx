import React, { useEffect, useRef, useState } from 'react';

import { Spoiler } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { RichTextEditor } from '@mantine/tiptap';

import { GetEditor } from '@/components/Home/TaskDetailsModal/TaskDescriptionTipTap/customEditor';
import TaskDescriptionTipTapOptionsMenu from '@/components/Home/TaskDetailsModal/TaskDescriptionTipTap/taskDescriptionTipTapOptionsMenu';

import { useScrollLock } from '@/utils/useScrollLock';

import './taskDescriptionTipTap.css'

const TaskDescriptionTipTap = (props) => {
    const {content, currentIndex,taskType,setTaskType,handleTaskUpdateNew,setNewTaskDescription,expanded,setExpanded,
        colorScheme,themeColors,modalName
    } = props;

    const taskTypeRef = useRef(taskType);
    const currentIndexRef = useRef(currentIndex);
    const [menuOpened, setMenuOpened] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const editorRef = useRef(null);
    const ref = useClickOutside(() => {enableScroll(); setMenuOpened(false);});

    const { disableScroll, enableScroll } = useScrollLock(modalName); 

    useEffect(() => {
        taskTypeRef.current = taskType;
        currentIndexRef.current = currentIndex;
    }, [taskType,currentIndex]);


    const editor = GetEditor({
        content, 
        currentIndexRef, 
        taskTypeRef, 
        setTaskType, 
        handleTaskUpdateNew,
        setNewTaskDescription
    });

    useEffect(() => {
        editor?.commands.setContent(content || "", false, {
            preserveWhitespace: true,
        });
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content]);


    const handleChange = () => {
        const currentLine = getCurrentLine();
        if (currentLine) {
            const textContent = currentLine.textContent.trim();
            if (textContent === "/") {

                const rect = currentLine.getBoundingClientRect();
                const editorRect = editorRef.current.getBoundingClientRect();
                const leftInc = 10;
                
                // Calculate left position relative to editor
                const left = (rect.left + leftInc) - editorRect.left;
                
                // Get viewport height and cursor position relative to viewport
                const viewportHeight = window.innerHeight;
                const cursorPositionInViewport = rect.top - window.scrollY;
                
                // Get the editor's bounds
                const editorBounds = contentRef.current.getBoundingClientRect();
                const spaceBelow = viewportHeight - cursorPositionInViewport;
                const spaceAbove = cursorPositionInViewport;
                
                const menuHeight = 300; // approximate height of your menu
                const menuPadding = 15; // desired padding from cursor
                
                const shouldPositionAbove = spaceAbove > spaceBelow;
                const top = shouldPositionAbove ? rect.top - editorBounds.top - menuHeight - menuPadding : 
                    rect.top - editorBounds.top + rect.height + menuPadding;

                setMenuPosition({
                    top,
                    left,
                    placement: shouldPositionAbove ? 'above' : 'below'
                });
                setMenuOpened(true);
                disableScroll();
            } else {
                setMenuOpened(false);
                enableScroll();
            }
        }
    }

    const getCurrentLine = () => {
        const selection = window.getSelection();
        const anchorNode = selection.anchorNode;
        
        let currentLine = anchorNode;
        while (currentLine && currentLine.nodeType !== Node.ELEMENT_NODE) {
            currentLine = currentLine.parentElement;
        }
        return currentLine;
    }
    // console.log(window.getSelection().toString());
    
    const [isSpoilerButtonVisible, setIsSpoilerButtonVisible] = useState(false);

    useEffect(() => {
        const checkSpoilerButton = () => {
            const spoilerButton = document.querySelector('.' + modalName + ' .rte-spoiler button');
            setIsSpoilerButtonVisible(!!spoilerButton);
        };

        checkSpoilerButton();

        const observer = new MutationObserver(checkSpoilerButton);
        observer.observe(document.querySelector('.' + modalName + ' .rte'), { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [modalName]);
    // console.log(isSpoilerButtonVisible);                                                                                         


    // console.log(handleTaskUpdateNew && !expanded);

    const tiptapBg = `${(colorScheme==='dark' && handleTaskUpdateNew) ? '#222325' : (colorScheme==='light' && handleTaskUpdateNew) ? '#eceef1' : 'transparent'}`;
    const tiptapBd = `1px solid ${colorScheme==='dark' && handleTaskUpdateNew ? '#47494d' : (colorScheme==='light' && handleTaskUpdateNew) && '#c7c7c7' }`
    const contentRef = useRef(null);

    return (
        <>
        <div className="rich-text-editor-wrapper" ref={editorRef} >
            <RichTextEditor editor={editor} onInput={handleChange}
                style={{border: tiptapBd, paddingBottom: `${handleTaskUpdateNew && !expanded && isSpoilerButtonVisible ? '50px' : '0'}`}} 
                className={`rte ${(handleTaskUpdateNew && !expanded && isSpoilerButtonVisible) && `not-expanded ${colorScheme}`}`} 
                bg={tiptapBg}
                >

                {handleTaskUpdateNew ? <Spoiler maxHeight={280} w='100%'
                    showLabel={`${!expanded || isSpoilerButtonVisible ? 'Show more' : ''}`} 
                    className={`rte-spoiler ${!expanded ? 'unexpanded' : 'mb-0'}`}
                    expanded={expanded} 
                    onExpandedChange={setExpanded} 
                    transitionDuration={2000}
                >
                    <RichTextEditor.Content onClick={() => setExpanded(true)} bg={tiptapBg} content={content} 
                    c={themeColors.text[1]} className={`rte-content ${colorScheme}`} ref={contentRef} />
                </Spoiler> : 
                    <RichTextEditor.Content bg={tiptapBg} content={content} 
                    c={themeColors.text[1]} className={`rte-content overflow ${colorScheme}`} ref={contentRef} />
                }
                {/* <Spoiler maxHeight={280} w='100%'
                    showLabel={`${!expanded || isSpoilerButtonVisible ? 'Show more' : ''}`} 
                    className={`rte-spoiler ${!expanded ? 'unexpanded' : 'mb-0'}`}
                    expanded={expanded} 
                    onExpandedChange={setExpanded} 
                    transitionDuration={2000}
                >
                    <RichTextEditor.Content onClick={() => setExpanded(true)} bg={tiptapBg} content={content} 
                    c={themeColors.text[1]} className='rte-content' ref={contentRef} />
                </Spoiler> */}

                {menuOpened && (
                    <TaskDescriptionTipTapOptionsMenu 
                        ref={ref}
                        onClose={() => {setMenuOpened(false); enableScroll();}}
                        menuPosition={menuPosition}
                        menuOpened={menuOpened}
                        setMenuOpened={setMenuOpened}
                        editor={editor}
                        colorScheme={colorScheme}
                        themeColors={themeColors}
                    />
                )}
            </RichTextEditor>
        </div>
        </>
    );
};

export default TaskDescriptionTipTap;