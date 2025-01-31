import React from 'react';

import { Box,Flex, UnstyledButton } from '@mantine/core';

import Logo2 from '@/components/Logo/logo2';

const AuthHeader = () => {
    return (
        <Box className='bg-background border-b border-gray-700'  >
            <Flex align='center' px={20} h='3.8rem' gap={10}  ff='Geist'>
                <Flex align='center'>
                    <UnstyledButton w="8.7rem" >
                        <Logo2 strokeColor='#f0f0f0'/>
                    </UnstyledButton>
                </Flex>
            </Flex>
        </Box>
    );
};

export default AuthHeader;