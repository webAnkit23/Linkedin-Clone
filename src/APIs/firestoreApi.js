
import { firestore } from "../firebase"
import { storage } from "../firebase";
import {doc ,getDocs,getDoc, addDoc,setDoc ,collection ,onSnapshot, Query, query, where, deleteDoc } from "firebase/firestore"
import { getDownloadURL,ref, uploadBytesResumable} from 'firebase/storage';
import { serverTimestamp } from "firebase/firestore";

const postdb = collection(firestore ,'posts');
const userdb = collection(firestore ,'users');
const likedb = collection(firestore ,'likes');
const commentDB = collection(firestore ,'comments');
const connectionDb = collection(firestore , 'connections');
 export const sendPostTofirebase = async (post) =>{
  try{
    const res = await addDoc(postdb,{
      ...post,
      time : serverTimestamp()
     });
   
  }
 catch(err){
  return err;
 }
}
export const fetchPosts = async(setPosts) =>{
  onSnapshot(postdb ,(snapshot) =>{
      setPosts(snapshot.docs.map((doc) =>{
          return {...doc.data(), id:doc.id}
      }))
     })
}
export const fetchAllUsers = async(setAllUsers) =>{
    onSnapshot(userdb ,(snapshot) =>{
      setAllUsers(snapshot.docs.map((doc) =>{
        return {
          id:doc.id,
          ...doc.data()
        }
      }))
    })
}

export const createUserOnFirebase = async (info) =>{
try {
  const docRef = await addDoc(userdb, {
    Name: info.name ,
    Email:info.email ,
    Uid : info.uid,
    ProfileImageURL : 'https://cdni.iconscout.com/illustration/premium/thumb/coder-3462295-2895977.png',
    bgImageURL :'https://images.fastcompany.com/image/upload/wp-cms/uploads/2021/03/LinkedIn-Default-Background-2020--813x201.webp'

  }); 
} catch (e) {
  console.error("Error adding document: ", e);
}
}
export const updateInfo = async (ref,data) =>{
  try{
  await setDoc(doc(firestore, 'users', ref), {
    ...data,
  },{merge : true});
 }
 catch(err){
  
 }
}

export const fetchCurrentUserInfo =(setUser) =>{
  const curEmail = localStorage.getItem('userEmail');
  
   onSnapshot(userdb , snapshot =>{
      const user = snapshot.docs.map(doc =>{
        return {
          ...doc.data() , userID : doc.id
        }
       }).filter((item) =>{
        return item.Email === curEmail
       })
       setUser(user[0]);
  })
}
export const fetchOtherUserInfo =async(userID) =>{
  try {
    const docRef = doc(firestore, "users", userID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else
     {
      throw new Error('not found');
    }
  } catch (error) {
    throw new Error('Error getting document');
  }
}


 export const likePost =(postID ,userID ,isliked) =>{
  console.log('e');
  try{
     let doctoLike = doc(likedb , `${postID+'_'+userID}`);
     if(isliked){
      deleteDoc(doctoLike);
      return;
     }
     setDoc(doctoLike , {userID ,postID});
  }
  catch(e){
     console.log(e);
  }
}
export const connectPeople =(currentUserID ,secondID,isConnected) =>{
  
  try{
    let doctoConnect = doc(connectionDb ,`${currentUserID+'_'+secondID}`);
    if(isConnected){
      deleteDoc(doctoConnect);
      return ;
    }
    setDoc(doctoConnect ,{myID:currentUserID , personID:secondID});
  }
  catch(e) {
    console.log(e);
  }
}
export const checkConnections =(currentUserID ,secondID ,setConnection) =>{
  try{
    let connectQuery = query(connectionDb ,where('myID','==',currentUserID ) ,where('personID' ,'==',secondID));
     onSnapshot(connectQuery ,(res) =>{
       let c = res.docs.map(doc =>doc.data());
       if(c.length>0){
        setConnection(true);
       }
       else{
        setConnection(false);
       }
     })
  }
  catch(e) {
    console.log(e);
  }
}
export const getMyConnections =(currentUserID,setMyConnections) =>{
   try{
     const quer = query(connectionDb ,where('myID','==',currentUserID));
     onSnapshot(quer ,(res) =>{
      let c = res.docs.map(doc => {
        return {
          id:doc.id,
          ...doc.data()
        }
      });
        setMyConnections(c);
     })
   }
   catch(e){
    console.log(e);
   }
}

export const getLikes =(postID ,userID ,setLikeCount ,setUserLike) =>{
  try{
  let likequery = query(likedb ,where('postID' , '==' ,postID));
  onSnapshot(likequery ,(res) =>{
     let likes = res.docs.map(doc =>doc.data());
     setLikeCount(likes.length);
      
     const isLike = likes.some((like) => like.id = userID);
     setUserLike(isLike);
  })
}
catch(e){
  console.log(e);
}
}
export const PostComment =(postID,comment,userID,commentPerson,commentPersonImageURL) =>{
  console.log(userID);
  try{
        addDoc(commentDB ,{
          postID ,
          comment ,
         userID ,
         commentPersonImageURL ,
         commentPerson,
          time:serverTimestamp()
        });
  }
  catch(e){
    console.log(e);
  }
}
export const getComment =(postID,setAllComments,) =>{
  try{
    const commentQuery = query(commentDB ,where('postID' ,'==' , postID));

    onSnapshot(commentQuery ,(res) =>{
    const comments =res.docs.map((doc) =>{
    return { 
       id:doc.id ,
      ...doc.data()
    }
    });
    setAllComments(comments);
    })

  }
  catch(e){
    console.log(e);
  }
}
export const getImageURL =async (file ,email,url) =>{
  const postRef = ref(storage ,`post/${email}'/'${Date.now()*Math.round(Math.random()*100000)}`);
  const uploadtask = uploadBytesResumable(postRef,file);
  uploadtask.on('state_changed' ,snapshot =>{
   const progress =  Math.round(snapshot.bytesTransferred /snapshot.totalBytes )*100;
   console.log(progress);
  },(err) =>{
   console.log(err);
  } ,async() =>{
   getDownloadURL(uploadtask.snapshot.ref).then((res) =>{
    console.log(res);
    url =res;
   })
  }) 
}