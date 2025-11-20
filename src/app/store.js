import { configureStore } from '@reduxjs/toolkit'
import chatsSlice from "../features/chats/chatsSlice.js"
import helperSlice from "../features/helper/helperSlice.js"

export default configureStore({
  reducer: {
    chats: chatsSlice,
    helper : helperSlice
  }
})