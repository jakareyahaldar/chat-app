import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'

const api = process.env.REACT_APP_API_URL
export const GetChatList = createAsyncThunk("chats/GetChatList", async (_id)=>{
  try{
       let res = await fetch(api+"/message/chat/"+_id)
       res = await res.json()
       return res.chats
     }catch(err){
       console.log(err)
     }
})

export const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    isLodding:false,
    error: null,
    chats:[]
  },
  reducers: {
    pushMessage: (state,action)=>{
      const newMessage = action.payload
      state.chats = state.chats.map((chat)=>{
        if( chat.chat_id === newMessage.chat_id ){
          const prev_messages = chat.messages ? chat.messages : []
          prev_messages.push(newMessage) // push new
          return { ...chat, messages: prev_messages }
        }else{
          return chat
        }
      })
    },
    messageSeen: (state,action)=>{
      const currentState = current(state)
      const { chat_id, message_id } = action.payload
      state.chats = currentState.chats.map((chat)=>{
        // chat scope
        if(chat.chat_id !== chat_id) return chat
        
        const messages = chat.messages ? chat.messages : []
        const newMessages = messages.map((message)=>{
          // message scope
          if( message.message_id !== message_id ) return message
          return { ...message, seen: true }
        })
        
        return {...chat, messages:newMessages}
        
      })
    }
  },
  extraReducers: (builder)=>{
    builder
      .addCase(GetChatList.fulfilled,(state,action)=>{
        state.isLodding = false
        const ls = window.localStorage.getItem("jlc")
        const localChats = ls ? JSON.parse(ls) : []
        const onlineChats = action.payload
        
        if(!localChats.length){
          window.localStorage.setItem("jlc",JSON.stringify(onlineChats))
          state.chats = onlineChats
          return
        }
        
        state.chats = localChats
        
      })
      .addCase(GetChatList.pending,(state)=>{
        state.isLodding = true
      })
      .addCase(GetChatList.rejected,(state)=>{
        state.error = "Intarnal Error."
        state.isLodding = false
      })
  }
})

export const { pushMessage, messageSeen } = chatsSlice.actions
export default chatsSlice.reducer