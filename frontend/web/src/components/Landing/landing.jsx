import React from 'react';

import { useMantineColorScheme } from '@mantine/core';

import MainContent from '@/components/Landing/MainContent/MainContent';
import FooterContent from '@/components/Landing/FooterContent/FooterContent';

const LandingPage = () => {
    const { setColorScheme } = useMantineColorScheme();
    setColorScheme('dark');

    return (
        <>
            <MainContent />
            <FooterContent />
        </>
    );
};

export default LandingPage;