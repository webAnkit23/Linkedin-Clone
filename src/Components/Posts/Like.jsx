import { useMemo, useState } from "react";
import React from 'react'
import { BiLike, BiSolidLike } from "react-icons/bi";
import { getLikes, likePost } from "../../APIs/firestoreApi";
export default function Like({postID ,userID}) {
    const [isliked ,setisLiked] = useState(false);
    const [likeCount ,setLikeCount]  = useState(0);
    
    const handleLike =() =>{
       likePost(postID ,userID ,isliked);
    }
    useMemo(() =>{
      getLikes(postID ,userID ,setLikeCount , setisLiked);
    },[postID]);
    
  return (
    <div className='flex gap-2 p-1 pl-4 pr-4 rounded-lg hover:bg-gray-100 ' onClick={handleLike}>
      {isliked ? <BiSolidLike className='text-blue-600' size={25} /> : <BiLike  size={25}/>}
      <p className="text-lg">{likeCount}</p>
     </div>
  )
}
