import React, { useState, useRef, useCallback } from 'react';

import { Menu } from '@mantine/core';

import { useScrollLock } from '@/utils/useScrollLock';

const MantineDropdown = (props) => {
    const { background,target,width,dropdown,childDropdownOpened,position,dmt,setModalDropdownIsOpen,colorScheme,modalName } = props;

    const [menuOpened, setMenuOpened] = useState(false);
    const dropdownRef = useRef(null);
    const { disableScroll, enableScroll } = useScrollLock(modalName);

    const shouldEnablePointerEvents = () => {
        return menuOpened;
    };

    const handleClose = useCallback(() => {
        setMenuOpened(false);
        enableScroll();
        setTimeout(() => {
            setModalDropdownIsOpen && setModalDropdownIsOpen(false);
        },200);

    }, [enableScroll,setModalDropdownIsOpen]);

    const boxShadowBg = colorScheme==='dark' ? '0 2px 16px #0006' : '0 2px 16px #0002';

    return (
        <Menu shadow="md" width={width} position={position} offset={12} zIndex={1000000}
            closeOnEscape={true}
            opened={menuOpened}
            closeOnClickOutside
            closeOnItemClick={!childDropdownOpened}
            onOpen={() => {
                setMenuOpened(true);
                disableScroll();
            }}
            onClose={() => handleClose(true)}
        >
            <Menu.Target>
                {target}
            </Menu.Target>

            <Menu.Dropdown
                className={`mantine-dropdown-model ${colorScheme}`}
                bd='0'
                bg={background}
                ref={dropdownRef}
                style={{
                    pointerEvents: shouldEnablePointerEvents() ? "auto" : "none",
                    boxShadow: boxShadowBg,
                    borderRadius: "6px",
                    marginTop: dmt || '0'
                }}
                onClick={(event) => event.stopPropagation()}
            >
                {dropdown}
            </Menu.Dropdown>
        </Menu>
    );
};

export {MantineDropdown};
