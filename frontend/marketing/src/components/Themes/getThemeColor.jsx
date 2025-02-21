export const getThemeColor = (colorScheme, theme, num) => {
    return colorScheme === 'dark' ? theme.colors.dark[num] : theme.colors.light[num];
};