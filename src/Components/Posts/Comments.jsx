import React, { useState } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { PostComment } from '../../APIs/firestoreApi';
import { useUserContext } from '../../Context/userContext';
import { comment } from 'postcss';
export default function Comments({postID ,userID,allComments}) {
  const [text ,setText] = useState('');
  const {user} = useUserContext();
  console.log(userID)
  const handleClick =() =>{
      PostComment(postID ,text,userID ,user.Name ,user.ProfileImageURL);
      setText('');
  }
  const formattime =(date) =>{
    return date?.toDate()?.toLocaleDateString();
   
  }
  
  return (
    <>
    <div className='flex items-center p-1 pl-2 pr-2 border-2 rounded-xl'>
    <input value={text} onChange={(e) =>setText(e.target.value)} className='w-[100%] rounded-xl p-1 focus:outline-none' type='text' placeholder='Add comment'/>
    <FaArrowRight onClick={handleClick} className='text-blue-500 hover:scale-110' size={25}/>
  </div>
    {allComments.length>0&&
    <div className='m-2 max-h-[220px] flex flex-col gap-2 overflow-y-scroll '>
    {allComments.map((comment) =>{
      return <div className='flex gap-2 ' key={comment.id}>
              <img className='h-[60px] rounded-full w-[60px] border-2 ' src={comment?.commentPersonImageURL}/>
            <div className='p-2 mr-2 relative bg-gray-100 rounded-xl w-[100%]'>
              <h2 className='font-semibold cursor-pointer hover:text-blue-600 hover:underline'>{comment.commentPerson}</h2>
            <span>{comment.comment}</span>
            <span className='absolute top-2 right-2'>{formattime(comment.time)}</span>
              </div>
            
            </div>
    })}
     </div>
    }
    
  </>
  )
}
