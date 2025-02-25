import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import HomeHeader from '@/components/Home/HomeHeader/homeHeader';
import MyOrganizations from '@/components/Home/MyOrganizations/myOrganizations';
import QuickActions from '@/components/Home/QuickActions/quickActions';

// import { getUserProfileInfo } from '@/api/Users/getUserProfileInfo';
// import dayjs, { Dayjs } from 'dayjs';


// interface SpaceData { name: string; [key: string]: any; }
// interface OrganizationData { name: string; [key: string]: any; }
interface ThemeColors { bg: string[]; text: string[]; }

interface CurrentSpace {
    name: string;
    slug: string;
    description: string;
    visibility: string;
    icon: any;
}

interface CurrentOrganization {
    name: string;
    description: string;
    slug: string;
    type: string;
}

interface OutletContext {
    themeColors: ThemeColors;
    // spaceData: SpaceData;
    // orgData: OrganizationData;
    appProps: any;
    colorScheme: string;
    currentSpace: CurrentSpace;
    currentOrg: CurrentOrganization;
}


const Home: React.FC = () => {
    const { themeColors,appProps,currentSpace,currentOrg,colorScheme } = useOutletContext<OutletContext>();
    // const passedSpaceInfo = location.state?.spaceInfo as SpaceData | undefined;

    // const [today, setToday] = useState<Dayjs>(dayjs());
    // const [spaceData, setSpaceData] = useState<SpaceData>(() => { return location.state?.spaceInfo || { name: '' };});
    const [visible, setVisible] = useState(false);

    // Visibility effect
    // useEffect(() => {
    //     if (appProps.space?.name) {
    //         const timer = setTimeout(() => {
    //             setVisible(true);
    //         }, 15);
    //         return () => clearTimeout(timer);
    //     } else {
    //         setVisible(false);
    //     }
    // }, [appProps.space?.name]);

    useEffect(() => {
        if (appProps.organizations) {
            const timer = setTimeout(() => {
                setVisible(true);
            }, 15);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }
    }, [appProps.organizations]);

    return (
        <>
            <div className={`transition-opacity duration-300 ease-linear ${visible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex justify-between items-center py-7">
                    <HomeHeader firstName={appProps?.profile.firstName} colorScheme={colorScheme} />
                </div>
                <div className='w-full '>
                    <QuickActions />
                    {appProps?.organizations.length > 0 && 
                        <MyOrganizations appData={appProps} colorScheme={colorScheme} />}
                
                </div>
            </div>
        </>
    );
};

export default Home;
