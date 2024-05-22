import React from 'react';
import { useEffect,useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useUserContext } from '../Context/userContext';
import { fetchCurrentUserInfo } from '../APIs/firestoreApi';
import { auth } from '../firebase';

import Profile from '../Components/Profile/Profile';
export default function ProfileLayout() {
    const navigate = useNavigate();
    const {user ,setUser}= useUserContext();
    useMemo(() =>{
     fetchCurrentUserInfo(setUser);
    },[]);
    useEffect(()=>{
     onAuthStateChanged(auth, (use) => {
       if(!use){
           navigate('/');
       }
     })
    },[]);
  return (
    < div className=''>
     
     <div className='flex items-center justify-center'>
     <div className='lg:w-[800px] md:w-[650px] sm:w-[500px] w-[400px] max-w-[100%] mb-[100px]    rounded  grid items-center '>
        <Profile user ={user}/> 
     </div>
     </div>
    </div>
  )
}
