import useParsedCookie from "../../hooks/useParsedCookie.js"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { want_reload } from "../../features/chats/chatsSlice.js"
import { getUserData } from "../../features/user/userSlice.js"

export default function User({ avatar, name, _id }) {
  const api = process.env.REACT_APP_API_URL
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const data = useParsedCookie()
  const myId = data?._id

  const chatlist = useSelector(state => state.chats)
  const UserData = useSelector(state => state.user)

  const blocked_accounts = UserData?.data?.data?.blocked_accounts || []
  const blocked_by = UserData?.data?.data?.blocked_by || []

  // check is blocked this user 
  const isBlocked = blocked_accounts.includes(_id)
  const heBlocked = blocked_by.includes(_id)



  // Check Is User connected To me 
  let isConnected = chatlist?.chats?.filter(chat => chat.user_id === _id)
  isConnected = isConnected ? isConnected.length > 0 : false
  const isChatBtn = isConnected || myId === _id ? false : true

  async function CreateChat() {
    if (!myId || !_id) return
    try {
      const response = await fetch(api + "/message/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ members: [myId, _id] })
      })
      const result = await response.json()
      if (result.chat_id) {
        dispatch(want_reload())
        Navigate("/")
      }
    } catch (err) {
      console.log(err)
    }

  }

  // Unblock Handler function 
  async function UnblockHandler() {
    try {
      const payload = {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ unblock_user_id: _id, user_id: myId })
      }
      const req = await fetch(api + `/users/unblock`, payload)
      const res = await req.json()
      if (req.ok) dispatch(getUserData(myId))
      if (!req.ok) throw Error(res.message)
    } catch (error) { 
      alert(error.message)
    }
  }


  // User button selector 
  const ActionButtonText = isBlocked ? "Unblock" : (heBlocked ? "He Blocked" : (isChatBtn ? "Chat" : "Added"))
  const ActionButtonAction = isBlocked ? UnblockHandler : (heBlocked ? null : (isChatBtn ? CreateChat : null))
  return (
    <div className="flex items-center justify-between p-3 py-1 rounded-md">
      <div className="flex gap-4 items-center p-3">
        <img className="h-[35px] w-[35px] rounded-full object-cover" src={avatar.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7aH70ubSk8FPfa1NLXvIP_wWOVbueWEQkA&usqp=CAU"} alt={name} />
        <p>{name}</p>
      </div>
      <button onClick={ActionButtonAction} className="py-1 px-5 rounded-2xl bg-[#1a322f] text-white hover:bg-red-700">{ActionButtonText}</button>
    </div>
  )
}