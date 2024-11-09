import React, {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";

import {Icons} from '../../icons/icons';

import { HoverCard,Group,Flex,Divider,Center,Box,Button,Burger,Drawer,Collapse,ScrollArea,
        rem,useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Logo2 from '../../Logo/logo2';
import NavbarLinkItem from './NavbarLinkItem/navbarLinkItem';

// import { NavigationMenuComp } from '@/components/ui/NavigationMenu/navigationMenuComp';

import './NavbarContent.css';
import classes from './NavbarContent.module.css';

const platformMockdata = [
    {
        icon: 'IconClipboardList',
        title: 'Tasks and Projects',
        description: 'Manage and monitor your progress to achieve your goals',
    },
    {
        icon: 'IconFiles',
        title: 'Docs',
        description: 'Create and collaborate on online documents',
    },
    {
        icon: 'IconCalendarWeek',
        title: 'Calendar',
        description: 'Organize and keep track of events and deadlines',
    },
    {
        icon: 'IconApps',
        title: 'Apps and Integration',
        description: 'Align your progress into a single workspace',
    },
    {
        icon: 'IconSTurnRight',
        title: 'Workflow and Automation',
        description: 'Make work easier, faster, and more consistent',
    },
    {
        icon: 'IconChalkboard',
        title: 'Whiteboards',
        description: 'Bring ideas into life with visual collaboration',
    },
];

const solutionsMockdata = [
    {
        icon: 'IconSettings',
        title: 'Engineering',
    },
    {
        icon: 'IconLayoutKanban',
        title: 'Agile Management',
    },
    {
        icon: 'IconBrush',
        title: 'Design',
    },
    {
        icon: 'IconTargetArrow',
        title: 'Goal Management',
    },
    {
        icon: 'IconBrandProducthunt',
        title: 'Product',
    },
    {
        icon: 'IconTimeline',
        title: 'Resource Planning',
    },
    {
        icon: 'IconAd2',
        title: 'Marketing',
    },
    {
        icon: 'IconChartHistogram',
        title: 'Technical Diagramming',
    },
];

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
        <>
            <Box pb={0} className={"sticky-top"}>
                <Box className={classes.header} bg='linear-gradient(0.25turn,#101216, #0e1523)' 
                    style={() => ({
                        // borderBottom: scrollPosition > 40 ? '2.7px solid #5050a6aa' : 'none',
                        // 162a53
                        boxShadow: scrollPosition > 40 ? '#162a53a3 0px 12px 70px 6px' : 'none',
                        transition: 'padding 0.4s ease-in-out, box-shadow 0.3s ease-in-out'
                    })}
                    px={{base: 15, xs: 40, sm: 20, md: 15, lg: 40, xl: 120}}
                >
                    <Group justify="space-between" h="100%" >
                        <Flex gap={35} >

                            <Flex style={{width: "9.5rem"}}>
                                <Logo2 strokeColor='#fafafa' />
                            </Flex>

                            <Group h="100%" gap={5} visibleFrom="md" >
                                {navItems.map((item,index) => (
                                    <Button key={index} className='landing-nav-button item' >
                                        {item}
                                    </Button>
                                ))}
                            </Group>
                        </Flex>


                        <Group visibleFrom="md">

                            <div className='d-flex gap-2 align-items-center'>

                                <Button className='landing-nav-button item' >
                                    Log In
                                </Button>
                                <Button className='landing-nav-button signup' onClick={() => routeChange('/signup')}>
                                    Sign Up
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
                        duration: 600, // Increase for slower animation
                        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', // Different easing function
                        // transition: 'slide-down'
                        transition: {
                            in: { opacity: 1, transform: 'translateY(0)' },
                            out: { opacity: 0.2, transform: 'translateY(-80%)' },
                            common: { transition: 'transform 550ms ease-in-out, opacity 550ms ease-in-out' },
                            transitionProperty: 'transform, opacity'
                        },
                    }}
                >
                    <ScrollArea h='480px' w='100%' bg='linear-gradient(0.25turn,#101216, #0e1523)'>
                        <Divider mb="35" bd='.1px solid #c5c5c5' />
                        <Flex align='center' direction='column' pt={15} pb={5} gap={10}>

                        {/* <UnstyledButton className={classes.link + " w-100"} onClick={togglePlatform}>
                            <Center inline className='w-100'>
                                <Box component="span" className={classes.platformlink + " " + classes.link}>
                                    Projects
                                </Box>
                            </Center>
                        </UnstyledButton> */}

                        {navItems.map((item,index) => (
                            <Flex key={index} w='80%' m='auto' direction='column'>
                                <Button w='100%' className='navbar-drawer-nav-item'>
                                    <span style={{padding: "0px 10px"}}>{item}</span>
                                </Button>
                                <Divider c='red' bd='.1px solid #464646' orientation='vertical' />
                            </Flex>
                        ))}
                        
                        {/* <Collapse className='my-1' in={solutionsOpened}>{solutionsLinks}</Collapse> */}

                        {/* <a href={() => false} className={classes.link}>
                            Resources
                        </a>
                        <a href={() => false} className={classes.link}>
                            Pricing
                        </a> */}
                        </Flex>

                        {/* <Divider my="md" bd='.1px solid #c5c5c5' /> */}

                        
                        <Group m='auto' w='80%' justify="center" grow gap={30} h={150} >
                            <Flex direction={{base: 'column', sm: 'row'}} gap={30} justify='space-between' grow >
                                {/* <Button onClick={() => routeChange('/login')} 
                                    className={`px-3 py-2 landing-navbar-collapse-login-button`} style={{borderRadius: "10px"}}>
                                    Log In
                                </Button> */}
                                <Button onClick={() => routeChange('/login')} bd='1px solid #566a93' bg='#162a53'  w={{base: 'auto', sm: '100%'}} className='navbar-drawer-nav-login-signup'>Log In</Button>
                                <Button onClick={() => routeChange('/signup')}  bd='1px solid #566a93' bg='#eaeaea' c='#202' w={{base: 'auto', sm: '100%'}} className='navbar-drawer-nav-login-signup'>Sign Up</Button>

                                {/* <Button className="px-3 py-2 landing-navbar-collapse-signup-button" style={{borderRadius: "10px"}}  onClick={() => routeChange('/signup')}>
                                    Sign Up
                                </Button> */}
                            </Flex>
                        </Group>
                    </ScrollArea>
                </Drawer>
            </Box>
        </>
    );
}

export default NavbarContent;
