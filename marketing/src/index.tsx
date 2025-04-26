// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import App from '@/App';

// import { ThemeProvider } from "@/components/themes/theme-provider"

import './index.css';
import './fonts.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <>
        <BrowserRouter>
            {/* <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme"> */}
                <App />
            {/* </ThemeProvider> */}
        </BrowserRouter>
    </>
);