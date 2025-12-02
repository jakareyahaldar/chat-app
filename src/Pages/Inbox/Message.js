export default function Message({ userId, message, avatar, isLastMessage, setSelectedMessages }){
  const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7aH70ubSk8FPfa1NLXvIP_wWOVbueWEQkA&usqp=CAU"
  const isUser = message.sender === userId
  
  return(
    <div onDoubleClick={()=>setSelectedMessages(message)} className={`${isUser ? "ml-auto" : ""} my-3 px-3 flex gap-3 items-end max-w-[60%] relative`}>
        {
          !isUser && <img className=" h-[30px] w-[30px] rounded-full object-cover" src={avatar ? avatar : defaultAvatar} alt="."/>
        }
        <div className={`${isUser ? "ml-auto" : ""} h-fit p-2 rounded-2xl bg-[#172828]`}>
          <p>{message.text}</p>
        </div>
        {isUser && isLastMessage && message.seen && <img className="h-[20px] w-[20px] rounded-full inline-block absolute -bottom-6 right-2" src={avatar ? avatar : defaultAvatar}  alt="."/>}
      </div>
    )
}