import Header from "./Header.js"
import Messages from "./Messages.js"
import Footer from "./Footer/Footer.js"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import useParsedCookie from "../../hooks/useParsedCookie.js"

export default function Inbox({ chat }){
  
  const myCookie = useParsedCookie()
  
  const [ messages, setMessages ] = useState([])
  const location = useLocation()
  const { user_name, user_avatar, chat_id, user_id } = location?.state?.chat || {}
  
  
  return(
    <div className="flex flex-col h-dvh">
      <Header name={user_name} avatar={user_avatar} />
      <Messages avatar={user_avatar} messages={messages} my_id={myCookie._id} />
      <Footer chat_id={chat_id} members={user_id} my_id={myCookie._id} setMessages={setMessages} />
    </div>
    )
}