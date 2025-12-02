import Persone from "./Persone.js"
import { useSelector } from "react-redux"

export default function ChatList(){
  const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7aH70ubSk8FPfa1NLXvIP_wWOVbueWEQkA&usqp=CAU"
  
  
  const chatsList = useSelector((state)=> state.chats )
  const chats = chatsList.chats
  
  
  // Extract Last messaage
  function ExtractLastMessage(ChatList){
    const LastMessageObj = {}
    // loop
    for(const chat of ChatList){
      
      const chatName = chat.chat_id
      const lastMessage = chat.messages?.length ? chat.messages[chat.messages.length-1] : {}
      console.log(chat)
      LastMessageObj[chatName] = lastMessage
       
    }
    return LastMessageObj
  }
  
  const MyLastMessages = ExtractLastMessage(chats)
  console.log(MyLastMessages)
  
  
  let alert_message = ""
  if(ChatList.isLodding) alert_message = "Lodding.."
  if(!ChatList.isLodding && ChatList.error) alert_message = ChatList.error
  if(!ChatList.isLodding && !chatsList.chats.length) alert_message = "Start a New chat."
  if(!chats.length){
    return(
      <div className="h-full w-full flex justify-center items-center">
        <p><i className="fas fa-comment-medical"></i> {alert_message} </p>
      </div>
      )
  }
  
  return(
    <div className="grid gap-2 p-3 relative">
      
      
      
      {
        chats.map((chat)=>{
          return(
          <Persone 
            image={chat.user_avatar ? chat.user_avatar : defaultAvatar}
            name={chat.user_name}
            chat={chat}
            key={chat.user_name}
            last_message={MyLastMessages[chat.chat_id]} />
          )
        })
      }
      
      
      
      
    </div>
    )
}