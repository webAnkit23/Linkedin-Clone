import React from 'react'
import '../styles/InputField.css'
export default function InputField({type ,myid ,label,handleChange}) {
    const style ={
        display: 'flex',
       flexDirection: 'column',
        gap: '5px'
      }
  return (
    <div style={style}> 
         <label htmlFor={myid}>{label}</label>
           <div>
          <input type={type} id={myid} onChange={(e) =>handleChange(e)} className='inputbox'></input>
          </div>
    </div>
  )
}
