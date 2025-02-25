import React, { lazy,Suspense } from 'react';
import { Routes, Route } from "react-router-dom";

// import NotFound from '@/components/NotFound/notFound';

import './App.css';

const Landing = lazy(() => import("@/pages/landing/landing"));
const NotFound = lazy(() => import('@/components/NotFound/notFound'));

const LoadingFallback = () => <></>;
  
function App() {
    return (
        <Suspense fallback={<LoadingFallback />}>
        <Routes>
            {process.env.NODE_ENV === 'development' &&
                <>

                {/* <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} /> */}
            </>}

            <Route path="/" element={<Landing/> } />

            <Route path="*" element={<NotFound />} />

        </Routes>
        </Suspense>
    );
}

export default App;