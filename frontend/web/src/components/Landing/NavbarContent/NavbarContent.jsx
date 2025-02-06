import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { Group,Flex,Divider,Box,Burger,Drawer,Anchor } from '@mantine/core';
import { Button } from "@/components/ui/button"
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
        <Box pb={0} className="sticky-top border-b border-b-gray-800" h={65} bg='hsl(240 10% 3.9%)' px={{base: 25, xs: 40}}>
            <div className='h-full'>
                <div className='flex justify-between items-center h-full' >
                    <div className='flex items-center gap-12' >
                        <div className='w-32' >
                            <Logo2 strokeColor='#fafafa' />
                        </div>

                        <Group h="100%" gap={10} visibleFrom="md" >
                            {navItems.map((item,index) => (
                                <a key={index}  className='landing-nav-button font-medium text-gray-400 hover:text-[white]' href={() => false}>
                                    {item}
                                </a>
                            ))}
                        </Group>
                    </div>

                    <Flex gap={30}>
                    <Group visibleFrom="sm" >

                        <div className='flex gap-7'>
                             <Button variant='ghost' className='h-9 landing-nav-button font-medium item text-white border-solid border-[transparent] hover:bg-zinc-900' onClick={() => routeChange('/login')}>
                                 Login
                             </Button>
                             <Button variant='ghost' className='h-9 landing-nav-button font-medium signup bg-white border-solid border-white' onClick={() => routeChange('/signup')}>
                                 Sign up
                             </Button>
                         </div>
                    </Group>

                    <Burger opened={drawerOpened} className={`navbar-content-burger ${scrollPosition > 40 && 'scrolled'}`} onClick={toggleDrawer} hiddenFrom="md" />
                    </Flex>
                </div>
            </div>

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
                    duration: 400,
                    timingFunction: 'cubic-bezier(0.4, 0, 0.2, .4)'
                }}
            >
                <div className='h-full w-full bg-[hsl(240,10%,3.9%)]'>
                    <Divider mb="35" bd='.1px solid #c5c5c5' />

                    <Flex align='center' direction='column' pt={5} pb={5} gap={5} >
                        {navItems.map((item,index) => (
                            <Flex key={index} w='90%' m='auto' direction='column' >
                                <Button w='100%' className='navbar-drawer-nav-item flex h-8'>
                                    <span style={{padding: "0px 10px"}}>{item}</span>
                                </Button>
                            </Flex>
                        ))}
                    </Flex>

                    <div className='h-full flex m-auto justify-center grow w-full flex-col w-10/12' >
                        <Flex display={{base: 'flex', sm: 'none'}} direction='column' gap={30} justify='space-between' grow >
                            <Button onClick={() => routeChange('/login')} bg='#162a53'  w={{base: 'auto', sm: '100%'}} className='h-8 navbar-drawer-nav-login-signup'>Login</Button>
                            <Button onClick={() => routeChange('/signup')} bg='#eaeaea' c='#202' w={{base: 'auto', sm: '100%'}} className='h-8 navbar-drawer-nav-login-signup'>Sign up</Button>
                        </Flex>
                    </div>
                </div>
            </Drawer>
        </Box>
    );
}

export default NavbarContent;
