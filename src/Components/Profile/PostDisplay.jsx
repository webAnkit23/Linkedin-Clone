import React ,{useState ,useEffect} from 'react'
import Post from '../Posts/Post';
export default function PostDisplay({posts ,userID}) {
    console.log(posts,userID);
    const [filterPost ,setFilterPost] = useState([]);
    useEffect(() =>{
        const filter = posts.filter((post) => post?.userID === userID);
        setFilterPost(filter);
    },[posts]);
    console.log(filterPost);
  return (
    <div>
        
        <h1 className='pt-3 mt-8 text-3xl font-semibold text-blue-700 border-t-2'>Posts</h1>
        <div className='mt-4 mb-4 border-gray-300'>
        {filterPost.map((post ,i) =>{
          return <Post key={i} post ={post}/>
        })}
    </div>
    </div>
  )
}
