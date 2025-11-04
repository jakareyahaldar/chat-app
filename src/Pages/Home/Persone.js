import { useNavigate } from "react-router-dom"

export default function Persone({ last_message, seen, chat }){
  const Navigate = useNavigate()
  const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7aH70ubSk8FPfa1NLXvIP_wWOVbueWEQkA&usqp=CAU"
  
  const { user_avatar, user_id, user_name } = chat
  
  return(
    <div onClick={()=>Navigate("/inbox",{ state:{chat} })} className="hover:scale-95 transition flex justify-between items-center p-3">
        <div className="flex gap-3 items-center">
          <img className="w-[70px] h-[70px] rounded-full object-cover" src={user_avatar ? user_avatar : defaultAvatar} alt="Persone" />
          <div className="flex flex-col ">
            <p>{user_name}</p>
            <p className={`${!seen ? "font-bold" :"text-[#84d9d5]"} text-sm`}>{last_message}</p>
          </div>
        </div>
        {
          seen && <img className="w-[20px] h-[20px] rounded-full object-cover" src={user_avatar} alt="Persone" />
        }
      </div>
    )
}