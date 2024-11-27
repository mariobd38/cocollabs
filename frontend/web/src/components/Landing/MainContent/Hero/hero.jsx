import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import { Button,Flex, Box,Container, Title, Divider } from '@mantine/core';

import MeteorsComp from '@/components/ui/Meteors/meteorsComp';
import AnimatedGradientTextComp from '@/components/ui/AnimatedGradientText/animatedGradientTextComp';
import HeroGetStartedButton from '@/components/Landing/MainContent/Hero/heroGetStartedButton';
import TypingAnimationComp from '@/components/ui/TypingAnimation/typingAnimationComp';
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
            <MeteorsComp 
                num={45}
                target={
                    <Box w='100%' m={0} p={0} pb={{base: '0', sm: '60'}}>
                
                        <Container px={{sm: '10', md: '0'}}>
                            <Flex gap={70} direction='column' py={30} px={10}>
                                <AnimatedGradientTextComp
                                    animate={animate}
                                    target={<>
                                        <span className='fafafa-color d-flex align-items-center'> 
                                            <Flex display={{base: 'none', xs: 'flex'}}>🎉 
                                            <Divider mx='10' orientation="vertical" m='auto' size='xs' h='18' style={{borderRadius: "10px"}}  bd='.5px solid #363636'/>
                                            </Flex>
                                            Introducing a new way to build solutions together
                                            <span className='ps-2 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5'>

                                            {Icons('IconChevronRight',13,13)}
                                            </span>
                                        </span>
                                    </>}
                                />

                                <TypingAnimationComp text={'Collab like never before.'} duration={55} />

                                <Flex gap={70} direction='column'>
                                    
                                    <Title order={3} fz={{ base: '1.12rem', sm: '1.2rem', xl: '1.3rem'}} style={{transition: "font-size 0.4s ease"}}
                                        fw={500} c="#d0d3d6" ff='Lato' textWrap="balance" ta='center' className={`${animate ? 'float-down' : ''}`}>
                                        Accelerate project growth, discover a wide developer community, and unlock your full development potential with seamless tools and integrations.
                                    </Title>
                                    
                                    <Flex align='center' m='auto' gap={50} direction={{ base: 'column', sm: 'row' }} className={`${animate ? 'float-down' : ''}`}
                                    >
                                        <HeroGetStartedButton routeChange={routeChange} />
                                        <Button className='visit-community-button' p='11px 30px' fz='1.07rem' bg='transparent' ff='Inter' radius={12} style={{fontWeight: "600"}}>Visit the community
                                            <span className='visit-community-icon' style={{padding: "0 10px 0 8px",}}>{Icons('IconChevronRight',14,14)}</span>
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Flex>

                            {/* <Divider  size='xs' my={45} w='100%' />

                            <ContainerScrollAnimationComp />

                            <Container my={100} px={{sm: '20', md: '0'}}>
                                <Title c='#fafafa'>Features</Title>
                                <CardHoverEffectComp />
                                
                            </Container>
                        </Container> */}
                        
                        </Container>
                        

                        
                    </Box>
                }
            />
            <Flex justify='center'>

                <Divider size='xs' my={65} w={{base: '100%', md: '90%'}}  bd='.1px solid #202038'/>
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