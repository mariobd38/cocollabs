import React, {forwardRef} from 'react';

import { Menu,Box,Text } from '@mantine/core';

import { Icons } from '@/components/icons/icons';

const TaskDescriptionTipTapOptionsMenu = forwardRef(( props, ref) => {
    const {onClose, menuPosition, menuOpened, setMenuOpened, editor,colorScheme,themeColors} = props;

    const menuItems = [
        { label: 'Paragraph', icon: 'IconClearFormatting', 
            command: <span className='rte-styles-options-menu-item'>{Icons('IconCommand',22,24)}{Icons('IconAlt',30,24)}{Icons('IconNumber0',22,24)}</span>, 
            action: () => {editor.chain().focus(); editor.commands.setParagraph();} },
        { label: 'Heading 1', icon: 'IconH1', 
            command: <span className='rte-styles-options-menu-item'>{Icons('IconCommand',22,24)}{Icons('IconAlt',30,24)}{Icons('IconNumber1',22,24)}</span>, 
            action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
        { label: 'Heading 2', icon: 'IconH2', 
            command: <span className='rte-styles-options-menu-item'>{Icons('IconCommand',22,24)}{Icons('IconAlt',30,24)}{Icons('IconNumber2',22,24)}</span>, 
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
        { label: 'Heading 3', icon: 'IconH3', 
            command: <span className='rte-styles-options-menu-item'>{Icons('IconCommand',22,24)}{Icons('IconAlt',30,24)}{Icons('IconNumber3',22,24)}</span>, 
            action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
        { label: 'Blockquote', icon: 'IconQuote', 
            command: <span className='rte-styles-options-menu-item' >{Icons('IconCommand',22,24)}{Icons('IconArrowBigUp',22,24)}{Icons('IconLetterB',22,24)}</span>, 
            action: () => editor.chain().focus().toggleBlockquote().run() },
        { label: 'Ordered list', icon: 'IconListNumbers', 
            command: <span className='rte-styles-options-menu-item' >{Icons('IconCommand',20,24)}{Icons('IconArrowBigUp',22,24)}{Icons('IconNumber7',22,24)}</span>,
            action: () => {editor.chain().focus(); !editor.isActive('orderedList') && editor.chain().focus().toggleOrderedList().run();} },
        { label: 'Bulleted list', icon: 'IconList', 
            command: <span className='rte-styles-options-menu-item' >{Icons('IconCommand',22,24)}{Icons('IconArrowBigUp',20,24)}{Icons('IconNumber8',20,24)}</span>,
            action: () => {editor.chain().focus(); !editor.isActive('bulletList') && editor.chain().focus().toggleBulletList().run();} },
        { label: 'Checklist', icon: 'IconListCheck', 
            command: <span className='rte-styles-options-menu-item' >{Icons('IconCommand',22,24)}{Icons('IconArrowBigUp',22,24)}{Icons('IconNumber9',22,24)}</span>,
            action: () => {editor.chain().focus(); !editor.isActive('taskList') && editor.chain().focus().toggleTaskList().run(); } },
        { label: 'Code block', icon: 'IconCode', 
            command: <span className='rte-styles-options-menu-item' >{Icons('IconCommand',22,24)}{Icons('IconAlt',22,24)}{Icons('IconLetterC',22,24)}</span>,
            action: () => {editor.chain().focus().toggleCodeBlock().run();} },
        { label: 'Divider', icon: 'IconSeparatorHorizontal', 
            command: <span className='rte-styles-options-menu-item'>{Icons('IconCommand',22,24)}{Icons('IconArrowBigUp',22,24)}{Icons('IconMinus',22,24)}</span>, 
            action: () => {editor.commands.setHorizontalRule();} },
    ];
    const boxBg = colorScheme==='dark' ? '#28292b' : '#f2f2f5';

    return (
        <Box 
            // bg='#28292b'
            bg={boxBg}
            w='270px'
            ref={ref}
            style={{ 
                borderRadius: "7px", 
                position: 'absolute', 
                top: menuPosition && menuPosition.top,
                left: menuPosition && menuPosition.left,
                zIndex: 1000,
                pointerEvents: "auto",
                // transform: menuPosition.placement === 'above' ? 'translateY(0)' : 'translateY(0)',
                // transition: 'all 0.2s ease-out',
            }}
        >
            <Menu
                closeOnClickOutside={true}
                opened={menuOpened}
                onClose={onClose}
                withinPortal
            >
                <Box className='tip-tap-format p-2' bg={boxBg} style={{borderRadius: "8px", boxShadow: "0 14px 38px rgba(0, 0, 0, 0.35)", maxHeight: "300px", overflow: "auto"}} >
                    <Menu.Label ps={7} c={`${colorScheme==='dark' ? '#8a929b' : '#6b6b6b'}`} fz='13'>Formatting</Menu.Label>
                    <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                        {menuItems.map((item, index) => (
                            <div key={index} style={{ width: '100%' }} className='me-1'>
                                <Menu.Item 
                                    className={`rte-styles-options-button pe-2 ${colorScheme}`}
                                    key={index}
                                    w='92%' 
                                    style={{borderRadius: "6px"}}
                                    // bg='#28292b' 
                                    bg={boxBg}
                                    c={themeColors.text[4]}
                                    // c='#eaebed'
                                    onClick={(e) => {
                                        item.action();
                                        setMenuOpened(false);
                                    }}
                                    leftSection={Icons(item.icon,18,18)}
                                    rightSection={item.command}
                                >
                                    <div className='d-flex gap-3 align-items-center me-3'>
                                        <div />
                                        <Text c={themeColors.text[4]} fz={13.7}>{item.label}</Text>
                                    </div>
                                </Menu.Item>
                            </div>
                        ))}
                    </div>
                </Box>
            </Menu>
        </Box>
    );
});

TaskDescriptionTipTapOptionsMenu.displayName = "TaskDescriptionTipTapOptionsMenu";


export default TaskDescriptionTipTapOptionsMenu;