import React, { Suspense } from 'react'
import Login from './Pages/Login'
import { BrowserRouter as Router ,Routes ,Route} from 'react-router-dom'
import { lazy } from 'react';
import Loader from './Components/Loader';
import Topbar from './Components/Topbar';
const Home = lazy(() => import('./Pages/Home'));
const ProfileLayout = lazy(() =>import('./Pages/ProfileLayout'));
const Register =lazy(() => import('./Pages/Register'));
const Jobs = lazy(() => import('./Pages/Jobs'));
const Connections = lazy(() => import('./Pages/Connections'));
const Messeges = lazy(() => import('./Pages/Messeges'));
const Notifications = lazy(() => import('./Pages/Notifications'));
const Profile = lazy(() => import('./Pages/OthersProfile'));
export default function App() {
  return (
    <>
    
    <Router>
    <Topbar />
      <Suspense  fallback  ={<Loader />}>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfileLayout />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/messeges" element={<Messeges />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile/:userID" element={<Profile />} />
    </Routes>
    </Suspense>
  </Router>
  </>
  )
}
