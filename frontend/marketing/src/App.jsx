import React, { lazy,Suspense } from 'react';
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/hooks/authProvider";

import OAuth2RedirectHandler from "@/components/Auth/oAuth2RedirectHandler";
// import NotFound from '@/components/NotFound/notFound';

import './App.css';

const Landing = lazy(() => import("@/pages/landing/landing"));
const NotFound = lazy(() => import('@/components/NotFound/notFound'));

const LoadingFallback = () => <></>;
  
function App() {
    return (
        <AuthProvider>
            <Suspense fallback={<LoadingFallback />}>
            <Routes>
                {process.env.NODE_ENV === 'development' &&
                    <>
                    <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

                    {/* <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} /> */}
                </>}

                <Route path="/" element={<Landing/> } />

                <Route path="*" element={<NotFound />} />

            </Routes>
            </Suspense>
        </AuthProvider>
    );
}

export default App;