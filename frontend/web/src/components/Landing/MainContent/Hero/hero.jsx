import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import { Flex, Box,Container, Title, Divider } from '@mantine/core';
import { Button } from '@/components/ui/button';

import AuroraTextComp from '@/components/ui/AuroraText/auroraTextComp';
// import MeteorsComp from '@/components/ui/Meteors/meteorsComp';
import AnimatedGradientTextComp from '@/components/ui/AnimatedGradientText/animatedGradientTextComp';
import HeroGetStartedButton from '@/components/Landing/MainContent/Hero/heroGetStartedButton';
// import TypingAnimationComp from '@/components/ui/TypingAnimation/typingAnimationComp';
import ContainerScrollAnimationComp from '@/components/ui/ContainerScrollAnimation/containerScrollAnimationComp';
import { CardHoverEffectComp } from '@/components/ui/CardHoverEffect/cardHoverEffectComp';
import { Icons } from '@/components/icons/icons';

const Hero = () => {

    let navigate = useNavigate(); 
    const routeChange = (route) =>{ 
        navigate(route);
    }

    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <>
            <Box w='100%' m={0} p={0} pb={{base: '0', sm: '60'}} bg='hsl(240 10% 3.9%)'>
        
                <Container px={{sm: '10', md: '0'}}>
                    <Flex gap={70} direction='column' py={50} px={10} className={`${animate ? 'float-up' : ''}`}>
                        <AnimatedGradientTextComp
                            target={<>
                                <Flex align='center' c='#fafafa'> 
                                    <Flex display={{base: 'none', xs: 'flex'}}>🚀 
                                        <Divider mx='10' orientation="vertical" m='auto' size='xs' h='18' style={{borderRadius: "10px"}}  bd='.5px solid #363636'/>
                                    </Flex>
                                    Introducing a new way to build solutions together
                                    <span className='ps-2 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5'>
                                    {Icons('IconChevronRight',13,13)}
                                    </span>
                                </Flex>
                            </>}
                        />
                        <Flex px={10} direction='column' gap={40}>

                        

                        {/* <TypingAnimationComp text={'Collab like never before'} duration={55} /> */}
                        <Box ff='Helvetica'>
                            <h1 className='font-bold text-white text-6xl sm:text-7xl tracking-tight sm:tracking-normal text-balance sm:text-wrap text-center !leading-[4.6rem] w-11/12 m-auto'>Connecting developers to  <AuroraTextComp>success</AuroraTextComp>
                            </h1>
                            
                        </Box>

                        <Flex direction='column' gap={60}>
                            <Flex direction='column' gap={10}>

                                {/* <p className='text-gray-200 text-lg sm:text-xl tracking-tight sm:tracking-normal text-wrap text-center'>
                                    Your projects, tools, and teams all in one place
                                </p> */}
                                <p className='text-gray-300 text-md sm:text-lg tracking-tight sm:tracking-normal text-balance text-center w-11/12 m-auto'>
                                Meet the platform made for project and developer growth. Discover a wide developer community, and unlock your full development potential with seamless tools and integrations.
                                </p>
                            </Flex>
                            
                            <Flex align='center' m='auto' gap={50} direction={{ base: 'column', sm: 'row' }} ff='Inter'
                            >
                                <HeroGetStartedButton routeChange={routeChange} />
                                <Button className='visit-community-button bg-white font-bold rounded-xl text-base px-4 py-2 hover:brightness-90'>Visit the community
                                    <span className='visit-community icon'>{Icons('IconChevronRight',16,16)}</span>
                                </Button>
                            </Flex>
                        </Flex>
                        </Flex>
                    </Flex>
                
                </Container>
            </Box>
            <Flex justify='center' >
                <Divider size='xs' my={65} w={{base: '100%', md: '100%'}}  bd='.1px solid #202038'/>
            </Flex>

            <ContainerScrollAnimationComp />

            <Container pt={{base: 80, sm: 150, md: 210}} pb={{base: 80, sm: 150, md: 160}} px={{sm: '20', md: '0'}}>
                <Flex gap={24} direction='column' px={10}>

                    <Title c='#fafafa' order={3} fz={{ base: '1.7rem', xs: '2rem', sm: '2.2rem'}} style={{transition: "font-size 0.4s ease"}}
                        fw={550} ff='Helvetica' ta='center'>Your developer journey starts here</Title>

                    <Title c='#c0c3c6' order={5} fz={{ base: '0.86rem', xs: '1.04rem', sm: '1.2rem'}} style={{transition: "font-size 0.4s ease"}}
                        fw={50} ff='Helvetica' ta='center'>Explore new opportunities, collaborate with experts, and create impactful projects together</Title>
                </Flex>
                <CardHoverEffectComp />
                
            </Container>
        </>
    );
};

export default Hero;