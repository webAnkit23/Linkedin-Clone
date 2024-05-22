import React, { useEffect, useMemo, useRef, useState } from 'react'
import LinkedInicon from '../assets/LinkedInicon.png'
import { LiaSearchSolid } from "react-icons/lia";
import '../styles/topbar.css';
import PopUpProfile from '../Helpers/PopUpProfile.jsx';
import {CgProfile} from 'react-icons/cg';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchAllUsers } from '../APIs/firestoreApi.js';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { TbMessageDots } from "react-icons/tb";
import { BiSolidShoppingBags } from "react-icons/bi";
import { Outlet } from 'react-router-dom';
export default function Topbar() {
 // const location = useLocation();
  const getCurrentLocation =() =>{
   // if(location.pathname ='/profile'){
      return 5;
  //}
  if(location.pathname ='/connections'){
    return 1;
}
  return 0;
}
useEffect(() =>{
 setactiveindex(getCurrentLocation());
},[])
  const [activeindex ,setactiveindex] = useState(getCurrentLocation());
  const [showProfilePopUp,setshowProfilePopUp] = useState(false);
  
  let a= {
    name : 'me',
    icon : CgProfile ,
}
  return (
    <>
    
    <div className='bg-white topbar_container'>
   <div className='topbar_left'>
    <a href='/home'><img  className='h-[30px] w-[30px] sm:w-max'  src={LinkedInicon} /></a>
       <Search />
      </div>
        <div className="z-10 topbar_list">
          <div>

         
         <Link to = '/home'><div className='topbar_icon sm:w-[70px] '>
                       <FaHome size={25} />
                       <p>Home</p>   
                </div>
        </Link>
        </div>
        <div>
        <Link to = '/connections'><div className='topbar_icon sm:w-[70px]'>
                       <IoPeopleSharp size={25} />
                       <p>Connections</p>   
                </div>
        </Link>
        </div>
        <div>
                <Link to = '/jobs'><div className='topbar_icon sm:w-[70px]'>
                       <BiSolidShoppingBags size={25} />
                       <p>Jobs</p>   
                </div>
        </Link>
        </div>
        <div>
        <Link to = '/messeges'><div className='topbar_icon sm:w-[70px]'>
                       <TbMessageDots size={25} />
                       <p>Messeges</p>   
                </div>
        </Link>
        </div>
        <div>
        <Link to = '/notifications'><div className='topbar_icon sm:w-[70px]'>
                       <IoMdNotifications size={25} />
                       <p>Notifications</p>   
                </div>
        </Link>
        </div>
        <Outlet />
      </div>
      <div className='relative'>
      <div  className={`topbar_icon w-auto sm:w-[65px] `} onClick={() =>setshowProfilePopUp(!showProfilePopUp)}>
                     {<a.icon size={25} />}
                     <p>{a.name}</p>      
                  </div>
                  {showProfilePopUp && <PopUpProfile setshowProfilePopUp ={setshowProfilePopUp}/>} 
        </div> 
    </div>
    <hr className='border-[1px]'/>
    
    </>
  )
}

 function Search(){
   const [search ,setSearch] = useState('');
   const [allUsers ,setAllUsers] = useState([]);
   const [filterdata ,setFilterData] = useState([]);
   
   const handleChange =(e) =>{
    setSearch(e.target.value);
   }
   useMemo(() =>{
       fetchAllUsers(setAllUsers);
   },[]);
   useEffect(() =>{
    let timer =null;
      if(search){
        timer = setTimeout(() =>{
             console.log('a');
             const fil = allUsers.filter((user) =>user.Name.toLowerCase().startsWith(search.toLowerCase()));   
             setFilterData(fil);  
             },250);
            }
            else{
              clearInterval(timer);
              setFilterData([]);
            }
         return () =>{
          clearTimeout(timer);
         }
   },[search]);

  return  ( 
        <div className='relative w-[100%]'>
           <div className="topbar_search">
             <LiaSearchSolid size={30} />
             <input value={search} onChange={(e) =>handleChange(e)} type='text' placeholder='search' className='topbar_searchbox'></input>
         </div>

         {filterdata.length>0&&
         <div className='absolute w-[100%] bg-white rounded shadow z-[1000] '>
      { filterdata.map((person) =>{
        return <div key={person.id} className='flex items-center gap-3 p-2 duration-75 hover:bg-gray-300'>
        <img className='w-[50px] h-[50px] border-2 object-cover rounded-full' src={person.ProfileImageURL}/>
        <div>
          <h2>{person.Name}</h2>
        </div>
      </div>

       })}
       </div>}
       
            
            
         </div>
       
    )
 }
