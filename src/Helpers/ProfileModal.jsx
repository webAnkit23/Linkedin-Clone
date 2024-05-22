import React ,{useState} from 'react'
import { RxCross2 } from "react-icons/rx";
import * as ReactDOM from 'react-dom';
import { updateInfo } from '../APIs/firestoreApi';
import { useUserContext } from '../Context/userContext';
const getinitailValue = () =>{
         return {
            Name :'',
            Pronouns : '',
            HeadLine : '',
            Industry :'',
            College:'',
            Education : '',
            Country : '',
            City: '',
         }
}
export default function ProfileModal({setEditModal}) {
  return (
         ReactDOM.createPortal(
            <>
           <div className='display_overlay' onClick={() =>setEditModal(false)}></div>
            <div className='z-[10000] m-2 absolute h-[600px] max-w-[100%] overflow-y-scroll shadow-2xl bg-white border-2  rounded-lg top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>
                <div>
                    <div className='flex items-center w-[700px] max-w-[100%] justify-between p-2 border-b-2 shadow-sm'>
                        <span className='text-xl font-semibold'>Edit Info</span>
                        <RxCross2 onClick={() =>setEditModal(false)} size={40} className='p-1 rounded-full hover:bg-gray-200'/>
                    </div>

                    <EditForm setEditModal ={setEditModal}/>
                </div>
            </div>
            </>,
            document.getElementById('modalPortal')
         )
  )
}

function EditForm({setEditModal}){
    const labels =['Name' ,'Pronouns' ,'HeadLine' ,'Industry','College' ,'Education' ,'Country' ,'City','PhoneNumber'];
    const {user} = useUserContext();
 
    const [form ,setForm] = useState(getinitailValue());
    const handleChange =(e ,label) =>{
        setForm( {...form , [label] : e.target.value});
        
    }
    const handleSubmit =(e) =>{
        e.preventDefault();
        if(!checkfields())return;
          updateInfo(user.userID,form);
          setEditModal(false);
    }
    const checkfields =() =>{
        if(form.Name&&form.City&&form.Country&&form.Education&&form.College&&form.HeadLine&&form.Industry&&form.Pronouns&&form.PhoneNumber)return true;
        return false;
    }
    return <div>
        <form onSubmit={(e) =>handleSubmit(e)}>
        <div>
            {labels.map((label ,i) =>{
                return <div className='flex flex-col gap-[2px] p-3 rounded-sm' key={i}>
                <label>{label}</label>
                <input required  onChange={(e) =>handleChange(e,label)} className='border-[1px] p-1 border-black rounded-sm outline-1  hover:outline-2' type='text' />
            </div>
            })}
        </div>
        <div className='flex items-center justify-end p-2 border-t-2'>
            <button  type='submit' className='p-1 pl-2 pr-2 text-lg font-semibold w-[100px] text-white bg-blue-600 border-2 rounded-3xl'>Save</button>
        </div>
        </form>
    </div>
}
