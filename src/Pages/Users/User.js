import useParsedCookie from "../../hooks/useParsedCookie.js"

export default function User({ avatar, name, _id }){
  const api = process.env.REACT_APP_API_URL
  const data = useParsedCookie()
  const myId = data?._id
  
  async function CreateChat(){
    console.log(myId,_id)
    if(!myId || !_id) return
    try{
      const response = await fetch(api+"/message/chat",{
        method: "POST",
        headers:{ "content-type":"application/json" },
        body: JSON.stringify({ members:[myId,_id] })
      })
      const result = await response.json()
      console.log(result)
    }catch(err){
      console.log(err)
    }
    
  }
  
  return(
    <div className="flex items-center justify-between p-3 py-1 rounded-md">
      <div className="flex gap-4 items-center p-3">
        <img className="h-[35px] w-[35px] rounded-full object-cover" src={avatar.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7aH70ubSk8FPfa1NLXvIP_wWOVbueWEQkA&usqp=CAU"} alt={name} />
        <p>{name}</p>
      </div>
      <button onClick={CreateChat} className="py-1 px-5 rounded-2xl bg-[#1a322f] text-white">Chat</button>
    </div>
    )
}