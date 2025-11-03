import Persone from "./Persone.js"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import useParsedCookie from "../../hooks/useParsedCookie.js"

export default function ChatList(){
  const api = process.env.REACT_APP_API_URL
  const data = useParsedCookie()
  const [ chats, setChats ] = useState([])
  
  useEffect(()=>{
   async function GetChats(){
     const { _id } = data
     try{
       let res = await fetch(api+"/message/chat/"+_id)
       res = await res.json()
       setChats(res.chats)
     }catch(err){
       console.log(err)
     }
   }
   GetChats()
    
  },[])
  
  
  if(!chats.length){
    return(
      <div className="h-full w-full flex justify-center items-center">
        <p><i className="fas fa-comment-medical"></i> Start a New chat</p>
      </div>
      )
  }
  
  return(
    <div className="grid gap-2 p-3 relative">
      
      
      
      {
        chats.map((chat)=>{
          return(
          <Persone 
            image={chat.user_avatar}
            seen={true}
            name={chat.user_name}
            last_message="You: Hi - 5:16 PM" />
          )
        })
      }
      
      
      
      
    </div>
    )
}