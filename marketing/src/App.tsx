import { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import Landing from '@/pages/landing';


function App() {
    return (
        <Suspense fallback={<></>}>
            <Routes>
                {process.env.NODE_ENV === 'development' &&
                    <>

                    {/* <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} /> */}
                </>}

                <Route path="/" element={<Landing/> } />
            </Routes>
        </Suspense>
    )
}

export default App
