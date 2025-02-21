import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import HomeHeader from '@/components/Home/HomeHeader/homeHeader';
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
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


const Homev2: React.FC = () => {
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
                <HomeHeader firstName={appProps?.profile.firstName} colorScheme={colorScheme} />
                <div className='w-full '>
                    <MyOrganizations appData={appProps} colorScheme={colorScheme} />
                    {/* <QuickActions /> */}
                
                    {/* <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                <Card>
                                    <CardContent className="flex items-center justify-center p-6">
                                    <span className="text-3xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                                </div>
                            </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel> */}
                    
                    {/* <QuickActions themeColors={themeColors} />
                    <QuickActions themeColors={themeColors} />
                    <QuickActions themeColors={themeColors} />
                    <QuickActions themeColors={themeColors} /> */}
                </div>
            </div>
        </>
    );
};

export default Homev2;
