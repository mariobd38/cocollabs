import React from 'react';
import { MantineProvider } from '@mantine/core';
import { useLocalStorage, useColorScheme } from '@mantine/hooks';
import { theme } from './theme';  // We'll create this file next

export function ThemeProvider({ children }) {
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
    });

    const systemColorScheme = useColorScheme();

    const effectiveColorScheme = colorScheme === 'auto' ? systemColorScheme : colorScheme;

    return (
        <MantineProvider 
            theme={{ ...theme, colorScheme: effectiveColorScheme }} 
            defaultColorScheme="light"
        >
            {children}
        </MantineProvider>
    );
}