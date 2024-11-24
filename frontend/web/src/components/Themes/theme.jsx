import { DEFAULT_THEME, createTheme, mergeMantineTheme } from '@mantine/core';

const overrides = createTheme({
    colors: {
        
        // e4e7eb
        // f2f3fb
        light: ['#fff', '#fff', '#f2f3fb', '#f2fffd', '#e6eaf2', '#d6d6d6', '#cccccc', '#d4d8e0', '#a0a0a0', '#8c8c8c', '#868e96', '#5c5c5c', '#fafafa'],
        dark: ['#000000', '#1e1f21', '#1e1f21', '#212224', '#222529', '#232426', '#2e2f31', '#323539', '#37383a', '#393b3d', '#56585c', '#868e96', '#1e1f21', '#898989'],
        /*
        main dark colors
        #1e1f21
        #222222
        #212224
        #222529
        #232426
        #2e2f31
        #323539
        #37383a
        #393b3d
        #57585a
        #868e96
        #898989
        */
    },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, overrides);