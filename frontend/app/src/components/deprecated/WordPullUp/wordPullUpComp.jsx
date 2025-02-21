import React from 'react';

import WordPullUp from '@/components/ui/WordPullUp/word-pull-up';

const WordPullUpComp = ({text}) => {
    return (
        <WordPullUp
        className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
        words={text}
        duration={1090}
        />
    );
};

export default WordPullUpComp;