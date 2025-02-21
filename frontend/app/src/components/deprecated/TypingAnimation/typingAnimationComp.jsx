import React from 'react';

import TypingAnimation from '@/components/deprecated/TypingAnimation/typing-animation';

const TypingAnimationComp = ({text, duration}) => {
    return (
        <TypingAnimation
            text={text}
            duration={duration}
        />
    );
};

export default TypingAnimationComp;