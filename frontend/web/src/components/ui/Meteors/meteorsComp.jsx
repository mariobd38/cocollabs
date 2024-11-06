import React from 'react';
import Meteors from './meteors';

const MeteorsComp = ({target,num}) => {
    return (
        <div className="relative flex  w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl">
            <Meteors number={num} />
            {target}
        </div>
    );
};

export default MeteorsComp;