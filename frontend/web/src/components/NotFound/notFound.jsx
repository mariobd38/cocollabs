import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex,Image,Title,Button } from '@mantine/core';

import notFound from '@/assets/illustrations/notFound/notFound.svg'
import NavbarContent from '../Landing/NavbarContent/NavbarContent';
import FooterContent from '../Landing/FooterContent/FooterContent';

import './notFound'

const NotFound = () => {
    const navigate = useNavigate();


    return (
        <>
            <NavbarContent />
            <Flex bg='linear-gradient(0.25turn,#101216, #0e1523)' py={60} align='center' justify='center' w='100%' direction='column' gap={40} >
                <Image src={notFound} maw="75%" mah="75%" w={{base: 400}} />
                <Title className='transition-all linear delay-100' c='#f0f0f0' maw='60%' fz={{base: 21.5}} fw={400} ff='Nunito Sans' textWrap='balance' ta='center' >Sorry, the page you were looking for was not found</Title>
                <Button my={20} p='10px 28px' ff='Inter' fz='1.05rem' fw={600} radius={12} bg='#393BB22a' 
                    className='visit-community-button' onClick={() => navigate('/')}>Back to home</Button>
            </Flex>
            <FooterContent />
        </>
    );
};

export default NotFound;