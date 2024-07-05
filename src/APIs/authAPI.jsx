import { getAuth, signInWithEmailAndPassword,updateProfile ,createUserWithEmailAndPassword,signOut} from "firebase/auth";

const updateuserInfo =(name) =>{
   const auth = getAuth();
   updateProfile(auth.currentUser, {
     displayName: name
   }).then(() => {
     console.log(updated);
   }).catch((error) => {
     // An error occurred
     // ...
   });
}


export const LoginAPI = async (email,password) =>{
  try {
      let auth = getAuth();
       const userCredential = await signInWithEmailAndPassword(auth ,email, password);
      return userCredential;
    } 
   catch (error) {
        console.log('m');
         throw error;   
    }
}
export const RegisterApi = async (email,password,name) =>{
   let auth =getAuth();
  try{
       const data = await createUserWithEmailAndPassword(auth, email, password);
       console.log(auth.currentUser);
      updateuserInfo(name);
      return data;
   }
   catch(error){
    return error;
   }  
}

export const SignOut = async() =>{
   const auth = getAuth();
   signOut(auth).then(() => {
      
    }).catch((error) => {
      console.log(error);
    });
}
