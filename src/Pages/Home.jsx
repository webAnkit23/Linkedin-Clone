import React, { useEffect,useMemo,useState } from 'react'
import {onAuthStateChanged } from "firebase/auth";
import HomeComponent from '../Components/HomeComponent';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import { fetchCurrentUserInfo } from '../APIs/firestoreApi';
import { useUserContext } from '../Context/userContext';
export default function Home() {
  const navigate = useNavigate();
  const [loading ,setLoading] = useState(true);
  const {setUser}= useUserContext();
useMemo(() =>{
 fetchCurrentUserInfo(setUser);
},[]);
  useEffect(()=>{
   onAuthStateChanged(auth, (user) => {
     if(!user?.accessToken){
         navigate('/');
     }
     else{
      setLoading(false);
     }
   })
  },[]);
  
  return (
    <>{
      loading ? <Loader /> :  <HomeComponent />
    }
    </>
  )
}

