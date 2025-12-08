import { socket } from "../../../socket.js"
import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import MyAlert from "../../../CastomElements/MyAlert.js"
//import { saveChats } from "../../../features/chats/chatsSlice.js"

export default function Footer({ chat_id, members, my_id, selectedMessagesState, BottomPaddState }){
  
  // Ref Elements
  const InputEl = useRef({})
  const replyBox = useRef({clientHeight:10})
  const footerContainar = useRef({})
  const replyPragraph = useRef({})
  
  const helper = useSelector((state)=> state.helper)
  const [showAlert,setShowAlert] = useState(false)
  const [messagesBottomPadding,setMessageBottomPadd] = BottomPaddState
  const [selectedMessage, setSelectedMessage] = selectedMessagesState
  const messageTemplate = {
    message_id: window.crypto.randomUUID(),
    sender: my_id,
    receiver_id: members,
    chat_id,
    text:"",
    seen:false
  }
  const [ message,setMessage ] = useState(messageTemplate)
  
  useEffect(()=>{
    if(replyPragraph.current.style){
      replyPragraph.current.style.width = Math.floor(footerContainar.current.clientWidth / 1.5) + "px"
    }
  },[])
  
  useEffect(()=>{
    const ReplyMsgBoxHeight = replyBox?.current?.clientHeight
    setMessageBottomPadd( (ReplyMsgBoxHeight || 0 ) + 10 + "px")
  },[messagesBottomPadding,selectedMessage])
  
  function sendMessage(){
    if(!helper.socketIo_connected){
      setShowAlert(true)
      return
    }
    if(message.text === "") return
    socket.emit("user_message",{ ...message, atSend:Date.now(), replyMessage: selectedMessage })
    setMessage(messageTemplate)
    setSelectedMessage(null)
    InputEl.current.focus()
    InputEl.current.style.height = "40px"
  }

  
  
  return(
    <>
      
      {/*Alert*/}
      <MyAlert 
        title="Error!"
        text="Server Disconnected"
        show={showAlert}
        fixed={true}
        yes_btn_text="Ok"
        no_btn_text="Cancel"
        onClose={()=>setShowAlert(false)}
        onConfrom={()=>setShowAlert(false)}
      />
      
      {/*Main Jsx*/}
      <div ref={footerContainar} className="w-full shrink-0 flex items-center justify-between p-3 px-5 relative">
      {/*Options*/}
      <div className="text-2xl flex gap-3">
        <i className="fa-solid fa-image"></i>
        <i className="fa-solid fa-microphone"></i>
      </div>
      {/*Reply selected Messages*/}
      {
        selectedMessage !== null && (
        <div ref={replyBox} className="w-full flex justify-between items-center px-5 absolute left-0 -translate-y-[100%]">
        <div>
          <p>Replying to</p>
          <p ref={replyPragraph} className="max-w-[300px] break-words">{selectedMessage.text}</p>
        </div>
        <i
          onClick={()=>setSelectedMessage(null)}
          className="text-white shrink-0 fas fa-undo"></i>
      </div>
        )
      }
      {/*Type message*/}
      <div className="flex gap-3">
        <textarea
        ref={InputEl}
        onKeyDown={(e)=>{
          const enter = e.key === "Enter"
          if(enter){
            sendMessage()
            e.preventDefault()
          }
        }}
        value={message.text}
        rows="1"
        onChange={(e)=>{
          e.target.style.height = e.target.scrollHeight + "px";
          setMessage((prev)=>({...prev, text: e.target.value}))
        }} className="bg-[#192a2a] rounded-2xl px-3 py-2 py-1 outline-none" 
        type="text" placeholder="Message"></textarea>
        <button type="submit">
          <i onClick={sendMessage} className="text-2xl fa fa-paper-plane" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    </>
    )
}