import { socket } from "../../../socket.js"
import { useState, useRef } from "react"
import { useSelector } from "react-redux"
import MyAlert from "../../../CastomElements/MyAlert.js"

export default function Footer({ chat_id, members, my_id }){
  const InputEl = useRef({})
  const helper = useSelector((state)=> state.helper)
  const [showAlert,setShowAlert] = useState(false)
  const messageTemplate = {
    message_id: window.crypto.randomUUID(),
    sender: my_id,
    receiver_id: members,
    chat_id,
    text:"",
    seen:false 
  }
  const [ message,setMessage ] = useState(messageTemplate)
  
  
  function sendMessage(){
    InputEl.current.focus()
    if(!helper.socketIo_connected){
      setShowAlert(true)
      return
    }
    socket.emit("user_message",{ ...message, atSend:Date.now() })
    setMessage(messageTemplate)
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
      <div className=" shrink-0 flex items-center justify-between p-3 px-5">
      {/*Options*/}
      <div className="text-2xl flex gap-3">
        <i className="fa-solid fa-image"></i>
        <i className="fa-solid fa-microphone"></i>
      </div>
      {/*Type message*/}
      <div className="flex gap-3">
        <input
        ref={InputEl}
        value={message.text}
        onChange={(e)=>{
          setMessage((prev)=>({...prev, text: e.target.value}))
        }} className="bg-[#192a2a] rounded-2xl px-3 py-1 outline-none" 
        type="text" placeholder="Message" />
        <i onClick={sendMessage} className="text-2xl fa fa-paper-plane" aria-hidden="true"></i>
      </div>
    </div>
    </>
    )
}