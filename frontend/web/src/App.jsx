import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

import PrivateRoute from "@/PrivateRoute/privateRoute";
import { AuthProvider } from "@/hooks/authProvider";

// import Home from "@/components/Home/home";
import Homev2 from '@/pages/home/homev2';
import Explore from '@/pages/home/explore';
import AppLayout from '@/pages/home/appLayout';
// import TaskDetailsModal from "@/components/Home/TaskDetailsModal/taskDetailsModal";
import LandingPage from "@/components/Landing/LandingPage";
import Login from "@/components/Auth/Login/login";
import SignUp from "@/components/Auth/SignUp/signup"
import SignUpNextSteps from "@/components/Auth/SignUp/SignUpNextSteps/signUpNextSteps";
import Onboarding from "@/components/Onboarding/onboarding";
import OAuth2RedirectHandler from "@/components/Auth/SignUp/oAuth2RedirectHandler";
import NotFound from '@/components/NotFound/notFound';

import './App.css';
  
function App() {
    const location = useLocation();
    const background = location.state && location.state.background;
    
    return (
        <AuthProvider>
            <Routes>
                <Route
                path="/:slug"
                location={background || location} 
                element={
                    <PrivateRoute>
                        <AppLayout />
                    </PrivateRoute>
                }>
                    <Route index element={<Homev2 />} /> {/* Default route for /:slug */}
                    <Route path="explore" element={<Explore />} /> {/* Route for /:slug/explore */}
                </Route>
          
                {/* {background && (
                    <Route path="/home/modal" element={
                    <PrivateRoute>
                        <TaskDetailsModal/>
                    </PrivateRoute>
                } />
                )} */}


                <Route path="/login" element={<Login/> } />

                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

                <Route path="/onboarding" element={
                    // todo: might have to comment out PrivateRoute
                    <PrivateRoute> 
                        <Onboarding />
                    </PrivateRoute>
                }/>


                <Route path="/signUp" element={<SignUp/> } />
                <Route path="/app/signup" element={<SignUpNextSteps/> } />

                <Route path="/" element={<LandingPage/> } />

                <Route path="*" element={<NotFound />} />

            </Routes>
        </AuthProvider>
    );
}

export default App;