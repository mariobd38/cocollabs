import React, {lazy,Suspense} from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

import PrivateRoute from "@/PrivateRoute/privateRoute";
import { AuthProvider } from "@/hooks/authProvider";

// import Homev2 from '@/pages/home/homev2';
// import Explore from '@/pages/home/explore';
// import AppLayout from '@/pages/home/appLayout';
// import AppLayoutv2 from '@/pages/home/appLayoutv2';
// import TaskDetailsModal from "@/components/Home/TaskDetailsModal/taskDetailsModal";
// import SignUp from "@/components/Auth/signup"
import Onboarding from "@/components/Onboarding/onboarding";
import OAuth2RedirectHandler from "@/components/Auth/oAuth2RedirectHandler";
// import NotFound from '@/components/NotFound/notFound';

import './App.css';

// const Login = lazy(() => import("@/pages/login/login"));
// const Signup = lazy(() => import("@/pages/signup/signup"));
const Landing = lazy(() => import("@/pages/landing/landing"));
const NotFound = lazy(() => import('@/components/NotFound/notFound'));

const LoadingFallback = () => <></>;
  
function App() {
    const location = useLocation();
    const background = location.state && location.state.background;
    
    return (
        <AuthProvider>
            <Suspense fallback={<LoadingFallback />}>
            <Routes>
                

                {process.env.NODE_ENV === 'development' &&
                    <>
                    <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

                    <Route path="/onboarding" element={
                        // todo: might have to comment out PrivateRoute
                        <PrivateRoute> 
                            <Onboarding />
                        </PrivateRoute>
                    }/>

                    {/* <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} /> */}
                </>}
                {/* <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} /> */}

                <Route path="/" element={<Landing/> } />

                <Route path="*" element={<NotFound />} />

            </Routes>
            </Suspense>
        </AuthProvider>
    );
}

export default App;