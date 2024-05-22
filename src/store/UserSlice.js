import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
   name : 'user' ,
   initialState : null,
   reducers:{
      upDateUserInfo :(user ,action) =>{
             
      }

   }
})
export const {upDateUserInfo } = userSlice.actions;
export default userSlice.reducer;
