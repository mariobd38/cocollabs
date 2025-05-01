import { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";

const Landing = lazy(() => import('@/pages/landing'));

export default function AppRoutes() {
    return (
        <Suspense fallback={<></>}>
            <Routes>
                <Route path="/" element={<Landing />} />
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </Suspense>
    );
}
