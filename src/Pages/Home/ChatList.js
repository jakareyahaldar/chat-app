import Persone from "./Persone.js"
import { useSelector } from "react-redux"

export default function ChatList() {
  const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7aH70ubSk8FPfa1NLXvIP_wWOVbueWEQkA&usqp=CAU"


  const chatsList = useSelector((state) => state.chats)
  const userData = useSelector((state) => state.user)
  const user = userData?.data?.data
  let chats = chatsList.chats

  if(chats.length && user?.blocked_accounts){
    chats = chats.filter(ch => !user.blocked_accounts.includes(ch.user_id) )
  }
  if(chats.length && user?.blocked_by){
    chats = chats.filter(ch => !user.blocked_by.includes(ch.user_id) )
  }


  // Extract Last messaage
  function ExtractLastMessage(argmnt) {
    const ChatList = argmnt || []
    const LastMessageObj = {}
    // loop
    for (const chat of ChatList) {

      const chatName = chat.chat_id
      const lastMessage = chat.messages?.length ? chat.messages[chat.messages.length - 1] : {}
      LastMessageObj[chatName] = lastMessage

    }
    return LastMessageObj
  }

  const MyLastMessages = ExtractLastMessage(chats)

  let alert_message = ""
  if (chatsList.isLodding) alert_message = "Please Wait.."
  if (!chatsList.isLodding && !chatsList.chats.length) alert_message = "Start a New chat."
  if (!chats.length) {
    return (
      <div className="h-dvh w-full flex justify-center items-center">
        <p><i className="fas fa-comment-medical"></i> {alert_message} </p>
      </div>
    )
  }


  return (
    <div className="grid gap-2 p-3 relative max-h-fit overflow-scroll">



      {
        chats.map((chat) => {
          return (
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