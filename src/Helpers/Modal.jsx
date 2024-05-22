import React, { useState ,useRef} from 'react'
import '../styles/Modal.css'
import * as ReactDOM from 'react-dom';
import { RxCross2 } from "react-icons/rx";
import { GoFileMedia } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { MdOutlineArticle } from "react-icons/md";
import profilephoto from '../assets/profilephoto.png'
import { sendPostTofirebase } from '../APIs/firestoreApi';
import Loader from '../Components/Loader';
import { useUserContext } from '../Context/userContext';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL,ref, uploadBytesResumable} from 'firebase/storage';
import { storage } from '../firebase';
export default function Modal({handleClick ,setshowModal}) {
    const [text,setText] = useState("");
    const [loading ,setLoading] = useState(false);
    const [image ,setImage] = useState(null);
    const {user} = useUserContext();
    const inputRef = useRef();
    const handleChange =(e) =>{
      const file = e.target.files[0];
      setImage(file);
    }
  const handleuplaodPostwithImage =() =>{
    const postRef = ref(storage ,`post/${user.Email}'/'${uuidv4()}`);
    const uploadtask = uploadBytesResumable(postRef,image);
    uploadtask.on('state_changed' ,snapshot =>{
     const progress =  Math.round(snapshot.bytesTransferred /snapshot.totalBytes )*100;
     console.log(progress);
    },(err) =>{
     console.log(err);
    } ,async() =>{
     getDownloadURL(uploadtask.snapshot.ref).then(async(res) =>{
      let object ={
        postUser : user.Name ,
        text:text,
        userEmail : user.Email ,
        ProfileImageURL : user.ProfileImageURL,
        userID :user.userID,
        postID: uuidv4(),
        Imageurl : res
      }
      const re= await sendPostTofirebase(object);
     })
    }) 
  }
    const handleSubmit = async () =>{
      

       try{
        setLoading(true);
        if(image){
          handleuplaodPostwithImage();
          return;
        }
        let object ={
          postUser : user.Name ,
          text ,
          userEmail : user.Email ,
          ProfileImageURL : user.ProfileImageURL,
          userID :user.userID,
          postID: uuidv4()
        }
       const res= await sendPostTofirebase(object);
       console.log(res);
       if(res){
        throw new Error('server is down');
       }
       }
       catch(err){
        console.log(err);
       }
       finally{
        setshowModal(false);
        setLoading(false);
        setText('');
        setImage(null);
        
       }
          
          
        

    }
  return  ReactDOM.createPortal(
    <>
       
    {loading&&<Loader/>}
    <div className="display_overlay "  onClick={handleClick}> </div>
    <div className="modalbox z-[1000]">
     <div className="topModal z-[1000]">
        <div className="p-1 modalphoto">
            <img className='h-[70px] object-contain border-2 rounded-full w-[70px]' src={user.ProfileImageURL} alt="" />
            <h3>{user.Name}</h3>
        </div>
        <RxCross2 className='Modalcross' size={30} onClick={handleClick}/>
     </div>
     {image&& <img className='h-fit max-h-[250px] object-cover ' src={URL.createObjectURL(image)}/>}
     <textarea  className={` modal_textarea`} placeholder='What do you want to talk about' value={text} onChange={(e) => setText(e.target.value)}/>
         <div className="modal_icons">  
         <input type='file' onChange={(e) => handleChange(e)} ref ={inputRef} className='absolute opacity-0' accept='images/*'/>
         <GoFileMedia onClick={() => inputRef.current.click()} className='Modalicon' color='#0087eb'  size={30}/>
         <SlCalender className='Modalicon' color='#7d0707' size={30}/>
         <MdOutlineArticle className='Modalicon' color='rgb(243 87 36)' size={30}/>
         </div>
         <button className='modalPost hover:bg-blue-500 hover:text-white disabled:opacity-45'  onClick={handleSubmit}  disabled ={text?false:true}>Post</button>
    </div>
    
    </>,document.getElementById('modalPortal')
  )
}
