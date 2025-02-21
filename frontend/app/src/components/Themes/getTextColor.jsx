export const getTextColor = (colorScheme, theme, num) => {
    return colorScheme === 'dark' ? theme.colors.light[num] : theme.colors.dark[num];
};