import React ,{useState} from 'react'
import * as ReactDOM from 'react-dom';
import { RxCross2 } from "react-icons/rx";
import { storage } from '../firebase';
import { getDownloadURL,ref, uploadBytesResumable } from 'firebase/storage';
import { updateInfo } from '../APIs/firestoreApi';
import { useUserContext } from '../Context/userContext';
import Loader from '../Components/Loader';
export default function ImageModal({setImageModal,profileImage,setProfileImage}) {
  const {user} = useUserContext();
  const [loading ,setLoading] = useState(false);
  const handleUpload = () =>{
    try{
      setLoading(true);
    const profileRef = ref(storage ,`profilePhoto/${user.Email}`);
     const uploadtask = uploadBytesResumable(profileRef,profileImage);
     uploadtask.on('state_changed' ,snapshot =>{
      const progress =  Math.round(snapshot.bytesTransferred /snapshot.totalBytes )*100;
   
     },(err) =>{
      toast.error(err);
     } ,async() =>{
      getDownloadURL(uploadtask.snapshot.ref).then((res) =>{
        updateInfo(user.userID ,{ProfileImageURL : res})
      })
     }) 
    }
    catch(e){
      toast.error(e);
    }
    finally{
      setLoading(false);
    }
  }
  return (
     ReactDOM.createPortal(
        <>
        {loading&&<Loader />}
        <div className="" >
        <div className='display_overlay' onClick={() =>setImageModal(false)} >
            <div className='z-[200] relative animate-[modal_.3s_ease-in_1_backwards] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex flex-col items-center gap-4 p-4 bg-blue-100 rounded-lg w-fit '>
               
                <img className='rounded-full h-[200px] w-[200px] object-fill' src={URL.createObjectURL(profileImage)}/>
                <button className='p-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 ' onClick={handleUpload}>Update</button>
                 <RxCross2 className='absolute hover:text-red-400 top-1 right-1' size={30} onClick={() =>{setProfileImage(null)
                  setImageModal(false)}}/>
            </div>
        </div>
        </div>
        </>,document.getElementById('modalPortal')
  ))
}
