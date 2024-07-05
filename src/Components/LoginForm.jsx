import React, { useState } from 'react'
import Logo from '../assets/Logo.png';
import '../styles/LoginForm.css';
import InputField from './InputField';
import { LoginAPI} from '../APIs/authAPI';
import useMyNavigate from '../hooks/useMyNavigate';
import { toast } from 'react-toastify';
export default function LoginForm() {
  const navigate = useMyNavigate();
  
const [form,setform] = useState({
  email :"",
  password : ""
});
let handleChange =(e) =>{
   setform( (prev) =>{ return {...prev, [e.target.id] : e.target.value}});
}
let handleSubmit = async (e) =>{
  console.log(form);
         e.preventDefault();
         try {
            const result = await LoginAPI(form.email, form.password);
            if (result instanceof Error) {
                toast.error('User not found');
                return;
            }
             else {

              localStorage.setItem('userEmail' , result.user.email);
              toast.success("signed in");
              navigate('/home');
            }
          } catch (error) {
              toast.error(error);
          }
    }
let handleClick =() =>{
     navigate('/register');
}
  return (
    <div className="formContainer">
        <img className='LinkedinLogo' src={Logo}></img>
        <form className='form' onSubmit={handleSubmit}>
            <h1>Take your next step towards your career</h1>
            <InputField type ='email' myid ='email' label  ='Email' handleChange ={handleChange}></InputField>
            <InputField type='password' myid ='password'  label='Password' handleChange ={handleChange}></InputField>
            <a href='/' className='forgot'>forgot Password?</a>
            <button className='button blue white' type='submit'>Sign in</button>
            <p className='or'>or</p>
        </form>
        <button className= {`button transparent bordershow`} onClick={handleClick} >New to Linkedin? join now!</button>
    </div>
  )
}
