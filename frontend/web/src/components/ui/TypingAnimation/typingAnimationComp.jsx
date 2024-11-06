import React from 'react';

import TypingAnimation from './typing-animation';

const TypingAnimationComp = ({text, duration}) => {
    return (
        <TypingAnimation
            className="text-4xl font-bold text-white dark:text-white"
            text={text}
            duration={duration}
            // text={<>heyy</>}
        />
    );
};

export default TypingAnimationComp;