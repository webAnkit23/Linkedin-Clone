import React ,{useEffect, useState} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import loginImage from '../assets/loginImage.svg';
import LoginForm from '../Components/LoginForm';
import { onAuthStateChanged } from 'firebase/auth';
import '../styles/Login.css'
import { auth } from '../firebase';
import Loader from '../Components/Loader';
function Login() {
  const [loading ,setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if(user?.accessToken){
          navigate('/home');
      }
      else{
        setLoading(false);
      }
    })
   },[]);
   useEffect(() =>{
    document.body.style.overflow ='hidden';
    return () =>{
      document.body.style.overflow ='scroll';
    }
},[])
  return (
    <>{loading ? <Loader /> :
    <div className='w-[100vw] absolute  h-[100vh]  pt-[20px] bg-[#fffbee] top-0 z-[1000000] '>
    <div className='loginContainer'>
        <LoginForm></LoginForm>
    
        <img src={loginImage} className='hidden md:flex login_hero_img' />
       
    </div>
    </div>
    }
    </>
    
  )
}

export default Login;