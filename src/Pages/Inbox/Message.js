

export default function Message({ userId, message, avatar, isLastMessage, setSelectedMessages, ReplyBoxState, MessageDetailsState }) {
  const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7aH70ubSk8FPfa1NLXvIP_wWOVbueWEQkA&usqp=CAU"
  const isUser = message.sender === userId
  const replyMessage = message.replyMessage

  const [, setReactBoxData] = ReplyBoxState


  //// Check this message is an online message and sender not me  ? if yes then delete from database
  const isItsOlnMsgOrdltAbl = !isUser ? (message.type === "online" ? true : false) : false
  if (isItsOlnMsgOrdltAbl) {
    deleteMessageFromDatabase()
  }
  async function deleteMessageFromDatabase() {
    const api = process.env.REACT_APP_API_URL
    try{
      await fetch(api+"/message/message/",{
        method: "delete",
        headers: {"content-type":"application/json"},
        body: JSON.stringify({chat_id:message.chat_id,message_id:message.message_id})
      })
    }catch(err){
      console.log(err)
    }
  }


  function handleReactBtn(e) {
    let x = e.clientX
    x = x > window.innerWidth - 250 ? 100 : x
    let y = e.clientY
    y = y > window.innerHeight - 350 ? window.innerHeight - 400 : y
    setReactBoxData(p => ({
      receiver: p.receiver,
      x: x + "px", y: y + "px",
      message,
      sender: userId,
      show: true
    }))
  }

  const [, setMessageDetaisState] = MessageDetailsState
  function HandleMessageDetails() {
    setMessageDetaisState({ message })
  }

  return (
    <>

      <div key={userId} onDoubleClick={() => setSelectedMessages(message)} className={`my-3 px-3 flex gap-3 items-end relative`}>
        {
          !isUser && <img className="shrink-0 h-[30px] w-[30px] rounded-full object-cover" src={avatar ? avatar : defaultAvatar} alt="." />
        }
        <div className={`${isUser ? "ml-auto" : ""} h-fit flex gap-3 items-center`}>
          <p className=" relative max-w-[280px] break-words rounded-2xl p-2 bg-[#172828]" >
            <span className=" block text-sm text-[#a69696]">{replyMessage?.text}</span>
            <span>{message.text}</span>
            <div onClick={HandleMessageDetails} className="absolute right-0 -bottom-[6px] flex" >
              {message?.react?.length > 0 && message?.react?.map((re) => {
                return <span key={re.react_code} className="-m-1">{String.fromCodePoint(re.react_code)}</span>
              })}
            </div>
          </p>
          <i onClick={(e) => handleReactBtn(e)} className={`${isUser && "-order-1"} hover:opacity-100 opacity-0 fas fa-grin`}></i>
        </div>
        {isUser && isLastMessage && message.seen && <img className="h-[20px] w-[20px] rounded-full inline-block absolute -bottom-6 right-2" src={avatar ? avatar : defaultAvatar} alt="." />}

      </div>
    </>
  )
}