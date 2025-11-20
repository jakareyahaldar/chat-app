import { useRef, useEffect } from "react"
import Message from "./Message.js"
import { messageSeen } from "../../features/chats/chatsSlice.js"
import { useDispatch } from "react-redux"


export default function Messages({ messages, my_id, avatar }){
  const MessagesEl = useRef(null)
  const dispatch = useDispatch()
  
  
  
  useEffect(()=>{
    MessagesEl.current.scrollTop = MessagesEl.current.scrollHeight+100
  },[messages])
  
  return(
    <div ref={MessagesEl} className="h-full p-3 grow-0 shrink overflow-scroll">
      
      
      {
        messages.map((msg)=>{
        
        if(!msg.seen && msg.sender !== my_id){
          const message_id = msg.message_id
          const chat_id = msg.chat_id
          dispatch(messageSeen({ message_id, chat_id }))
        }
        
          return(
          <Message message={msg.text} user={ msg.sender === my_id } avatar={avatar} />
          )
        })
      }
      
      
    </div>
    )
}