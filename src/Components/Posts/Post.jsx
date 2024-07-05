import React, { useEffect, useMemo, useState } from 'react'
import { IoMdGlobe } from "react-icons/io";
import { RxCross2 } from 'react-icons/rx';
import Comments  from './Comments';
import { IoPaperPlaneSharp } from "react-icons/io5";
import { getComment } from '../../APIs/firestoreApi';
import Like from './Like';
import { useUserContext } from '../../Context/userContext';
import { FaRegCommentDots } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { fetchOtherUserInfo } from '../../APIs/firestoreApi';

export default function Post({post}) {
  const [showComment ,setShowComment] = useState(false);
  const [allComments ,setAllComments] = useState([]);
  const [postUser , setPostUser] = useState(null);
  const navigate = useNavigate();
  const {user} = useUserContext();
  const userID = user.userID;
   useMemo(() =>{
   getComment(post.postID ,setAllComments);
   },[post.postID ,userID]);

   const handleClick =() =>{
      navigate(`../profile/${post.userID}`);
   }
   useMemo(() =>{
    if(!user)return;
    fetchOtherUserInfo(post?.userID)
    .then((res) =>{
     setPostUser({
       userID:userID,
       ...res
     });
    })
    .catch((e) =>{
     console.error(e);
    })
   },[user]);
   const formatdate =useMemo(() =>{
    if(!post)return ;
    let a =post?.time?.toDate();
    let arr =a?.toString()?.split(' ');
    if(!arr)return;
    return arr[2] + " " + arr[1] + " "+arr[3] ;
   },[post]);
  return (
    <div className='w-[100%] bg-white border-2 rounded-lg p-2 shadow-lg border-slate-200 mt-4'>
        <div className='relative grid grid-cols-[auto_1fr] gap-2'>
            <RxCross2 size={35} className='absolute sm:flex hidden p-1 duration-200 rounded-full hover:bg-gray-200 top-[-4px] right-0'/>
            <div className='w-[90px] h-[90px] border-2 rounded-full'>
                <img className='object-cover h-[90px] w-[90px] rounded-full' src={postUser?.ProfileImageURL}/>
            </div>
            <div className=''>
            <h1 onClick={handleClick} className='text-lg cursor-pointer '>
              <span className='hover:text-blue-600 hover:underline'>{postUser?.Name}</span><span  className='text-gray-500 cursor-default font-lg'> {postUser?.Pronouns?`(${postUser?.Pronouns})`:''}</span></h1>
            <span className='text-sm text-gray-500 flex flex-wrap break-all max-h-[80px] overflow-hidden text-wrap max-w-[80%]'>{postUser?.HeadLine}</span>
            <p className='flex items-center '>{formatdate} <span className='ml-1 font-bold'>.</span ><IoMdGlobe className='ml-1 text-blue-600 ' size={20}/></p>
            </div>
        </div>
        <div className='mt-3 ml-2 text-lg text-gray-600'>
           <p >{post?.text}</p>
        </div>
        <div className='flex justify-center'>
            <img className={`max-w-[100%] max-h-[500px] object-fill p-2 ${post?.Imageurl?'border-t-2':''}  shadow-sm'`} src={post.Imageurl}/>
        </div>
        <div className='flex items-center justify-around p-0 pt-1 mb-1 border-t-2 '>
               <Like userID ={userID} postID ={post?.postID}/>
               <div onClick={() => setShowComment((prev) => !prev)} className='p-1 pl-4 pr-4 rounded-lg hover:bg-gray-100'>
                <FaRegCommentDots className={`${showComment ? 'text-blue-600' :'text-gray-800'}`} size={25}/>
               </div>
               
               <div className='p-1 pl-4 pr-4 rounded-lg hover:bg-gray-100'>
                <IoPaperPlaneSharp size={25}/>
               </div>
        </div>
        {showComment&& <Comments userID ={userID} postID ={post.postID} allComments={allComments}/>}
    </div>
  )
}
