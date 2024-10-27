import React, { useState, useRef, useCallback } from 'react';
import { useScrollLock } from '../../../utils/useScrollLock';

import { Menu } from '@mantine/core';

const MantineDropdown = (props) => {
    const { background,target,width,dropdown,childDropdownOpened,position,dmt,setModalDropdownIsOpen,colorScheme } = props;

    const [menuOpened, setMenuOpened] = useState(false);
    const dropdownRef = useRef(null);
    const { disableScroll, enableScroll } = useScrollLock();

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
                    boxShadow: "0 2px 16px #0006",
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
