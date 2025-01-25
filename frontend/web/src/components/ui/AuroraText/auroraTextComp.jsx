import React from 'react';

import { AuroraText } from '@/components/ui/AuroraText/aurora-text';

const AuroraTextComp = ({children}) => {
    console.log(children);
    return (
        <AuroraText>{children}</AuroraText>
    );
};

export default AuroraTextComp;