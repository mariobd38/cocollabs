import React from 'react';

import Meteors from '@/components/ui/Meteors/meteors';

const MeteorsComp = ({target,num}) => {
    return (
        <div className="relative flex  w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background">
            <Meteors number={num} />
            {target}
        </div>
    );
};

export default MeteorsComp;