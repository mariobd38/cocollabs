import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Box } from '@mantine/core';

import HomeHeader from '@/components/Home/HomeHeader/homeHeader';
import QuickActions from '@/components/Home/QuickActions/quickActions';

// import { getUserProfileInfo } from '@/api/Users/getUserProfileInfo';
// import dayjs, { Dayjs } from 'dayjs';

import '@/styles/home/home.css';

interface SpaceData { name: string; [key: string]: any; }
interface ThemeColors { bg: string[]; text: string[]; }

interface CurrentSpace {
    name: string;
    slug: string;
    description: string;
    visibility: string;
    icon: any;
}

interface OutletContext {
    themeColors: ThemeColors;
    spaceData: SpaceData;
    colorScheme: string;
    currentSpace: CurrentSpace;
}


const Homev2: React.FC = () => {
    const { themeColors,spaceData,colorScheme,currentSpace } = useOutletContext<OutletContext>();
    // const { colorScheme } = useMantineColorScheme();
    // const theme = useMantineTheme();
    // const passedSpaceInfo = location.state?.spaceInfo as SpaceData | undefined;

    // const [today, setToday] = useState<Dayjs>(dayjs());
    // const [spaceData, setSpaceData] = useState<SpaceData>(() => { return location.state?.spaceInfo || { name: '' };});
    const [visible, setVisible] = useState(false);

    // Visibility effect
    useEffect(() => {
        if (spaceData?.name) {
            const timer = setTimeout(() => {
                setVisible(true);
            }, 15);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }
    }, [spaceData?.name]);

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         const newDate = dayjs();
    //         if (!newDate.isSame(today, 'day')) {
    //             setToday(newDate);
    //         }
    //     }, 1000 * 5);

    //     return () => clearInterval(intervalId);
    // }, [today]);

    return (
        <>
            <Box className={`transition-opacity duration-300 ease-linear ${visible ? 'opacity-100' : 'opacity-0'}`}>
                <HomeHeader spaceName={currentSpace?.name || ''} themeColors={themeColors} colorScheme={colorScheme} />
                <Box w="100%">
                    <QuickActions themeColors={themeColors} colorScheme={colorScheme} />
                </Box>
            </Box>
        </>
    );
};

export default Homev2;
