import React from 'react';

import { useMantineColorScheme } from '@mantine/core';

import LandingMain from '@/components/Landing/main/landingMain';
import LandingFooter from '@/components/Landing/footer/landingFooter';

const Landing = () => {
    const { setColorScheme } = useMantineColorScheme();
    setColorScheme('dark');

    return (
        <>
            <LandingMain />
            <LandingFooter />
        </>
    );
};

export default Landing;