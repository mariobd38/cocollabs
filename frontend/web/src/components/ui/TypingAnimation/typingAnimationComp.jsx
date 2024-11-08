import React from 'react';

import TypingAnimation from './typing-animation';

const TypingAnimationComp = ({text, duration}) => {
    return (
        <TypingAnimation
            text={text}
            duration={duration}
        />
    );
};

export default TypingAnimationComp;