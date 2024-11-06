import React from 'react';
import AnimatedGradientText from './animated-gradient-text';

const AnimatedGradientTextComp = ({target}) => {
    return (
        <div >
            <AnimatedGradientText>
                {target}
            </AnimatedGradientText>
        </div>
    );
};

export default AnimatedGradientTextComp;