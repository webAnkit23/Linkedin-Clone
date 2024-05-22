import React, { useEffect, useState } from 'react'
import { MdLocationOn } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import ProfileModal from '../../Helpers/profileModal';
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { storage } from '../../firebase';

import { getDownloadURL,ref, uploadBytesResumable } from 'firebase/storage';
import { updateInfo } from '../../APIs/firestoreApi';
import { useRef } from 'react';
import ImageModal from '../../Helpers/ImageModal';
import { useUserContext } from '../../Context/userContext';
export default function ProfileDisplay({user}) {
    const [editModal ,setEditModal] = useState(false);
    const [bgImage ,setBgImage] = useState(null);
    const [profileImage ,setProfileImage] = useState(null);
    const [imageModal ,setImageModal] = useState(false);
    const bgref = useRef();
    const dpRef = useRef();
    const {user :currentUser} = useUserContext();
    console.log(user);
    const handleBgClick =() =>{
        bgref.current.click();
    }
    const handleProfileClick =() =>{
        dpRef.current.click();
    }
    const handleBgChange =(e) =>{
        const file = e.target.files[0];
        setBgImage(file);
        const bgRef = ref(storage ,`bgPhoto/${user.Email}`);
        const uploadtask = uploadBytesResumable(bgRef,file);
        uploadtask.on('state_changed' ,snapshot =>{
         const progress =  Math.round(snapshot.bytesTransferred /snapshot.totalBytes )*100;
         console.log(progress);
        },(err) =>{
         console.log(err);
        } ,async() =>{
         getDownloadURL(uploadtask.snapshot.ref).then((res) =>{
            console.log(res);
           updateInfo(user.userID ,{bgImageURL : res})
         })
        }) 
    }
    const handleProfileImageChange =(e) =>{
            const file = e.target.files[0];
            setProfileImage(file);
            setImageModal(true);
    }
  
  return (
     <div>
        <div className='relative p-[20px] text-selection-none' >
            <input className='absolute z-[-100]' onChange ={(e) => handleBgChange(e)} accept='image/*' ref={bgref} type='file'></input>
           {user.Email===currentUser.Email&& <MdEdit onClick={handleBgClick} size={40} className='absolute p-2 text-blue-500 bg-white rounded-full cursor-pointer right-5 top-5'/>}
        <img className='object-fill w-[100%] h-[180px] rounded-t-lg' src={user.bgImageURL}/>
        <div className='w-[120px] h-[120px] group rounded-full p-1  bg-white relative left-4 top-[-70px] '>
            <input  type ='file' className='absolute z-[-100]'ref={dpRef} onChange ={(e) => handleProfileImageChange(e)}/>
            <MdOutlinePhotoLibrary className='absolute hidden group-hover:flex text-blue-600 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' size={30}/>
            <img onClick={handleProfileClick} className='group-hover:opacity-40 cursor-pointer rounded-full w-[100%] h-[100%] bg-slate-200 '  src={user.ProfileImageURL}/>
        </div>
        </div>

        <div className='relative top-[-60px]  pl-5'>
       {user.Email===currentUser.Email&& <MdEdit onClick={() => setEditModal(true)} size={40} className='hover:bg-gray-300 duration-300 absolute top-[-50px] p-2 text-blue-500 bg-white rounded-full cursor-pointer right-5'/>}
            <div className='flex flex-col gap-2'>
                <div>
                <h1 className='text-2xl font-semibold'>{user?.Name} <span className='text-sm font-light'>{user.Pronouns ? `(${user.Pronouns}) `:''}</span></h1>
                <h2 className='text-lg text-gray-500 text-wrap sm:max-w-[400px]'>{user?.Headline}</h2>
                </div>
                <h2 className='text-lg font-medium text-blue-700'>{user.College ? `went to ${user.College}`:''}</h2>
                <h2>{user?.Education? user.Education : ''}</h2>
               {user.City&& <h3 className='flex items-center'> {user.City},{user.Country}<MdLocationOn className='text-blue-400' size={25}/></h3>}
                <span className='font-medium text-blue-600 '>40 connections</span>
                 <div className='flex flex-col '>
                    <span>Phone Number : {user.PhoneNumber?user.PhoneNumber :'Complete your profile'}</span>
                    <span>Email : {user.Email}</span>
                 </div>
                 
            </div>
        </div>
        {editModal&& <ProfileModal setEditModal ={setEditModal}/>}
        {imageModal&&<ImageModal setProfileImage={setProfileImage} profileImage ={profileImage} setImageModal={setImageModal}/>}
     </div>
   
     
  )
}
