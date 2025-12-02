import { useRef, useEffect } from "react"
import Message from "./Message.js"
import { socket } from "../../socket.js"


export default function Messages({ messages, my_id, avatar, setSelectedMessages }){
  const MessagesEl = useRef(null)
  
  
  useEffect(()=>{
    MessagesEl.current.scrollTop = MessagesEl.current.scrollHeight+100
  },[messages])
  
  return(
    <div ref={MessagesEl} className="h-full p-3 grow-0 shrink overflow-scroll">
      
      
      {
        messages.map((msg,i,arr)=>{
        
        if(!msg.seen && msg.sender !== my_id){
          const message_id = msg.message_id
          const chat_id = msg.chat_id
          //dispatch(messageSeen({ message_id, chat_id }))
          socket.emit("seen",{chat_id,message_id})
        }
        
        const isLastMessage = i === (arr.length-1)
        
          return(
          <Message message={msg} userId={ my_id } avatar={avatar} isLastMessage={isLastMessage} setSelectedMessages={setSelectedMessages} />
          )
        })
      }
      
      
    </div>
    )
}