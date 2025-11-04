import { socket } from "../../../socket.js"
import { useState, useEffect } from "react"

export default function Footer({ setMessages, chat_id, members, my_id }){
  const [ message,setMessage ] = useState({
    sender: my_id, receiver_id: members, chat_id, text:""
  })
  
  
  function sendMessage(){
    socket.emit("user_message",message)
    setMessage({sender: my_id, receiver_id: members, chat_id, text:""})
  }
   useEffect(()=>{
     
     socket.on("new_message",(message)=>{
      if(message.chat_id === chat_id){
        setMessages((prev)=>{
          return [ ...prev, message]
        })
      }
    })
     
   },[])
  
  
  return(
    <div className=" shrink-0 flex items-center justify-between p-3 px-5">
      {/*Options*/}
      <div className="text-2xl flex gap-3">
        <i className="fa-solid fa-image"></i>
        <i className="fa-solid fa-microphone"></i>
      </div>
      {/*Type message*/}
      <div className="flex gap-3">
        <input 
        value={message.text}
        onChange={(e)=>{
          setMessage((prev)=>({...prev, text: e.target.value}))
        }} className="bg-[#192a2a] rounded-2xl px-3 py-1 outline-none" type="text" placeholder="Message" />
        <i onClick={sendMessage} className="text-2xl fa fa-paper-plane" aria-hidden="true"></i>
      </div>
    </div>
    )
}