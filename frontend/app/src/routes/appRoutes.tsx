import { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";



const Login = lazy(() => import("@/pages/login"));
const Signup = lazy(() => import("@/pages/signup"));
const NotFound = lazy(() => import('@/pages/notFound'));

export function AppRoutes() {
    return (
        <Suspense fallback={<></>}>
            <Routes>
                <Route path="/login" element={<Login />} />
                {/* <Route path="/signup" element={<Signup />} /> */}
                <Route
                    path="/signup"
                    element={
                            // <ProtectedSignup>
                        <Signup />
                            // </ProtectedSignup>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;
