import React from 'react';
import AnimatedGradientText from './animated-gradient-text';

const AnimatedGradientTextComp = ({target,animate}) => {
    return (
        <div className={`${animate ? 'float-down' : ''}`} >
            <AnimatedGradientText>
                {target}
            </AnimatedGradientText>
        </div>
    );
};

export default AnimatedGradientTextComp;