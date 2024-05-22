import React, { useEffect,useState, useMemo } from 'react'
import Post from './Post'
import { fetchPosts } from '../../APIs/firestoreApi';
export default function PostWrapper() {
  const [posts ,setPosts] = useState([]);
  useMemo(() =>{
    fetchPosts(setPosts);
  },[]);

   return <div className='mt-4 border-t-2 mb-[100px]'>, 
        {posts?.length>0?posts.map((post ,i) =>{
          return <Post key={i} post ={post}/>
        }):<div className='mt-5 text-2xl text-center'>No posts to Display. <span className='text-blue-700'>Create one</span></div>}
    </div>
  
}
