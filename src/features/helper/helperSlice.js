import { createSlice } from '@reduxjs/toolkit'



export const helperSlice = createSlice({
  name: 'helper',
  initialState: {
    socketIo_connected: false
  },
  reducers: {
    socketIoConnected: (state,action)=>{
      if( action.payload && typeof(action.payload) === "boolean"){
        state.socketIo_connected = action.payload
      }
    }
  }
})

export const { socketIoConnected } = helperSlice.actions
export default helperSlice.reducer