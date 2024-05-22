import React from 'react'
import AddPost from './AddPost'
import PostWrapper from './Posts/PostWrapper'

export default function FeedPost() {
  return (
    <div className ='flex-1 max-w-[600px] w-[100%] justify-center' >
       <AddPost />
       <PostWrapper />
        </div>
  )
}
