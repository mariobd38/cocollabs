import React from 'react';

import { Box,Flex, UnstyledButton } from '@mantine/core';

import Logo2 from '@/components/Logo/logo2';

const AuthHeader = () => {

    const handleLogoClick = () => {
        window.location.href = '/'
    }

    return (
        <Box bg='#101216' >
            <Flex justify='space-between' align='center' px={20} h='19vh' >
                <Box my={40}>
                    <UnstyledButton onClick={handleLogoClick} w="11rem" >
                        <Logo2 strokeColor='#f0f0f0'/>
                    </UnstyledButton>
                </Box>
            </Flex>
        </Box>
    );
};

export default AuthHeader;