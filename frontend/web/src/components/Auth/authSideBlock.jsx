import React from 'react';

import { Flex,Paper,Box,Title,Text,Button,Image } from '@mantine/core';

import Logo2 from '@/components/Logo/logo2';
import profile from '@/assets/profiles/aesthetic_profile.png';
import { IconsFilled } from '@/components/icons/iconsFilled';
import { Icons } from '@/components/icons/icons';

const AuthSideBlock = ({isLogin}) => {
    return (
        <Paper radius={0} ms={isLogin ? 15 : 0} bg='transparent' py={20} display={{base: 'none', md: 'block'}} mih='100vh' >
            <Flex px={25} bg='#233142a0' bd='1px solid #536172a0' align='center' justify='center' direction='column' py={50} me={20} gap={45} h='100%' style={{ flexGrow: 1, borderRadius: "8px"}}>
                <Box>
                    <Flex pb={45} justify='center'>
                        <Box w='9rem'>
                            <Logo2 strokeColor='#f0f0f0' />
                        </Box>
                    </Flex>

                    <Flex gap={25} direction='column'>

                        <Title order={2} c='#fafafa' ff='Nunito Sans' ta='center'>Simplify your development workflow, meet your project goals.</Title>

                        <Text order={2} c='#d5d5d5' ff='Nunito Sans' ta='center'>
                            Cocollabs is designed to simplify project discovery and collaboration for professionals.
                            Discover how you can match with other devs with similar interests and take your project from 0 to 1.
                        </Text>

                    </Flex>


                    
                </Box>

                <Flex w='100%' direction='column' justify='space-between' gap={20}>
                    <Flex justify='flex-start'>
                        <Paper p='10px 25px' radius={12} w='21rem' className='cursor-default' bg='#f0f0f0'>
                            <Flex gap={10} align='center' justify='center'>
                                <span>
                                    {IconsFilled('IconPhotoFilled',50,50, '#353535')}
                                </span>
                                <Flex direction='column'>
                                    <h1 className='text-gray-900 lato-font font-bold text-medium'>
                                        Invite to project
                                    </h1>

                                    <Text fz={13} c='#797979' ff='Lato'>
                                        Collaborate with members on this project
                                    </Text>
                                </Flex>
                                
                            </Flex>

                            <Box pt={20}>
                                <Text c='#353535' fz={14}>Search members</Text>

                                <Flex my={5} justify='space-between' align='center' w='100%' bg='#d9dbdf' px={10} py={6} style={{borderRadius: '8px'}}>
                                    <Text c='#66676a' fz={15}>Email address</Text>
                                    <Button style={{cursor: "default",transform: 'none'}} p='0 12px' h={30} bg='#252525'>Invite</Button>
                                </Flex>
                            </Box>
                        </Paper>
                    </Flex>

                    <Flex justify='flex-end' >
                        <Paper p='10px 25px' radius={12} w='21rem' className='cursor-default' bg='#f0f0f0'>
                            <Flex gap={10} align='center' justify='flex-start'>
                                <Box w='3.8rem' >
                                    <Image src={profile} radius={50}/>
                                </Box>
                                <Flex direction='column'>
                                    <h1 className='text-gray-900 lato-font font-bold text-medium'>
                                        Oscar Martinez
                                    </h1>
                                    
                                    <Text fz={13} c='#797979'>
                                        Software Engineer
                                    </Text>
                                </Flex>
                                
                            </Flex>

                            <Box pt={10}>

                                <Flex pb={10}>
                                    <Text fz={13.5} c='#37383b'>
                                        I specialize in machine learning and big data. Currently seeking exciting project opportunities!
                                    </Text>
                                </Flex>
                                <Flex justify='flex-end' gap={20} my={5} align='center' w='100%' >
                                    <Button fz={15}  style={{cursor: "default",transform: 'none'}} p='0 10px' bd='1.5px solid blue' c='blue' bg='transparent'>
                                        {Icons('IconMessages',20,20,'#1971c2')}
                                    </Button>
                                    <Button fz={15}  style={{cursor: "default",transform: 'none'}} p='0 12px' bd='1px solid blue' bg='blue'>Connect</Button>
                                </Flex>
                            </Box>
                        </Paper>
                    </Flex>
                </Flex>
            </Flex>
        </Paper>
    );
};

export default AuthSideBlock;