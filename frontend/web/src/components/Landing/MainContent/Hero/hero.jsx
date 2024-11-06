import React from 'react';
import { useNavigate } from "react-router-dom";

import { Text, Button,Flex, Box,Container, Title, Divider } from '@mantine/core';
import MeteorsComp from '@/components/ui/Meteors/meteorsComp';
import AnimatedGradientTextComp from '@/components/ui/AnimatedGradientText/animatedGradientTextComp';
import HeroGetStartedButton from './heroGetStartedButton';
import TypingAnimationComp from '@/components/ui/TypingAnimation/typingAnimationComp';
import ContainerScrollAnimationComp from '@/components/ui/ContainerScrollAnimation/containerScrollAnimationComp';

import { Icons } from '@/components/icons/icons';

// import team_work from '../../../../assets/illustrations/landing/team_work.png';
// import archery_goals from '../../../../assets/illustrations/landing/archery_goals.png';
// import shared_goals from '../../../../assets/illustrations/landing/shared_goals.png';


const Hero = () => {

    // let navigate = useNavigate(); 

    // const routeChange = (route) =>{ 
    //     navigate(route);
    // }

    return (
        <MeteorsComp 
            num={40}
            target={
                <Box w='100%' className='hero-bg' m={0} p={0}  pb={60}>
            
                    <Container py={60} px={10}>
                        <Flex gap={70} direction='column'>
                        <AnimatedGradientTextComp 
                            target={<>
                                <span className='fafafa-color d-flex align-items-center'> 🎉 
                                    <Divider mx='10' orientation="vertical" m='auto' size='xs' h='18' style={{borderRadius: "10px"}}  bd='.5px solid #363636'/>
                                    Introducing a new way to build solutions 
                                    <span className='ps-2 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5'>

                                    {Icons('IconChevronRight',13,13)}
                                    </span>
                                </span>
                            </>}
                        />

                        {/* <Title order={1} pb={0} fz={{ base: '3.6rem', sm: '3.9rem', xl: '4.3rem'}} style={{transition: "font-size 0.4s ease"}}
                            ff='Helvetica' textWrap="balance" c='#fafafa' ta='center'>Collab like never before.</Title> */}
                            <TypingAnimationComp text={'Collab like never before.'} duration={60} />
                            {/* <WordPullUpComp text='Accelerate project growth, streamline team collaboration, and unlock your full development potential with seamless tools and integrations.' /> */}


                            <Flex gap={70} direction='column'>
                                
                                <Title order={3} fz={{ base: '1.12rem', sm: '1.2rem', xl: '1.3rem'}} style={{transition: "font-size 0.4s ease"}}
                                    fw={550} c="#d0d3d6" ff='Helvetica' textWrap="balance" ta='center'>
                                    Accelerate project growth, streamline team collaboration, and unlock your full development potential with seamless tools and integrations.
                                </Title>

                                {/* <Button className='hero-get-started-button' w='fit-content' m='auto' fw={600} >
                                    Get started for free
                                </Button> */}
                                <HeroGetStartedButton />
                            </Flex>
                        </Flex>
                    </Container>
                        <ContainerScrollAnimationComp />

                </Box>
            }
        />
        // <Box w='100%' bg='#101216' m={0} p={0}>
            
        //     <Container p={10}>
        //         <Flex gap={30} direction='column'>

        //         <Title order={1} fz='3rem' textWrap="balance" c='#fafafa' ta='center'>Collab like never before.</Title>
        //         <Title order={4} c="#c4c4c4" textWrap="balance" ta='center'>
        //             Whether you are looking for individual or enterprise solutions, discover how our platform is fitting for your use case. 
        //             Achieve results and collaborate easily with your team.
        //         </Title>
        //         </Flex>
        //     </Container>
        // </Box>
        // <div>
        //     <div>
        //         <div className="container py-5">
        //             <div className='row'>
        //                 <div className='col-12 col-lg-6 m-auto'>
        //                     <div className='fafafa-color top-left-header-text d-flex flex-column justify-content-md-between'>
        //                         <Text style={{lineHeight: "4rem", paddingBottom: "10px"}} className='fafafa-color top-left-header-text d-flex'>
        //                             Collab like never before.
        //                         </Text>

        //                         <Text style={{lineHeight: "4rem", paddingBottom: "40px"}} className='fafafa-color top-left-header-text d-flex'>
        //                             Productivity for all.
        //                         </Text>
        //                     </div>

        //                     <div>
        //                         <div >
        //                             <Text pb='10' fz={19} className='fafafa-color landing-header-description-text' style={{lineHeight: "1.8rem"}}>
        //                                 Transform your ideas into achievements with cross-end collaboration and the most innovative productivity tools. 
        //                             </Text>
        //                         </div>
                                
        //                         <div className="pt-4 pb-4 text-center justify-content-md-between">
        //                             <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3 landing-hero-buttons">
        //                                 <Button className="landing-get-started-button" onClick={() => routeChange('/signup')}>
        //                                     Get Started
        //                                 </Button>
        //                                 <Button className="landing-learn-more-button">
        //                                     Learn More
        //                                 </Button>
        //                             </div>
        //                             <Text fz={15} className="landing-header-description-text d-flex justify-content-center justify-content-lg-start pt-4" style={{ fontSize: '0.7em', color: '#fafafa' }}>
        //                                 No credit card needed · Start with a free plan
        //                             </Text>
                
        //                         </div>
        //                     </div>
        //                 </div>

        //                 <div className='col-12 col-lg-6'>
        //                     <div className='d-md-flex justify-content-center justify-content-lg-center main-content-team-work-div'>
        //                         <div className='py-4 text-center'>
        //                             <img src={team_work} className="illustration-landing" alt="" />
        //                         </div>
        //                     </div>
        //                     <div className='d-flex justify-content-center justify-content-lg-center main-content-shared-goals-div'>
        //                         <div>
        //                             <img src={shared_goals} className="illustration-landing" alt="" />
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default Hero;