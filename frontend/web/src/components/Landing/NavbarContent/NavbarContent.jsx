import React from 'react';
import { useNavigate } from "react-router-dom";

import {Icons} from '../../icons/icons';

import { HoverCard,Group,UnstyledButton,Text,Flex,Divider,Center,Box,Button,Burger,Drawer,Collapse,ScrollArea,
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
    const [solutionsOpened, { toggle: toggleSolutions }] = useDisclosure(false);
    const [platformOpened, { toggle: togglePlatform }] = useDisclosure(false);
    const theme = useMantineTheme();

    const platformLinks = <NavbarLinkItem mockdata={platformMockdata} drawerOpened={drawerOpened} closeDrawer={closeDrawer} />
    const solutionsLinks = <NavbarLinkItem mockdata={solutionsMockdata} drawerOpened={drawerOpened} closeDrawer={closeDrawer} />
    
    

    return (
        <>
            <Box pb={0} className={"sticky-top"}>
                <Box className={classes.header} bg='linear-gradient(0.25turn,#101216, #0e1523)' 
                    style={() => ({
                        borderBottom: scrollPosition > 40 ? '2px solid #202040' : 'none',
                        transition: 'padding 0.4s ease-in-out, border 0.2s ease-in-out'
                    })}
                    px={{base: 15, xs: 40, sm: 20, md: 15, lg: 40, xl: 120}}
                >
                    <Group justify="space-between" h="100%" >
                        <Flex gap={35} >

                            <Flex style={{width: "9.5rem"}}>
                                <Logo2 strokeColor='#fafafa' />
                            </Flex>

                            <Group h="100%" gap={5} visibleFrom="md" >
                                <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                                    <HoverCard.Target>
                                        <Button className={` landing-nav-button`} >
                                            Projects
                                        </Button>
                                    </HoverCard.Target>

                                </HoverCard>

                                <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                                    <HoverCard.Target>
                                        <Button className={` landing-nav-button`} >
                                            Communities
                                        </Button>
                                    </HoverCard.Target>

                                </HoverCard>
                                <Button className={` landing-nav-button`} >
                                    Resources
                                </Button>
                                <Button className={` landing-nav-button`}>
                                    Pricing
                                </Button>
                            </Group>
                        </Flex>


                        <Group visibleFrom="md">

                            <div className='d-flex gap-2 align-items-center'>

                                <Button className={` landing-nav-button`} >
                                    Log In
                                </Button>
                                <Button className=" landing-signup-nav-button" onClick={() => routeChange('/signup')}>
                                    Sign Up
                                </Button>
                            </div>
                        </Group>

                        <Burger opened={drawerOpened} className={`navbar-content-burger ${scrollPosition > 40 ? 'scrolled': ''}`} onClick={toggleDrawer} hiddenFrom="md" />
                    </Group>
                </Box>

                <Drawer
                    opened={drawerOpened}
                    onClose={closeDrawer}
                    size="450px"
                    removeScrollProps={{ allowPinchZoom: true }}
                    padding="lg"
                    position="right"
                    className='drawer-parent'
                    title={<button  style={{width: "12.5rem"}}>
                            <Logo2 strokeColor={'#222222'}/>
                        </button>}
                    hiddenFrom="md"
                    zIndex={1000000}
                >
                    <ScrollArea h={`calc(100dvh - ${rem(80)})`} mx="-md" bg='#fafafa'>
                        <Divider mb="md" bd='.1px solid #c5c5c5' />
                        <UnstyledButton className={classes.link + " w-100"} onClick={togglePlatform}>
                            <Center inline className='d-flex justify-content-between w-100'>
                                <Box component="span" className={classes.platformlink + " " + classes.link}>
                                    Platform
                                </Box>
                                <Box style={{ marginRight: rem(30) }} >
                                    {Icons('IconChevronRight', 25,25,theme.colors.blue[6])}
                                </Box>
                            </Center>
                        </UnstyledButton>
                        <Collapse className='my-1' in={platformOpened}>{platformLinks}</Collapse>

                        <UnstyledButton className={classes.link + " w-100"} onClick={toggleSolutions}>
                            <Center inline className='d-flex justify-content-between w-100'>
                                <Box component="span" className={classes.solutionslink + " " + classes.link}>
                                    Solutions
                                </Box>
                                <Box style={{ marginRight: rem(30) }} >
                                    {Icons('IconChevronRight', 25,25,theme.colors.blue[6])}
                                </Box>
                            </Center>
                        </UnstyledButton>
                        
                        <Collapse className='my-1' in={solutionsOpened}>{solutionsLinks}</Collapse>

                        <a href={() => false} className={classes.link}>
                            Resources
                        </a>
                        <a href={() => false} className={classes.link}>
                            Enterprise
                        </a>

                        <Divider my="md" bd='.1px solid #c5c5c5' />

                        <Group className='m-auto' style={{width: "70%"}} justify="center" grow pb="xl" px="md">
                            <Button onClick={() => routeChange('/login')} 
                                className={`px-3 py-2 landing-navbar-collapse-login-button`} style={{borderRadius: "10px"}}>
                                Log In
                            </Button>
                            <Button className="px-3 py-2 landing-navbar-collapse-signup-button" style={{borderRadius: "10px"}}  onClick={() => routeChange('/signup')}>
                                Sign Up
                            </Button>
                        </Group>
                    </ScrollArea>
                </Drawer>
            </Box>
        </>
    );
}

export default NavbarContent;
