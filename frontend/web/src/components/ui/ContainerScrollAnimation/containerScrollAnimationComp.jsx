import React from 'react';

import { ContainerScroll } from '@/components/ui/ContainerScrollAnimation/container-scroll-animation';

import home_screenshot from '@/assets/images/home-screenshot.png';

const ContainerScrollAnimationComp = () => {
    return (
        <div className='flex flex-col'>
            <ContainerScroll>
                <img alt='hero' src={home_screenshot} className='rounded-2xl h-full w-full object-cover object-left-top' />
            </ContainerScroll>
        </div>
    );
};

export default ContainerScrollAnimationComp;