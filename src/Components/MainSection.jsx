import React from 'react';
import FeedPost from './FeedPost';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
export default function MainSection() {
  return (
    <div className='container-full'>
    <div className=' flex gap-5  p-[20px] justify-center items-center md:items-start flex-col md:flex-row' >
        <LeftSection />
        <FeedPost />
        <RightSection />
    </div>
    </div>
  )
}
