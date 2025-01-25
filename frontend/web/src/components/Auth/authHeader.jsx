import React from 'react';


import { Box,Flex, UnstyledButton } from '@mantine/core';

import { Icons } from '@/components/icons/icons';
import Logo2 from '@/components/Logo/logo2';

const AuthHeader = () => {
    const steps = ['Create profile', 'Create a space'];

    return (
        <Box className='bg-background border-b border-gray-700'  >
            <Flex align='center' px={20} h='3.8rem' gap={10}  ff='Geist'>
                <Flex align='center'>
                    <UnstyledButton w="8.5rem" >
                        <Logo2 strokeColor='#f0f0f0'/>
                    </UnstyledButton>
                </Flex>
                {steps.map((step, index) => (
                    <Flex key={index} align='center' gap={10}>
                        {Icons('IconChevronRight',14,14)}
                        <p>{step}</p>
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};

export default AuthHeader;