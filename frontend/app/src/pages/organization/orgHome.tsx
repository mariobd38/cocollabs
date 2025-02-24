import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';


interface OutletContext {
    // spaceData: SpaceData;
    // orgData: OrganizationData;
    appProps: any;
}

interface Organization {
    name: string;
    description: string;
    slug: string;
    type: string;
}

const OrgHome: React.FC = () => {
    const { appProps } = useOutletContext<OutletContext>();

    const { slug } = useParams();
    // console.log(appProps.organizations.find(org:Obj => org.slug === slug));
    const currentOrg = appProps.organizations.find((item:Organization) => item.slug === slug);
    console.log(currentOrg);

    const [visible, setVisible] = useState(false);

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
        <div className={`transition-opacity duration-300 ease-linear ${visible ? 'opacity-100' : 'opacity-0'}`}>
                {/* <HomeHeader firstName={appProps?.profile.firstName} colorScheme={colorScheme} /> */}
                {/* <div className='w-full '>
                    {currentOrg?.name}
                </div> */}
                <div className="flex justify-between items-center py-7">
                    <div className="flex flex-col gap-1 font-['Inter']">
                    {currentOrg?.name}
                    </div>
                </div>
            </div>
    );
};

export default OrgHome;