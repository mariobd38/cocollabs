import { Icons } from '@/components/icons/icons';

const getStatusProperty = (statusName) => {
    switch (statusName) {
        case 'To Do':
            // return {icon: <IconCircle style={{ width: rem(14), height: rem(14) }} />, background: '#3a3b3d'};
            return {icon: Icons('IconCircle',14,14,'#fafafa'), background: '#3a3b3d'};
        case 'In Progress':
            return {icon: Icons('IconProgress',14,14,'#fafafa'), background: '#03669a'};
        case 'Completed':
            return {icon: Icons('IconCircleCheckFilled',14,14,'#fafafa'), background: '#036059'};
        default:
            return null;
    }
};

export default getStatusProperty;