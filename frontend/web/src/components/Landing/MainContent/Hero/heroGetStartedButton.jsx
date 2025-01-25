import React from 'react';

import { Flex } from '@mantine/core';

const HeroGetStartedButton = ({routeChange}) => {
    return (
        <button className="get-started relative overflow-hidden p-[1px] rounded-xl" onClick={() => routeChange("/signup")}
            >
            <span className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#101216_0%,#393BB2_50%,#303256_100%)]" />
            <Flex className="get-started-text h-full w-full cursor-pointer items-center justify-center bg-slate-950 text-white backdrop-blur-3xl rounded-xl"
                ff='Inter' fw={600} fz='1.07rem' >
                Get started for free
            </Flex>
        </button>
        
    );
};

export default HeroGetStartedButton;