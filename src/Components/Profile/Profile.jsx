import React ,{useState ,useMemo, useEffect} from 'react'
import ProfileDisplay from './ProfileDisplay'
import PostDisplay from './PostDisplay'
import { fetchPosts } from '../../APIs/firestoreApi'
export default function Profile({user}) {
  const [posts ,setPosts] = useState([]);
  useMemo(() =>{
   fetchPosts(setPosts);
  },[])
  console.log(posts);
  useEffect(() =>{
    document.body.style.overflowX ='hidden';
    return () =>{
      document.body.style.overflowX ='scroll';
    }
},[])
  return (
    <div>
      <div className='mt-2 ml-2 mr-2 bg-white rounded-lg shadow'>

    
        <ProfileDisplay user={user}/>
        </div>
        <PostDisplay posts ={posts} userID ={user.userID}/>
    </div>
  )
}
