import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import team_work from '../../../assets/illustrations/landing/team_work.png';
import archery_goals from '../../../assets/illustrations/landing/archery_goals.png';
import shared_goals from '../../../assets/illustrations/landing/shared_goals.png';

import {  Box,Container,Title, SimpleGrid, Text, Button, ThemeIcon, Grid, Card, Image, Badge, Group } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import {Icons} from '../../icons/icons';

import engineering_team from '../../../assets/illustrations/landing/engineering_team.png';
import marketing_team from '../../../assets/illustrations/landing/marketing_team.png';
import product_team from '../../../assets/illustrations/landing/product_team.png';
import design_team from '../../../assets/illustrations/landing/design_team.png';

import NavbarContent from '../NavbarContent/NavbarContent';

import '@mantine/carousel/styles.css';
import './MainContent.css'

const features = [
    {
        icon: 'IconSTurnRight',
        title: 'Automation at its finest',
        description: 'Reduce costs and time with effective no-code automation',
    },
    {
        icon: 'IconApps',
        title: 'Integrate with ease',
        description: 'All your workspace apps moved into a single interactive platform',
    },
    {
        icon: 'IconWorld',
        title: 'Keep track of your endless goals',
        description: 'Enhance success with easy management of your goals and milestones',
    },
    {
        icon: 'IconBulb',
        title: 'Capture and share ideas',
        description: 'Whiteboards is the easiest way to share brilliant ideas with your team',
    },
];

const useCases = [
    { team: 'Engineering', illustration: engineering_team, width: 180, badgeColor: "blue", description: "Ship more, worry less. Build and plan things better, together, and one step at a time with powerful features." },
    { team: 'Marketing', illustration: marketing_team, width: 165, badgeColor: "pink", description: "Boost your brand, create impactful campaigns and engage your audience with the best tools and insights" },
    { team: 'Product', illustration: product_team, width: 285, badgeColor: "teal", description: "Transform ideas into reality. Strategize, develop, and manage products effectively with collaborative tools." },
    { team: 'Design', illustration: design_team, width: 155, badgeColor: "violet", description: "Collaborate, create, and refine designs seamlessly with intuitive tools and innovative features." },
]

