import { useRef, useEffect, useState } from "react"
import Message from "./Message.js"
import { socket } from "../../socket.js"


export default function Messages({ messages, my_id, avatar }){
  const MessagesEl = useRef(null)
  
  
  useEffect(()=>{
    MessagesEl.current.scrollTop = MessagesEl.current.scrollHeight
  },[messages])
  
  return(
    <div ref={MessagesEl} className="h-full p-3 grow-0 overflow-scroll">
      
      
      {
        messages.map((msg)=>{
          return(
          <Message message={msg.text} user={ msg.sender === my_id } avatar={avatar} />
          )
        })
      }
      
      
    </div>
    )
}