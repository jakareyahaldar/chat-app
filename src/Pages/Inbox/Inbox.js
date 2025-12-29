import Header from "./Header.js"
import Messages from "./Messages.js"
import Footer from "./Footer/Footer.js"
import { useLocation } from "react-router-dom"
import useParsedCookie from "../../hooks/useParsedCookie.js"
import { useSelector } from "react-redux"
import { useState } from "react"
import MessageDetails from "./MessageDetails.js"

export default function Inbox(){
  
  
  const location = useLocation()
  const { user_name, user_avatar, chat_id, user_id } = location?.state?.chat || {}
  
  const myCookie = useParsedCookie()
  const [ selectedMessages, setSelectedMessages ] = useState(null)
  const [messagesBottomPadding,setBottomPadding] = useState("10px")
  const [ reactBoxData, setReactBoxData ] = useState({
    show: false,
    receiver: [{ user_name,user_id },{ user_name:myCookie.name, user_id:myCookie._id }]
  })
  
  const MessageDetailsState = useState(null)
  
  
  
  const allChats = useSelector((state)=> state.chats.chats )
  const [ chat ] = allChats.filter((chat)=> chat.chat_id === chat_id )
  
  return(
    <>
      <MessageDetails 
      members={reactBoxData.receiver} 
      componentState={MessageDetailsState} />
      
      <div className="flex flex-col h-full">
      <Header name={user_name} avatar={user_avatar} />
      <Messages 
        avatar={user_avatar} 
        isTyping={chat?.typing} 
        messages={ chat?.messages ? chat.messages : [] } 
        my_id={myCookie._id} 
        setSelectedMessages={setSelectedMessages} 
        BottomPaddState={[messagesBottomPadding,setBottomPadding]}
        ReplyBoxState={[ reactBoxData, setReactBoxData ]}
        MessageDetailsState={MessageDetailsState}
        />
      <Footer chat_id={chat_id} members={user_id} my_id={myCookie._id} selectedMessagesState={[selectedMessages,setSelectedMessages]} BottomPaddState={[messagesBottomPadding,setBottomPadding]} />
    </div>
    </>
    )
}