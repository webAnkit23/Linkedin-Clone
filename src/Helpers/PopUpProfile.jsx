import React from 'react';
import '../styles/PopUpProfile.css';
import profilephoto from '../assets/profilephoto.png' 
import { useNavigate } from 'react-router-dom';
import { SignOut } from '../APIs/authAPI';
import { useUserContext } from '../Context/userContext';
export default function PopUpProfile({setshowProfilePopUp}) {
  const navigate = useNavigate();
  const {user} = useUserContext();
    const handleClick =() =>{
      setshowProfilePopUp(false);
        navigate('/profile' ,{user});
    }
    const handleSignOut = async () =>{
        await SignOut();
    }
  return (
    <div className='z-50 popUPcontainer'>
        <div className="flex flex-col popTop">
                <img className='border-2 border-blue-100 shadow' src={user.ProfileImageURL}/>
                <div className="popInfo">
                    <h4 className='font-semibold '>{user.Name}</h4>
                    {user.College&&<h5 className=''>Attended <span className='font-semibold text-blue-700'>{ user.College}</span></h5>}
                </div>
                <button className='view_profile' onClick={handleClick}>View Profile</button>        
        </div>
        <div className="popMiddle">
               <h5>Account</h5>
               <ul  className='popUp_ul'>
               <li>Settings and Privacy</li>
               <li>help</li>
               <li>Language</li>
               </ul>
        </div>
        <div className="popBottom">
                <h5>Manage</h5>
               <ul className='popUp_ul'>
               <li>Post And Activity</li>
               <li>Job Posting Account</li>
               <li onClick={handleSignOut}>Sign out</li>
               </ul>
        </div>
    </div>
  )
}
