import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './UserSlice'
export const store = configureStore({
  reducer: {
    user : UserReducer
  },
})