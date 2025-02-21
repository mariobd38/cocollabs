import { Icons } from '@/components/icons/icons';

const getPriorityProperty = (priorityName) => {
    switch (priorityName) {
        case 'Critical':
            return {icon: Icons('IconFlag3Filled',14,14,'#df1212'), color: '#610808'};
        case 'High':
            return {icon: Icons('IconFlag3Filled',14,14,'#26a9dc'), color: '#16499c'};
        case 'Medium':
            return {icon: Icons('IconFlag3Filled',14,14,'yellow'), color: '#8D8000'};
        case 'Low':
            return {icon: Icons('IconFlag3Filled',14,14,'gray'), color: '#242629'};
        default:
            return null;
    }
};

export default getPriorityProperty;