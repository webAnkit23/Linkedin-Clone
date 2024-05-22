import React,{useState,useEffect,useRef} from 'react'
import Topbar from '../Components/Topbar'
import { useMemo } from 'react';
import Loader from '../Components/Loader';
import { auth } from '../firebase';
import {onAuthStateChanged } from "firebase/auth";
import { fetchCurrentUserInfo, getMyConnections } from '../APIs/firestoreApi';
import { useNavigate } from 'react-router-dom';
import { checkConnections, connectPeople, fetchAllUsers } from '../APIs/firestoreApi';
import { GoPersonAdd } from "react-icons/go";
import { useUserContext } from '../Context/userContext';
export default function Connections() {
  const navigate = useNavigate();
  const [loading ,setLoading] = useState(true);
  const [allUsers ,setAllUsers] = useState([]);
  const [myConnections ,setmyConnections] = useState([]);
  const [filter ,setFilter] = useState('all');
  const {user,setUser} = useUserContext();

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
  useMemo(() =>{
    fetchCurrentUserInfo(setUser);
    getMyConnections(user?.userID ,setmyConnections);

   },[]);
   useMemo(()=>{
      fetchAllUsers(setAllUsers)
      .then(() =>{
      })
   },[])
   const handleClick =(value) =>{
    setFilter(value);
   }
  return (
    <div>
      {loading?<Loader /> :
        <div className='flex items-center justify-center p-3 mt-4'>
           <div className=' lg:max-w-[1000px] flex flex-col gap-3  p-4 shadow bg-white border-2 rounded '>
            <h1 className='text-xl'>People you may know based on your recent activity</h1>
            <div className='flex gap-3'>
              <button onClick={() =>handleClick('all')} className={`border-2 rounded-2xl pl-2 pr-2 w-[100px] hover:bg-blue-200 ${filter==='all'?'bg-blue-300 border-blue-700':''} hover:border-blue-600 duration-300`}>All</button>
              <button onClick={() => handleClick('my')} className={`border-2 rounded-2xl pl-2 pr-2 hover:bg-blue-200 ${filter==='my'?'bg-blue-300 border-blue-700':''} hover:border-blue-600 duration-300`}>My Connections</button>
            </div>
            <div className='relative flex flex-wrap justify-center w-auto gap-4 '>

              {filter=='all'?allUsers.length>0?allUsers.map(person =>{
             return <ConnectBox key={person.id} person = {person} currentUser={user} />
              }):<div className='text-xl font-semibold text-blue-500'>No connections to show</div>
               :<>
               <div className='flex w-[100%] text-blue-700 font-semibold justify-start gap-2 text-xl text-left '>{myConnections?.length }<span>Connections</span></div>
               {myConnections.length>0&&allUsers.map(person =>{
             return <ConnectBox key={person.id} person = {person} currentUser={user} />
            })}</>}
        
        </div>
        </div>
    </div>}
    </div>
  )
}


function ConnectBox({person,currentUser}){
  const [isConnected ,setIsConnected] = useState(false);
  useMemo(() =>{
    checkConnections(currentUser.userID,person.id,setIsConnected);
  },[]);
const handleClick =() =>{
  connectPeople(currentUser.userID ,person?.id ,  isConnected);
}
  return <div className='border-2 shadow-lg hover:shadow-2xl rounded-lg w-[210px]'>
     <div className='relative flex items-center justify-center rounded-lg'>
               <img className='w-[100%] absolute top-[1px] object-cover h-[60px] rounded ' src={person?.bgImageURL}/>
                <img className='h-[90px] w-[90px] rounded-full   z-20 relative bottom-[-20px] ' src={person?.ProfileImageURL}/>
            </div>
            <div className='flex flex-col items-center justify-between h-[54%] p-3 mt-5'>
              <h1 className='p-1 font-semibold cursor-pointer hover:text-blue-600 hover:underline'>{person?.Name}</h1>
              <h2 className='break-all text-center max-w-[100%]'>{person?.HeadLine?.substring(0,50)}</h2>
              <button onClick={handleClick} className={`flex self-bottom hover:bg-blue-100 duration-300 text-blue-800  box-border gap-1 items-center border-[1px] w-[100%] hover:border-blue-800 ${isConnected?'bg-gray-300 ':''} border-blue-500 rounded-xl mt-2 justify-center`}>
                   <GoPersonAdd className={`text-blue-800` }size={20}/><span>{isConnected?'Connected':'connect'}</span>
              </button>
            </div>
  </div>
}
