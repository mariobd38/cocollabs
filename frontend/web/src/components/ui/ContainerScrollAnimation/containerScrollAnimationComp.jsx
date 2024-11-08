import React from 'react';

import {ContainerScroll} from './container-scroll-animation'
import { Image,Title,Flex,Box } from '@mantine/core';

import home_screenshot from '../../../assets/images/home-screenshot.png';

const ContainerScrollAnimationComp = () => {
    return (
        <Flex direction='column' px={{base: 0, sm: 20}}>
            <ContainerScroll
                titleComponent={
                    <Flex direction='column' pt={{base: 30, sm: 40}} gap={10}>
                        <Title order={1} fz={{ base: '2.2rem', xs: "2.7rem", sm: '3.3rem',md: '3.5rem', xl: '3.6rem'}} style={{transition: "font-size 0.4s ease"}}
                            fw={550} c="#c0c3c6" ff='Helvetica' textWrap="balance" ta='center'>
                                Your Projects, Tools, and Teams
                        </Title>
                        <Title order={1} fz={{ base: '2.2rem', xs: "2.7rem", sm: '3.3rem',md: '3.6rem', xl: '3.8rem'}} style={{transition: "font-size 0.4s ease"}}
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