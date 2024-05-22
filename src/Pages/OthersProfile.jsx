import React ,{useEffect, useState} from 'react'

import { useParams } from 'react-router-dom';
import { fetchOtherUserInfo } from '../APIs/firestoreApi';
import Profile from '../Components/Profile/Profile';
import Loader from '../Components/Loader';
export default function OthersProfile() {
   const {userID} = useParams();
    const [profilePersonInfo ,setProfilePersonInfo] = useState(null);
    useEffect(() =>{
       fetchOtherUserInfo(userID)
       .then((res) =>{
        setProfilePersonInfo({
          userID:userID,
          ...res
        });
       })
       .catch((e) =>{
        console.error(e);
       })
    },[]);
    console.log(profilePersonInfo);
  return (
    <div>
        
       {profilePersonInfo? <div className='flex items-center justify-center'>
     <div className='lg:w-[800px] md:w-[650px] sm:w-[500px] w-[400px] max-w-[100%] rounded  grid items-center '>
     <Profile user={profilePersonInfo}/>
     </div>
     </div>: <Loader />}
       
    </div>
  )
}
