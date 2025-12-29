import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'

const api = process.env.REACT_APP_API_URL

// Get chats from database function
export const GetChatList = createAsyncThunk("chats/GetChatList", async (_id)=>{
  try{
       let res = await fetch(api+"/message/chat/"+_id)
       res = await res.json()
       return res.chats
     }catch(err){
       console.log(err)
     }
})

function margeChats(localChat=[],onlineChat=[]){
  // extract all local chat id
  const localChatsId = localChat.map(c=>c.chat_id)
  // Margeing all chats
  const marged = onlineChat.map((a_on_chat)=>{
    // check have on online or not
    const havedOnLocal = localChatsId.includes(a_on_chat.chat_id)
    if (!havedOnLocal) return a_on_chat // if not have then return
    // if have then more work
    // find the local chat
    const findLocalChat = localChat.find( lc=> lc.chat_id === a_on_chat.chat_id )
    // check both message have or not 
    const onlineMessage = a_on_chat.messages ? a_on_chat.messages : []
    const localMessage = findLocalChat.messages ? findLocalChat.messages : []
    return {
      ...a_on_chat,
      messages: [ ...localMessage, ...onlineMessage  ]
    }
  })
  return marged
}

// Chats slice code
export const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    isLodding:false,
    error: null,
    want_reload:false,
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
    },
    handleReact: (state,action)=>{
      const { sender, receiver, react_code, message } = action.payload
      if( !sender || !receiver || !react_code || !message?.message_id ) return
      const currrentState = current(state)
      const chatIndex = currrentState.chats.findIndex(c=>c.chat_id === message.chat_id)
      const messageIndex = chatIndex >= 0 ? ( currrentState.chats[chatIndex].messages?.findIndex(m=>m.message_id === message.message_id) ) : null
      if( messageIndex === null || messageIndex < 0  ) return
      const haveThisUserReact = currrentState.chats[chatIndex].messages[messageIndex].react.findIndex(re=> re.sender === sender)
      if(haveThisUserReact >= 0){
        state.chats[chatIndex].messages[messageIndex].react.splice(haveThisUserReact,1,{sender,react_code})
        return
      }
      state.chats[chatIndex].messages[messageIndex].react.push({sender,react_code})
    },
    
    UndoReact: (state,action)=>{
      const { sender, receiver, react_code, message } = action.payload
      if( !sender || !receiver || !react_code || !message?.message_id ) return
      const currrentState = current(state)
      const chatIndex = currrentState.chats.findIndex(c=>c.chat_id === message.chat_id)
      const messageIndex = chatIndex >= 0 ? ( currrentState.chats[chatIndex].messages?.findIndex(m=>m.message_id === message.message_id) ) : null
      if( messageIndex === null || messageIndex < 0  ) return
      const haveThisUserReact = currrentState.chats[chatIndex].messages[messageIndex].react.findIndex(re=> re.sender === sender)
      if(haveThisUserReact >= 0){
        state.chats[chatIndex].messages[messageIndex].react.splice(haveThisUserReact,1)
        return
      }
    },
    
    setTypingState: (state,action)=>{
      const originalState = current(state)
      state.chats = originalState.chats.map((c)=>{
        const match = c.chat_id === action.payload.chat_id
        if(match){
          return {...c,typing:action.payload.typing}
        }
        return c
      })
    },
    saveChats: (state)=>{
      window.localStorage.setItem("jlc",JSON.stringify(state.chats))
    },
    clean: (state)=>{
      state.chats = []
    },
    want_reload: (state)=>{
      state.want_reload = Date.now()
    }
  },
  extraReducers: (builder)=>{
    builder
      .addCase(GetChatList.fulfilled,(state,action)=>{
        state.isLodding = false
        state.want_reload = false
        const ls = window.localStorage.getItem("jlc")
        const localChats = ls ? JSON.parse(ls) : []
        const onlineChats = action.payload
        
        if(!localChats.length){
          window.localStorage.setItem("jlc",JSON.stringify(onlineChats))
          state.chats = onlineChats
          return
        }
        const margedChats = margeChats(localChats,onlineChats)
        state.chats = margedChats
        window.localStorage.setItem("jlc",JSON.stringify(margedChats))
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

export const { pushMessage, messageSeen, handleReact, UndoReact, setTypingState, saveChats, clean, want_reload } = chatsSlice.actions
export default chatsSlice.reducer