const MainContent = () => {
    let navigate = useNavigate(); 

    const routeChange = (route) =>{ 
        navigate(route);
    }

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollPosition]);
    
    const items = features.map((feature,index) => (
        <div key={index} style={{color: "#121212"}}>
            <ThemeIcon
                size={44}
                radius="md"
                bg='#468189'
            >
                {Icons(feature.icon, 26, 26, '#fafafa')}
                {/* <feature.icon style={{ width: rem(26), height: rem(26) }} stroke={1.5} /> */}
            </ThemeIcon>
            <Text fz="lg" mt="sm" fw={500}>
                {feature.title}
            </Text>
            <Text fz="sm" style={{color: "#737373"}}>
                {feature.description}
            </Text>
        </div>
    ));


    return (
        <div>
            <main className='landing-header'>
                <NavbarContent navbarBackground={"#fafafa"} scrollPosition={scrollPosition}/>
                <div >
                    <div >
                        <div className="container py-5">
                            <div className='row'>
                                <div className='col-12 col-lg-6 m-auto'>
                                    <div className='fafafa-color top-left-header-text d-flex flex-column justify-content-md-between'>
                                        <Text style={{lineHeight: "4rem", paddingBottom: "10px"}} className='fafafa-color top-left-header-text d-flex'>
                                            Collab like never before.
                                        </Text>

                                        <Text style={{lineHeight: "4rem", paddingBottom: "40px"}} className='fafafa-color top-left-header-text d-flex'>
                                            Productivity for all.
                                        </Text>
                                    </div>

                                    <div>
                                        <div >
                                            <Text pb='10' fz={19} className='fafafa-color landing-header-description-text' style={{lineHeight: "1.8rem"}}>
                                                Transform your ideas into achievements with cross-end collaboration and the most innovative productivity tools. 
                                            </Text>
                                        </div>
                                        
                                        <div className="pt-4 pb-4 text-center justify-content-md-between">
                                            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3 landing-hero-buttons">
                                                <Button className="landing-get-started-button" onClick={() => routeChange('/signup')}>
                                                    Get Started
                                                </Button>
                                                <Button className="landing-learn-more-button">
                                                    Learn More
                                                </Button>
                                                {/* <Button className=" " onClick={() => routeChange('/signup')}>
                                                    Get Started
                                                </Button>
                                                <Button className="" >
                                                    Learn More
                                                </Button> */}
                                            </div>
                                            <Text fz={15} className="landing-header-description-text d-flex justify-content-center justify-content-lg-start pt-4" style={{ fontSize: '0.7em', color: '#fafafa' }}>
                                                No credit card needed · Start with a free plan
                                            </Text>
                        
                                        </div>
                                    </div>
                                </div>

                                <div className='col-12 col-lg-6'>
                                    <div className='d-md-flex justify-content-center justify-content-lg-center main-content-team-work-div'>
                                        {/* <div className='text-center'>
                                            <img src={archery_goals} className="illustration-landing" alt="" />
                                        </div> */}
                                        <div className='py-4 text-center'>
                                            <img src={team_work} className="illustration-landing" alt="" />
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center justify-content-lg-center main-content-shared-goals-div'>
                                        <div>
                                            <img src={shared_goals} className="illustration-landing" alt="" />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* <Container className='d-flex justify-content-center' mt={55}>
                                    <img src={home_screenshot} alt="home screenshot" className='landing-home-screenshot' />
                                </Container> */}
                            </div>
                            
                            
                        </div>
                    </div>
                </div>

                <div className='landing-page-features-div '>

                    <div className='landing-main-content-features-wrapper px-3 px-md-5 m-0'>

                        <Container size={700} className="landing-main-content-use-cases-wrapper mt-2 py-4 pb-3">
                            <Text className="landing-main-content-use-cases-suptitle">Use cases</Text>

                            <Title className="landing-main-content-use-cases-title" order={2}>
                                Cocollabs designed for <span style={{textDecoration: '#468189 solid underline',textUnderlineOffset: "10px"}}>everyone</span>
                            </Title>

                            <Container p={10}>
                                <Text c="dimmed" className="landing-main-content-use-cases-description">
                                    Whether you are looking for individual or enterprise solutions, discover how our platform is fitting for your use case. 
                                    Achieve results and collaborate easily with your team.
                                </Text>
                            </Container>
                        </Container>

                        <div className='d-flex justify-content-end align-items-center'>
                            <a href={() => false} className='landing-main-content-use-cases-all'>
                                <Text style={{fontSize: "1rem"}} fw={600} c="dark">Check out all cases 
                                <span className='ps-2 landing-main-content-use-cases-all-arrow'>{Icons('IconChevronRight',16,16,'#121212')}</span>
                            </Text>
                            </a>
                        </div>

                        <Carousel
                            dragFree
                            mt="10"
                            mb="120"
                            loop
                            height={310}
                            controlsOffset="xs"
                            slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
                            slideGap={{ base: 0, sm: 'md' }}
                            align="start"
                            className="landing-main-content-use-cases-carousel"
                            previousControlIcon={Icons('IconChevronLeft',24,24,'#fafafa')}
                            nextControlIcon={Icons('IconChevronRight',24,24,'#fafafa')}
                          >
                           {useCases.map((item,index) => (
                                <Carousel.Slide key={index} className='d-flex align-items-end'>
                                    <Card bg='#fafafa' shadow="sm" padding="lg" radius="md" className='landing-main-content-use-cases-card'>
                                        <Card.Section style={{backgroundColor: "#d4fffa"}}>
                                            <Image
                                            src={item.illustration}
                                            className='m-auto'
                                            height={170}
                                            w={item.width}
                                            alt={item.team}
                                            />
                                        </Card.Section>
                                        <Box style={{height: "105px"}} >
                                            <Group justify="space-between" mt="md" mb="xs">
                                                <Text fw={500}>{item.team}</Text>
                                                <Badge color={item.badgeColor}>Learn More</Badge>

                                            </Group>

                                            <Text size="sm" c="dimmed">
                                                {item.description}
                                            </Text>
                                        </Box>
                                </Card>
                            </Carousel.Slide >
                            ))}
                        </Carousel>


                        <Grid gutter={{ base: 30, xs: 'md', md: 'xl', xl: 80 }} className='pt-5'>
                            <Grid.Col span={{ base: 12, md: 5 }}>
                                <Title className='landing-main-content-features-title' order={1}>
                                    The platform made for collaboration
                                </Title>
                                <Text style={{color: '#737373'}}>
                                    Build anything you can dream of in a single platform - Cocollabs provides
                                    amazing features that cover you in any solution
                                </Text>

                                <Button
                                    variant="gradient"
                                    gradient={{ deg: 145, from: '#064149', to: '#468189' }}
                                    size="lg"
                                    radius="md"
                                    mt="xl"
                                >
                                    Get started
                                </Button>
                            </Grid.Col>
                            
                            <Grid.Col span={{ base: 12, md: 7 }}>
                                <SimpleGrid cols={{ base: 1, md: 2 }} spacing={25}>
                                    {items}
                                </SimpleGrid>
                            </Grid.Col>
                        </Grid>
                        
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainContent;