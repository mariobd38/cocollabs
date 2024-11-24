// import React, {Suspense, lazy} from 'react';
// import { Routes, Route, useLocation } from "react-router-dom";

// import PrivateRoute from "@/PrivateRoute/privateRoute";
// import { AuthProvider } from "@/AuthContext/authProvider";

// import TaskDetailsModal from "@/components/Home/TaskDetailsModal/taskDetailsModal";
// import Onboarding from "@/components/Onboarding/onboarding";

// import './App.css';

// const Login = lazy(() => import('@/components/Auth/Login/login'));
// const SignUp = lazy(() => import('@/components/Auth/SignUp/signup'));
// const SignUpNextSteps = lazy(() => import('@/components/Auth/SignUp/SignUpNextSteps/signUpNextSteps'));
// const LandingPage = lazy(() => import('@/components/Landing/LandingPage'));


// const NewHome = lazy(() => import('@/components/Home/newHome'));

// function App() {
//     const location = useLocation();
//     const background = location.state && location.state.background;
    
//     return (
//         <AuthProvider>
//             <Suspense fallback={<></>}>
//             <Routes>
//                 <Route path="/home" location={background || location} 
//                     element={
//                         <PrivateRoute>
//                             <NewHome />
//                         </PrivateRoute>
//                     }
//                 >
//                     <Route path='/home/modal' element={<TaskDetailsModal />} />
                    
//                 </Route>
          
//                 {background && (
//                     <Route path="/home/modal" element={
//                     <PrivateRoute>
//                         <TaskDetailsModal/>
//                     </PrivateRoute>
//                 } />
//                 )}


//                 <Route path="/login" element={<Login/> } />


//                 <Route path="/onboarding" element={
//                         <Onboarding />
//                 }/>


//                 <Route path="/signUp" element={<SignUp/> } />
//                 <Route path="/app/signup" element={<SignUpNextSteps/> } />

//                 <Route path="/" element={<LandingPage/> } />

//             </Routes>
//             </Suspense>
//         </AuthProvider>
//     );
// }

// export default App;



import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

import PrivateRoute from "@/PrivateRoute/privateRoute";
import { AuthProvider } from "@/AuthContext/authProvider";

import NewHome from "@/components/Home/newHome";
import TaskDetailsModal from "@/components/Home/TaskDetailsModal/taskDetailsModal";
import LandingPage from "@/components/Landing/LandingPage";
import Login from "@/components/Auth/Login/login";
import SignUp from "@/components/Auth/SignUp/signup"
import SignUpNextSteps from "@/components/Auth/SignUp/SignUpNextSteps/signUpNextSteps";
import Onboarding from "@/components/Onboarding/onboarding";
import OAuth2RedirectHandler from "@/components/Auth/SignUp/oAuth2RedirectHandler";

import './App.css';
  
function App() {
    const location = useLocation();
    const background = location.state && location.state.background;
    
    return (
        <AuthProvider>
            <Routes>
                <Route path="/home" location={background || location} 
                    element={
                        <PrivateRoute>
                            <NewHome />
                        </PrivateRoute>
                    }
                >
                    <Route path='/home/modal' element={<TaskDetailsModal />} />
                    
                </Route>
          
                {background && (
                    <Route path="/home/modal" element={
                    <PrivateRoute>
                        <TaskDetailsModal/>
                    </PrivateRoute>
                } />
                )}


                <Route path="/login" element={<Login/> } />

                {/* <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} /> */}

                <Route path="/onboarding" element={
                    <Onboarding />
                }/>


                <Route path="/signUp" element={<SignUp/> } />
                <Route path="/app/signup" element={<SignUpNextSteps/> } />

                <Route path="/" element={<LandingPage/> } />

            </Routes>
        </AuthProvider>
    );
}

export default App;