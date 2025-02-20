import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import '@/styles/home/home.css';


interface SpaceData { name: string; [key: string]: any; }

interface CurrentSpace {
    name: string;
    slug: string;
    description: string;
    visibility: string;
    icon: any;
}

interface OutletContext {
    spaceData: SpaceData;
    currentSpace: CurrentSpace;
}

const Explore: React.FC = () => {
    const { spaceData } = useOutletContext<OutletContext>();


    const [visible, setVisible] = useState<boolean>(false);

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

    return (
        <>
            <div className={`transition-opacity duration-300 ease-linear ${visible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex justify-between items-center py-7">
                    explore
                </div>
            </div>
        </>
    );
};

export default Explore;