import React, { useEffect } from 'react'
import RegisterComponent from '../Components/RegisterComponent'

function Register() {
   useEffect(() =>{
        document.body.style.overflow ='hidden';
        return () =>{
          document.body.style.overflow ='scroll';
        }
   },[])
  return (
  <div>
    <div className='w-[100vw] absolute  h-[100vh]  pt-[20px] bg-[#fffbee] top-0 z-[1000000] '>
    <RegisterComponent />
    </div>
  
  </div>
    
  )
}

export default Register