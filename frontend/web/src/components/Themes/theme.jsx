import { DEFAULT_THEME, createTheme, mergeMantineTheme } from '@mantine/core';

const overrides = createTheme({
    white: '#F0F0F0',
    colors: {
        
        // e4e7eb
        light: ['#ffffff', '#fafafa', '#f5f5f5', '#f2fffd', '#e6eaf2', '#d6d6d6', '#cccccc', '#c6cad2', '#a0a0a0', '#8c8c8c', '#868e96', '#5c5c5c', '#4c4c4c'],
        dark: ['#000000', '#1e1f21', '#222222', '#212224', '#222529', '#232426', '#2e2f31', '#323539', '#37383a', '#393b3d', '#56585c', '#868e96', '#868e96', '#898989'],
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

        /*
        text colors
        */
    },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, overrides);