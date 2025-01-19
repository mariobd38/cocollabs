import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import { Group,Flex,Divider,Box,Button,Burger,Drawer,ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Logo2 from '@/components/Logo/logo2';

import './NavbarContent.css';
import classes from './NavbarContent.module.css';

const NavbarContent = (props) => {
    const {scrollPosition} = props; 

    let navigate = useNavigate(); 
    const routeChange = (path) =>{ 
        navigate(path);
    }

    // mantine
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 991) {
                closeDrawer();  // Call your function to close the drawer
              }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [closeDrawer]);

    const navItems = ['Projects', 'Communities', 'Resources', 'Pricing'];

    return (
        <Box pb={0} className="sticky-top">
            <Box className={classes.header} bg='hsl(222.2 84% 4.9%)' 
                style={() => ({
                    boxShadow: scrollPosition > 40 ? '#162a53a0 0px 12px 70px 6px' : 'none',
                    transition: 'padding 0.4s ease-in-out, box-shadow 0.3s ease-in-out'
                })}
                px={{base: 25, xs: 40}}
            >
                <Group justify="space-between" h="100%" >
                    <Flex gap={70} align='center' >
                        <Flex w="9.5rem" >
                            <Logo2 strokeColor='#fafafa' />
                        </Flex>

                        <Group h="100%" gap={10} visibleFrom="md" >
                            {navItems.map((item,index) => (
                                <a key={index} className='landing-nav-button text-gray-300 hover:text-[white]' href={() => false}>
                                    {item}
                                </a>
                            ))}
                        </Group>
                    </Flex>


                    <Group visibleFrom="md">

                        <div className='d-flex gap-2 align-items-center'>

                            <Button className='landing-nav-button item bg-transparent' onClick={() => routeChange('/login')}>
                                Login
                            </Button>
                            <Button className='landing-nav-button signup' onClick={() => routeChange('/signup')}>
                                Sign up
                            </Button>
                        </div>
                    </Group>

                    <Burger opened={drawerOpened} className={`navbar-content-burger ${scrollPosition > 40 && 'scrolled'}`} onClick={toggleDrawer} hiddenFrom="md" />
                </Group>
            </Box>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="540px"
                removeScrollProps={{ allowPinchZoom: true }}
                padding="0"
                className='navbar-drawer'
                position="top"
                hiddenFrom="md"
                zIndex={1000}
                transitionProps={{
                    duration: 450,
                    timingFunction: 'cubic-bezier(0.4, 0, 0.2, .4)',
                    // transition: {
                    //     in: { opacity: 1, transform: 'translateY(0)' },
                    //     out: { opacity: 0.1, transform: 'translateY(-80%)' },
                    //     common: { transition: 'transform 480ms ease-in-out, opacity 480ms ease-in-out' },
                    //     transitionProperty: 'transform, opacity'
                    // },
                }}
            >
                <ScrollArea h='480px' w='100%' bg='hsl(222.2 84% 4.9%)'>
                    <Divider mb="35" bd='.1px solid #c5c5c5' />

                    <Flex align='center' direction='column' pt={5} pb={5} gap={5} >
                        {navItems.map((item,index) => (
                            <Flex key={index} w='90%' m='auto' direction='column' >
                                <Button w='100%' className='navbar-drawer-nav-item'>
                                    <span style={{padding: "0px 10px"}}>{item}</span>
                                </Button>
                            </Flex>
                        ))}
                    </Flex>

                    <Group m='auto' w='90%' justify="center" grow gap={30} h={150} >
                        <Flex direction={{base: 'column', sm: 'row'}} gap={30} justify='space-between' grow >
                            <Button onClick={() => routeChange('/login')} bg='#162a53'  w={{base: 'auto', sm: '100%'}} className='navbar-drawer-nav-login-signup'>Login</Button>
                            <Button onClick={() => routeChange('/signup')} bg='#eaeaea' c='#202' w={{base: 'auto', sm: '100%'}} className='navbar-drawer-nav-login-signup'>Sign up</Button>
                        </Flex>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}

export default NavbarContent;
