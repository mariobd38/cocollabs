import React from 'react';

import { Box,Flex, UnstyledButton } from '@mantine/core';

import Logo2 from '@/components/Logo/logo2';

const AuthHeader = () => {

    const handleLogoClick = () => {
        window.location.href = '/'
    }

    return (
        <Box style={{background: "#101216"}}>
            <Flex justify='space-between' align='center' h='100%' px={20} style={{height: "19vh"}} >
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