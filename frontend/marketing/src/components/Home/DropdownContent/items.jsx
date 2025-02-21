import { Icons } from '@/components/icons/icons';

function items(property,themeColors) {
    let items = null;
    switch(property) {
        case "priority":
            items =  [
                {icon: Icons('IconFlag3Filled',14,14,'#bf1212'), name: 'Critical'},
                {icon: Icons('IconFlag3Filled',14,14,'#26a9dc'), name: 'High'},
                {icon: Icons('IconFlag3Filled',14,14,'yellow'), name: 'Medium'},
                {icon: Icons('IconFlag3Filled',14,14,'gray'), name: 'Low'},
                {icon: Icons('IconCancel',14,14,themeColors.text[1]), name: 'None'},
            ];
            break;
        case "status":
            items = [
                {icon: Icons('IconCircle',14,14,themeColors.text[2]), name: 'To Do'},
                {icon: Icons('IconProgress',14,14,themeColors.text[2]), name: 'In Progress'},
                {icon: Icons('IconCircleCheckFilled',14,14,themeColors.text[2]), name: 'Completed'},
            ];
            break;
        default:
            break;
    }
    return items;
}
export {items}