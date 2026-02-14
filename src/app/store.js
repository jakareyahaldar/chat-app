import { configureStore } from '@reduxjs/toolkit'
import chatsSlice from "../features/chats/chatsSlice.js"
import helperSlice from "../features/helper/helperSlice.js"
import userSlice from '../features/user/userSlice.js'

export default configureStore({
  reducer: {
    chats: chatsSlice,
    helper : helperSlice,
    user : userSlice
  }
})