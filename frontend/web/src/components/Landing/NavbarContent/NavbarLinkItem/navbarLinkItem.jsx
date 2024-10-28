import React, { useEffect, useState } from 'react';

import {
    Group,
    UnstyledButton,
    Text,
    ThemeIcon
  } from '@mantine/core';
import {Icons} from '../../../icons/icons';

import classes from './../../NavbarContent/NavbarContent.module.css';

const NavbarLinkItem = ({ mockdata, drawerOpened,closeDrawer }) => {
    const [paddingStart, setPaddingStart] = useState(drawerOpened ? 22.5 : 0);
    const [alignment, setAlignment] = useState(drawerOpened ? 'start' : 'center');
  
    const updatePaddingAndAlignment = () => {
      const screenWidth = window.innerWidth;
      const isLargeScreen = screenWidth > 992;

      if (isLargeScreen) {
        closeDrawer();
        setPaddingStart(0);
        setAlignment('center');
      } else {
        setPaddingStart(drawerOpened ? 22.5 : 0);
        setAlignment(drawerOpened ? 'start' : 'center');
      }
    };
  
    useEffect(() => {
      updatePaddingAndAlignment();
  
      window.addEventListener('resize', updatePaddingAndAlignment);
  
      return () => {
        window.removeEventListener('resize', updatePaddingAndAlignment);
      };
    }, [drawerOpened]);

    return (
        mockdata.map((item,index) => (
            <UnstyledButton className={classes.subLink} key={index} mb={drawerOpened ? 5 : 0} py={5} >
                <Group wrap="nowrap" mx={10} my={5} align={alignment} ps={paddingStart}>
                    <ThemeIcon bd='1px solid #c6c8da' bg='#fafafa' size={34} variant="default" radius="md" className="d-flex align-items-center">
                        {Icons(item.icon, 22, 22, '#367179')}
                    </ThemeIcon>
                    <div>
                        <Text size="sm" fw={500}>
                            {item.title}
                        </Text>
                        <Text size="xs" c="dimmed">
                            {item.description}
                        </Text>
                    </div>
                </Group>
            </UnstyledButton>)
        )
    );
};

export default NavbarLinkItem;