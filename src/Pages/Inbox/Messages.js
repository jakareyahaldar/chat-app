import { useRef, useEffect } from "react"
import Message from "./Message.js"
import { socket } from "../../socket.js"


export default function Messages({ messages, my_id, avatar, isTyping, setSelectedMessages, BottomPaddState }){
  const MessagesEl = useRef(null)
  
  const [messagesBottomPadding] = BottomPaddState
  useEffect(()=>{
    MessagesEl.current.style.paddingBottom = messagesBottomPadding
    MessagesEl.current.scrollTop = MessagesEl.current.scrollHeight+100
  },[messages,messagesBottomPadding])
  
  return(
    <>
      
      <div ref={MessagesEl} className=" h-full p-3 pb-10 grow-0 shrink overflow-y-scroll overflow-x-hidden">
      
      
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
      
      
      {
        isTyping && (
        <div className="flex gap-3 items-center">
          <img className="shrink-0 h-[30px] w-[30px] rounded-full object-cover" src={avatar} alt="." />
          <p>Typing...</p>
        </div>)
      }
      
    </div>
    </>
    )
}