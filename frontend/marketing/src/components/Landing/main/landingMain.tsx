import React from 'react';

import NavbarContent from '@/components/Landing/navbar/landingNavbar';
import Hero from '@/components/Landing/main/hero';
import Features from '@/components/Landing/main/features';

import './landingMain.css'


const LandingMain: React.FC = () => {

    return (
        <main>
            <NavbarContent />
            <div className="bg-background">
                <Hero />
                <Features />
            </div>
        </main>
    );
};

export default LandingMain;