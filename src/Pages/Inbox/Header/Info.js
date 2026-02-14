import { useParams } from "react-router-dom"
import TopBar from "../../../CastomElements/TopBar"
import { useDispatch, useSelector } from "react-redux"
import useParsedCookie from "../../../hooks/useParsedCookie"
import { getUserData } from "../../../features/user/userSlice"

const api = process.env.REACT_APP_API_URL

export default function Info() {

    const { chat_id } = useParams()
    const dispatch = useDispatch()

    // Access the chat list state 
    const allChats = useSelector((state) => state.chats.chats)
    const [chat] = allChats.filter((chat) => chat.chat_id === chat_id)

    const avatar = chat?.user_avatar ? chat?.user_avatar : ""
    const name = chat?.user_name ? chat?.user_name : ""

    const {_id} = useParsedCookie()
  



    async function BlockUser() {
        try {
            const payload = {
                method: "put",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(
                    {
                        user: _id,
                        block_user: chat?.user_id
                    }
                )
            }
            const req = await fetch(api+"/users/block",payload)
            const data = req.json()
            if (req.ok){
                alert("Blocked!")
                dispatch(getUserData(_id))
            }else{
                alert(data.message)
            }
        } catch (error) {
            alert(error)
        }
    }



    return (
        <>
            <div className="flex justify-center flex-col p-5">
                <TopBar text="Inbox" path={`/inbox/${chat_id}`} />
                {/* NAME AND AVATAR */}
                <div className="flex justify-between items-center flex-col gap-3 pt-3">
                    <img
                        src={avatar} alt="avatar"
                        className="h-[100px] w-[100px] rounded-full object-cover" />
                    <p className="text-2xl">{name}</p>
                </div>
                <ul className="px-10 mt-7 grid gap-2">
                    <li onClick={BlockUser} className=" hover:bg-blue-500 bg-slate-500/10 rounded-md px-5 py-2">
                        <i className="mr-1 fa-solid fa-prescription-bottle-medical text-slate-300 text-sm"></i>
                        Block User
                    </li>
                    <li className="hover:bg-blue-500 bg-slate-500/10 rounded-md px-5 py-2">
                        <i className="mr-1 fa-solid fa-prescription-bottle-medical text-slate-300 text-sm"></i>
                        Delete Messages
                    </li>
                </ul>
            </div>
        </>
    )
}