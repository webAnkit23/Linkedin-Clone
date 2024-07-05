import React,{useMemo} from  'react'
import { PiRectangleFill } from "react-icons/pi";
import { useUserContext } from '../Context/userContext';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { getMyConnections } from '../APIs/firestoreApi';
export default function LeftSection() {
  const navigate = useNavigate();
  const {user} = useUserContext();
  const [myConnections ,setmyConnections] = useState([]);
  const navigatetoProfile =() =>{
    navigate('../profile');
  }
  useMemo(() =>{
    if(!user)return;
    getMyConnections(user?.userID ,setmyConnections);
  },[user]);
  return (
    <div className='w-[100%] z-0 md:w-auto'>
      <div className='flex items-center justify-center'>
           <div className='z-10  flex flex-col bg-white rounded-lg w-[100%] md:w-[230px] '>
            <div className='cursor-pointer' onClick={navigatetoProfile}>
           
            <div className='relative flex items-center justify-center rounded-lg'>
               <img className='w-[100%] absolute top-[1px] object-cover h-[100px] rounded ' src={user.bgImageURL}/>
                <img className='h-[90px] w-[90px] rounded-full bg-red-50 border-2 z-20 relative bottom-[-50px] ' src={user.ProfileImageURL}/>
            </div>
            <div className='mt-10 text-center text-wrap md:max-w-[250px] max-w-[100%] border-b-2 p-3'>
               <h3 className='font-semibold hover:text-blue-600 hover:underline'>{user.Name}</h3>
               <h4 className='text-wrap break-all text-sm text-gray-500 w-[100%]'>{user?.HeadLine}</h4>
            </div>
            </div>
            <div className='items-center justify-between hidden p-2 border-b-2 cursor-pointer md:flex hover:bg-slate-200'>
              <p>Profile Views</p>
              <p className='font-semibold text-blue-500'>300+</p>
            </div>
            <div className='items-center justify-between hidden p-2 border-b-2 cursor-pointer md:flex hover:bg-slate-200'>
              <p>Connections</p>
              <p className='font-semibold text-blue-500'>{myConnections.length}</p>
            </div>
            <div className='items-center justify-between hidden p-2 border-b-2 cursor-pointer md:flex hover:bg-slate-200'>Try premium for free</div>
            <div className='items-center hidden p-2 border-b-2 cursor-pointer md:flex g-2 hover:bg-slate-200'>
              <PiRectangleFill />
              My Items
            </div>
           </div>
      </div>
    </div>
  )
}
