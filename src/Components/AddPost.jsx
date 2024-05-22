import React, { useEffect, useState } from 'react'
import '../styles/Addpost.css';
import { GoFileMedia } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { MdOutlineArticle } from "react-icons/md";
import profilephoto from '../assets/profilephoto.png'
import Modal from '../Helpers/Modal';
import { useUserContext } from '../Context/userContext';
export default function AddPost() {
     const [showModal ,setshowModal] = useState(false);
     const {user} = useUserContext();
     const handleClick =() =>{
          if(showModal){
               document.body.style.overflow = 'scroll';
          }
          else{
               document.body.style.overflow = 'hidden';
          }
          setshowModal(!showModal);
     }
     useEffect(() =>{
          return () =>{
               document.body.style.overflow = 'scroll';
          }
     })
  return (
     <>
    <div className="gap-2 p-2 postBox h-fit ">
        <div className="postInputs  sm:flex-row flex-col w-[100%]">
            <img className='h-[60px] w-[60px] object-cover rounded-full border-2 ' src ={user.ProfileImageURL?user.ProfileImageURL:profilephoto}></img>
            <div onClick={handleClick} className='w-[100%]'>Start a post</div>
        </div>

        <div className="thingstoadd" >
           <div className=" item" onClick={handleClick}>
                <GoFileMedia color='#0087eb'  size={25}/>
                Media
           </div>
           <div className=" item" onClick={handleClick}>
                <SlCalender color='#7d0707' size={20}/>
                Events
           </div>
           <div className="item" onClick={handleClick}>
                <MdOutlineArticle color='rgb(243 87 36)' size={25}/>
                Articles
           </div>  
        </div>
    </div>
    {showModal && <Modal setshowModal ={setshowModal} handleClick ={handleClick} />}
    </>
  )
}
