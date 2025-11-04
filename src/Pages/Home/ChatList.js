import Persone from "./Persone.js"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import useParsedCookie from "../../hooks/useParsedCookie.js"

export default function ChatList(){
  const api = process.env.REACT_APP_API_URL
  const data = useParsedCookie()
  const [ chats, setChats ] = useState([])
  const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7aH70ubSk8FPfa1NLXvIP_wWOVbueWEQkA&usqp=CAU"
  
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
        console.log(chat)
          return(
          <Persone 
            image={chat.user_avatar ? chat.user_avatar : defaultAvatar}
            seen={true}
            name={chat.user_name}
            chat={chat}
            last_message="You: Hi - 5:16 PM" />
          )
        })
      }
      
      
      
      
    </div>
    )
}