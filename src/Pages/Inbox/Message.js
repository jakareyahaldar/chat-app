export default function Message({ userId, message, avatar, isLastMessage, setSelectedMessages }){
  const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7aH70ubSk8FPfa1NLXvIP_wWOVbueWEQkA&usqp=CAU"
  const isUser = message.sender === userId
  
// function LongStringWrapper(str){
//     const strSlice = str.split(" ")
//     const brokeLongWord = strSlice.map((slice)=>{
//       if(slice.length > 15){
//         const loop = (slice.length / 15) > Math.floor(slice.length / 15) ? Math.floor(slice.length / 15) + 1 : slice.length / 15
//         console.log(loop)
//         let newSlice = ""
//         let loopCount = 0
//         for(let i = 1;i<= loop; i++){
//           newSlice+= "\n" + slice.slice(loopCount*15,i*15)
//           loopCount++
//         }
//         return newSlice
//       }else{
//         return slice
//       }
//     }).join(" ")
//     return brokeLongWord
//   }

const replyMessage = message.replyMessage
  return(
    <div onDoubleClick={()=>setSelectedMessages(message)} className={`my-3 px-3 flex gap-3 items-end relative`}>
        {
          !isUser && <img className="shrink-0 h-[30px] w-[30px] rounded-full object-cover" src={avatar ? avatar : defaultAvatar} alt="."/>
        }
        <div className={`${isUser ? "ml-auto" : ""} h-fit p-2 rounded-2xl bg-[#172828]`}>
          <p className="max-w-[280px] break-words" >
            <span className="block text-sm text-[#a69696]">{replyMessage?.text}</span>
            <span>{message.text}</span>
          </p>
        </div>
        {isUser && isLastMessage && message.seen && <img className="h-[20px] w-[20px] rounded-full inline-block absolute -bottom-6 right-2" src={avatar ? avatar : defaultAvatar}  alt="."/>}
      </div>
    )
}