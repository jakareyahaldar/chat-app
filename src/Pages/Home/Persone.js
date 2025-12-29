import { useNavigate } from "react-router-dom"
import useParsedCookie from "../../hooks/useParsedCookie.js"

export default function Persone({ last_message, chat }){
  const Navigate = useNavigate()
  const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7aH70ubSk8FPfa1NLXvIP_wWOVbueWEQkA&usqp=CAU"
  
  const { _id } = useParsedCookie()
  const { user_avatar, user_name, typing } = chat
  const isMyMessage = last_message.sender === _id
  const last_message_text = last_message.text ? last_message.text.slice(0,20) : "Start new chat."
  
  
  return(
    <div onClick={()=>Navigate("/inbox",{ state:{chat} })} className="hover:scale-95 transition flex justify-between items-center p-3" key={chat.user_name}>
        <div className="flex gap-3 items-center">
          <img className="w-[70px] h-[70px] rounded-full shrink-0 object-cover" src={user_avatar ? user_avatar : defaultAvatar} alt="Persone" />
          <div className="flex flex-col ">
            <p>{user_name}</p>
            <p className={`${!last_message.seen && !isMyMessage ? "font-bold" :"text-[#84d9d5]"} text-sm`}>{typing ? "Typing.." : last_message_text }</p>
          </div>
        </div>
        {
          (last_message.seen && isMyMessage) && <img className="w-[20px] h-[20px] rounded-full object-cover" src={user_avatar} alt="Persone" />
        }
      </div>
    )
}