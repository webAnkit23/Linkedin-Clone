import React from 'react'

export default function RightSection() {
  return (
    <div className='hidden lg:grid'>

      <div className='  bg-white overflow-y-hidden border-2 rounded-lg max-w-[310px] overflow-x-hidden  h-[500px] text-wrap'>
       
        <div className=''>

     
        <div className= 'flex gap-2 p-2 pb-3 mb-2 border-b-2 '>
          <p className='text-lg font-semibold'>Messeges</p>
          <input className='p-1 pl-2 rounded-lg outline-none bg-blue-50 r' type='text' placeholder='search messeges'/>
        </div>

        <div>
           <div className='max-h-[100px] overflow-hidden p-2 grid-cols-[.5fr_1fr_.5fr]  grid gap-1  border-b-2'>
            <img className='rounded-full h-[70px]  border-2 p-2' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShB7IwN9gr4q2Tn-1CRfbgANRN-8SWlYMMy9iq467T1A&s'/>
            <div className='flex flex-col max-w-[140px]'>
              <h1 className='font-semibold'>dummy person</h1>
              <p className='text-wrap max-h-[50px] truncate'>dummy data</p>
            </div>
            <span className='relative grid '>Apr 15</span>
           </div>
           <div className='max-h-[100px] overflow-hidden p-2 grid-cols-[.5fr_1fr_.5fr] grid gap-1  border-b-2'>
            <img className='rounded-full h-[70px]  border-2 p-2' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShB7IwN9gr4q2Tn-1CRfbgANRN-8SWlYMMy9iq467T1A&s'/>
            <div className='flex flex-col max-w-[140px]'>
              <h1 className='font-semibold'>dummy person</h1>
              <p className='text-wrap max-h-[50px] truncate'>dummy messeges </p>
            </div>
            <span className='relative grid'>Apr 15</span>
           </div>
           <div className='max-h-[100px] overflow-hidden p-2 grid-cols-[.5fr_1fr_.5fr] grid gap-1  border-b-2'>
            <img className='rounded-full h-[70px]  border-2 p-2' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShB7IwN9gr4q2Tn-1CRfbgANRN-8SWlYMMy9iq467T1A&s'/>
            <div className='flex flex-col max-w-[140px]'>
              <h1 className='font-semibold'>dummy person</h1>
              <p className='text-wrap max-h-[50px] truncate'>dummy messeges </p>
            </div>
            <span className='relative grid'>Apr 15</span>
           </div>
           <div className='max-h-[100px] overflow-hidden p-2 grid-cols-[.5fr_1fr_.5fr] grid gap-1  border-b-2'>
            <img className='rounded-full h-[70px]  border-2 p-2' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShB7IwN9gr4q2Tn-1CRfbgANRN-8SWlYMMy9iq467T1A&s'/>
            <div className='flex flex-col max-w-[140px]'>
              <h1 className='font-semibold'>dummy person</h1>
              <p className='text-wrap max-h-[50px] truncate'>dummy messeges </p>
            </div>
            <span className='relative grid'>Apr 15</span>
           </div>
           <div className='max-h-[100px] overflow-hidden p-2 grid-cols-[.5fr_1fr_.5fr] grid gap-1  border-b-2'>
            <img className='rounded-full h-[70px]  border-2 p-2' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShB7IwN9gr4q2Tn-1CRfbgANRN-8SWlYMMy9iq467T1A&s'/>
            <div className='flex flex-col max-w-[140px]'>
              <h1 className='font-semibold'>dummy person</h1>
              <p className='text-wrap max-h-[50px] truncate'>dummy messeges </p>
            </div>
            <span className='relative grid'>Apr 15</span>
           </div>
           
           
        </div>
      </div>
      </div>
    </div>
  )
}
