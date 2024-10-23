import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { ThemeProvider } from './components/Themes/themeProvider';
import { NextUIProvider } from '@nextui-org/system';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <BrowserRouter>
            <ThemeProvider>
                <NextUIProvider>
                    <App />
                </NextUIProvider>
            </ThemeProvider>
        </BrowserRouter>
    </>
);

reportWebVitals();
