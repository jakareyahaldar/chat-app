import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/Home.js"
import Inbox from "./Pages/Inbox/Inbox.js"
import Login from "./Pages/Auth/Login.js"
import Signup from "./Pages/Auth/Signup.js"
import PrivetComponent from "./Pages/PrivetComponent.js"
import Users from "./Pages/Users/Users.js"
import Menu from "./Pages/Menu/Menu.js"
import Profile from "./Pages/Menu/Profile/Profile.js"
import { socket } from "./socket.js"
import { useEffect } from "react"
import useParsedCookie from "./hooks/useParsedCookie.js"
import { useSelector, useDispatch } from "react-redux"
import { GetChatList, pushMessage, saveChats, messageSeen } from "./features/chats/chatsSlice.js"
import { socketIoConnected } from "./features/helper/helperSlice.js"

export default function App(){
  const dispatch = useDispatch()
  
  const myCookie = useParsedCookie()
  const my_Id = myCookie?._id
  
  const chatsList = useSelector((state)=> state.chats )
  const want_reload = chatsList.want_reload
  
  useEffect(()=>{
    if(my_Id){
      // Getting all chats
        dispatch(GetChatList(my_Id))
    }
  },[want_reload,my_Id,dispatch])
  
  
  
  useEffect(()=>{
    
    // connect Web socket
    socket.on("connect",()=>{
      dispatch(socketIoConnected(true))
    })
    socket.on("disconnect",()=>{
      dispatch(socketIoConnected(false))
    })
    
    // inside the if block of code run when Loged in user
    if(my_Id){
      
      // handle Got new message
      socket.on("new_message",(message)=>{
        // cheack is for me ?
        const sender = message.sender
        const receiver = message.receiver_id
        const forMe = sender === my_Id || receiver === my_Id
        if(!forMe) return
        dispatch(pushMessage(message))
        dispatch(saveChats())
      })
      
      socket.on("seen_response",(data)=>{
        dispatch(messageSeen(data))
      })
      
      
    } // end if(my_Id)
  },[my_Id,dispatch])
  
  return (
    <div className="h-dvh md:w-[500px] md:mx-auto bg-black text-white">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivetComponent />}>
            <Route path="/" element={<Home />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/users" element={<Users />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
    )
}