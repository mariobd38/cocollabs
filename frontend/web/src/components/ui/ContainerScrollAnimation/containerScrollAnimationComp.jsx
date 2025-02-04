import React from 'react';

import { Image,Title,Flex } from '@mantine/core';

import { ContainerScroll } from '@/components/ui/ContainerScrollAnimation/container-scroll-animation';

import home_screenshot from '@/assets/images/home-screenshot.png';

const ContainerScrollAnimationComp = () => {
    return (
        <Flex direction='column' px={{base: 0, sm: 20}}>
            <ContainerScroll
                // titleComponent={
                //     <Flex direction='column' pt={{base: 30, sm: 40}} pb={22} gap={10} w='95%' m='auto'>
                //         <h1 order={1} 
                //         className='font-bold text-gray-200 text-3xl sm:text-5xl tracking-tight sm:tracking-normal text-wrap text-center
                //         transition-all ease duration-500'>
                //             Your Projects, Tools, and Teams
                //         </h1>
                //         <h1 order={1}
                //         className='font-bold text-gray-200 text-3xl sm:text-5xl tracking-tight sm:tracking-normal text-wrap text-center
                //         transition-all ease duration-500'>
                //             All in One Place
                //         </h1>
                //     </Flex>
                // }
            >
                <Image
                    src={home_screenshot}
                    alt="hero"
                    radius={15}
                    h='100%'
                    w='100%'
                    className="object-cover object-left-top"
                />
            </ContainerScroll>
        </Flex>
    );
};

export default ContainerScrollAnimationComp;