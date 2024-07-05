import React from 'react'
import { useState } from 'react';
import { RegisterApi } from '../APIs/authAPI';
import Logo from '../assets/Logo.png';
import loginImage from '../assets/loginImage.svg';
import InputField from './InputField';
import useMyNavigate from '../hooks/useMyNavigate';
import { createUserOnFirebase } from '../APIs/firestoreApi';
import { toast } from 'react-toastify';
export default function RegisterComponent() {
  const navigate = useMyNavigate();
    const [form,setform] = useState({
         name:'',
         email :"",
         password : ""
      });
      let handleChange =(e) =>{
         setform( (prev) =>{ return {...prev, [e.target.id] : e.target.value}});
      }
      let handleSubmit = async (e) =>{
               e.preventDefault();
               try {
                const result = await RegisterApi(form.email, form.password,form.name);
                if (result instanceof Error) {
                  throw new Error(result.message);
                }
                 else {
                  localStorage.setItem('userEmail' , result.user.email);
                   createUserOnFirebase({name:form.name ,email : form.email ,uid : result.user.uid});
                  navigate('/home');
                }
              } catch (error) {
                toast.error(error.message);
              }
              finally{
                setform({ email :"",
                password : ""});
              }
      }
      let handleClick =() =>{
        navigate('/');
   }
  return (
    <div className='loginContainer'>
        <div className="formContainer">
        <img className='LinkedinLogo' src={Logo}></img>
        <form className='form' onSubmit={(e) =>handleSubmit(e)}>
            <h1>Take your next step towards your career</h1>
            <InputField type ='text' myid ='name' label  ='Name' handleChange ={handleChange}></InputField>
            <InputField type ='email' myid ='email' label  ='Email' handleChange ={handleChange}></InputField>
            <InputField type='password' myid ='password'  label='Password' handleChange ={handleChange}></InputField>
            <p>By clicking Agree & Join, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.</p>
            <button className='button blue white' type='submit'>Agree and Join</button>
            <p className='or'>or</p>
        </form>
        <button className= {`button transparent borderhide`} onClick={handleClick}>Already on LinkedIn? Sign in</button>  
    </div>
        <img src={loginImage} className='login_hero_img'></img>
    </div>
  )
}
