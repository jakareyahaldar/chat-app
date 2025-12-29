import useParsedCookie from "../../hooks/useParsedCookie.js"
import { socket } from "../../socket.js"

export default function MessageDetails(props){
  // All Props
  const {
    componentState,
    members
  } = props
  
  const [detailsState,setState] = componentState
  const myCookie = useParsedCookie()
  
  if(!detailsState) return null
  const message = detailsState.message
  
  function HandleUndoReact(reactData){
    socket.emit("undo_react",{
      ...reactData,
      receiver: members,
      message: { chat_id:message.chat_id, message_id: message.message_id }
    })
    setState(null)
  }
  
  
  return(
    <div className="w-[90%] p-4 rounded-xl bg-[#231212] z-20 fixed left-1/2 top-1/3 -translate-x-1/2 border">
      <i onClick={()=>setState(null)} className="text-xl absolute right-3 top-3 fa-solid fa-xmark"></i>
      <p className=" my-2.5 break-words w-[calc(80%_+_10px)]">{message.text}</p>
      <h3>Reactions</h3>
      <div className="p-3">
        {
          message.react.map((re)=>{
            return(
            <div key={re.react_code} className="flex justify-between items-center my-2">
              <div className="w-4/5 flex justify-between items-center">
                <p>{members[members.findIndex(mem=>mem.user_id===re.sender)].user_name}</p>
                <span>{String.fromCodePoint(re.react_code)}</span>
              </div>
              { re.sender === myCookie._id && <i onClick={()=>HandleUndoReact(re)} className="fa-solid fa-xmark"></i> }
            </div>
            )
          })
        }
      </div>
    </div>
    )
}