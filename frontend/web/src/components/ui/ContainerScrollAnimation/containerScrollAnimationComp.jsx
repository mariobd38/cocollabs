import React from 'react';

import { Image,Title,Flex } from '@mantine/core';

import { ContainerScroll } from '@/components/ui/ContainerScrollAnimation/container-scroll-animation';

import home_screenshot from '@/assets/images/home-screenshot.png';

const ContainerScrollAnimationComp = () => {
    return (
        <Flex direction='column' px={{base: 0, sm: 20}}>
            <ContainerScroll
                titleComponent={
                    <Flex direction='column' pt={{base: 30, sm: 40}} gap={10} w='95%' m='auto'>
                        <Title order={1} fz={{ base: '2.2rem', xs: "2.5rem", sm: '3.1rem' }} style={{transition: "font-size 0.4s ease"}}
                            fw={550} c="#c0c3c6" ff='Helvetica' textWrap="balance" ta='center'>
                                Your Projects, Tools, and Teams
                        </Title>
                        <Title order={1} fz={{ base: '2.2rem', xs: "2.5rem", sm: '3.1rem' }} style={{transition: "font-size 0.4s ease"}}
                            fw={550} c="#c0c3c6" ff='Helvetica' textWrap="balance" ta='center'>
                                All in One Place
                        </Title>
                    </Flex>
                }
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