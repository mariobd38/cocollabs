import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMantineTheme, useMantineColorScheme, Box, Flex } from '@mantine/core';

import HomeHeader from '@/components/Home/HomeHeader/homeHeader';
import QuickActions from '@/components/Home/QuickActions/quickActions';

// import { getUserProfileInfo } from '@/api/Users/getUserProfileInfo';
import { getLastActiveSpaceInfo } from '@/api/Spaces/getLastActiveSpace';

import dayjs, { Dayjs } from 'dayjs';

import { getThemeColor } from '@/components/Themes/getThemeColor';
import { getTextColor } from '@/components/Themes/getTextColor';

import '@/styles/home/home.css';

interface SpaceData {
    name: string;
    [key: string]: any;
}

interface ThemeColors {
    bg: string[];
    text: string[];
}

const Homev2: React.FC = () => {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    const [today, setToday] = useState<Dayjs>(dayjs());
    const location = useLocation();
    const passedSpaceInfo = location.state?.spaceInfo as SpaceData | undefined;
    const [spaceData, setSpaceData] = useState<SpaceData>(passedSpaceInfo || { name: '' });
    const [spaceSwitch, setSpaceSwitch] = useState<number>(0);

    const themeColors: ThemeColors = {
        bg: Array.from({ length: 13 }, (_, index) => getThemeColor(colorScheme, theme, index)),
        text: Array.from({ length: 13 }, (_, index) => getTextColor(colorScheme, theme, index)),
    };

    useEffect(() => {
        async function fetchSpaceData() {
            const data = await getLastActiveSpaceInfo();
            setSpaceData(data);
        }

        fetchSpaceData();
    }, [spaceSwitch]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newDate = dayjs();
            if (!newDate.isSame(today, 'day')) {
                setToday(newDate);
            }
        }, 1000 * 5); // Check every 5 seconds

        return () => clearInterval(intervalId);
    }, [today]);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (spaceData?.name) {
            setTimeout(() => {
            setVisible(true);
            }, 15);
        }
    }, [spaceData?.name]);

    return (
    <>
        <Box className={`transition-opacity ease-linear ${visible && spaceData?.name ? 'opacity-100' : 'opacity-0'}`}>
            <HomeHeader
                spaceName={spaceData?.name || ''}  // Provide default value
                themeColors={themeColors}
                colorScheme={colorScheme}
            />

            <Box w="100%">
                <QuickActions themeColors={themeColors} colorScheme={colorScheme} />
            </Box>
        </Box>
    </>
    );
};

export default Homev2;
