// import { BrowserRouter } from 'react-router-dom';
// import ReactDOM from 'react-dom/client';

// import App from '@/App';

// // import { ThemeProvider } from "@/components/themes/theme-provider"

// import './index.css';
// import './fonts.css';

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// root.render(
//     <>
//         <BrowserRouter>
//             {/* <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme"> */}
//                 <App />
//             {/* </ThemeProvider> */}
//         </BrowserRouter>
//     </>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';
import './fonts.css';
import { DEV_CLERK_KEY } from './config';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ClerkProvider publishableKey={DEV_CLERK_KEY}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ClerkProvider>
    </React.StrictMode>
);