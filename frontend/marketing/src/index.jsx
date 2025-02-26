import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import App from '@/App';
import reportWebVitals from '@/reportWebVitals';

import '@mantine/core/styles.css';

import { ThemeProvider } from '@/components/Themes/themeProvider';

import './index.css';
import './fonts.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <BrowserRouter future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
        }}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </>
);

reportWebVitals();
