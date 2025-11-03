import { useRef, useEffect } from "react"
import Message from "./Message.js"


export default function Messages(){
  const MessagesEl = useRef(null)
  
  useEffect(()=>{
    console.log(MessagesEl)
    MessagesEl.current.scrollTop = MessagesEl.current.scrollHeight
  },[])
  
  return(
    <div ref={MessagesEl} className="h-full grid gap-3 p-3 grow-0 overflow-scroll">
      
      <Message message="Hi" user={true} />
      <Message message="Hello How are you ?"  />
      <Message user={true} message="I am fine and you?"  />
      <Message message="Yeah oky bye.. by the way What is your name." />
      <Message message="Yeah oky bye.. by the way What is your name." />
      
      <Message message="Hi" user={true} />
      <Message message="Hello How are you ?"  />
      <Message user={true} message="I am fine and you?"  />
      <Message message="Yeah oky bye.. by the way What is your name." />
      <Message message="Yeah oky bye.. by the way What is your name." />
      
      <Message message="Hi" user={true} />
      <Message message="Hello How are you ?"  />
      <Message user={true} message="I am fine and you?"  />
      <Message message="Yeah oky bye.. by the way What is your name." />
      <Message message="Yeah oky bye.. by the way What is your name." />
      
      <Message message="Hi" user={true} />
      <Message message="Hello How are you ?"  />
      <Message user={true} message="I am fine and you?"  />
      <Message message="Yeah oky bye.. by the way What is your name." />
      <Message message="Yeah oky bye.. by the way What is your name." />
      
    </div>
    )
}