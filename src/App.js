import { io } from 'socket.io-client';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/Home.js"
import Inbox from "./Pages/Inbox/Inbox.js"
import Login from "./Pages/Auth/Login.js"
import Signup from "./Pages/Auth/Signup.js"
import PrivetComponent from "./Pages/PrivetComponent.js"
import Users from "./Pages/Users/Users.js"
import Menu from "./Pages/Menu/Menu.js"
import Profile from "./Pages/Menu/Profile/Profile.js"
import { useEffect, useState, useMemo } from "react"
import useParsedCookie from "./hooks/useParsedCookie.js"
import { useSelector, useDispatch } from "react-redux"
import { setAUserOnline, setAUserOffline, GetChatList, pushMessage, handleReact, UndoReact, setTypingState, saveChats, messageSeen } from "./features/chats/chatsSlice.js"
import { socketIoConnected } from "./features/helper/helperSlice.js"
import MyAlert from "./CastomElements/MyAlert.js"
import nootifySound from "./utilities/notify.mp3"

export let socket = {}

export default function App() {
  const URL = process.env.REACT_APP_API_URL
  const dispatch = useDispatch()
  const [showWaitAlert, setShowWaitAlert] = useState(false)
  const myCookie = useParsedCookie()
  const my_Id = myCookie?._id
  const Notify = useMemo(() => new Audio(nootifySound), [])

  const chatsList = useSelector((state) => state.chats)
  const want_reload = chatsList.want_reload


  useEffect(() => {
    if (chatsList.chats.length) {
      const allUserIds = chatsList.chats.map(c => c.user_id)
      socket.emit("checkWhosOnline", { host: my_Id, users: allUserIds })
    }
  }, [chatsList.chats, my_Id])




  useEffect(() => {
    if (my_Id) {

      socket = io(URL, {
        auth: {
          uid: my_Id
        }
      });

      // Getting all chats
      dispatch(GetChatList(my_Id))
    }
  }, [want_reload, my_Id, dispatch, URL])


  useEffect(() => {

    // inside the if block of code run when Loged in user
    if (my_Id) {
      // connect Web socket
      socket.on("connect", () => {
        console.log("Connected")
        dispatch(socketIoConnected(true))
      })
      socket.on("disconnect", () => {
        console.log("disconnected")
        dispatch(socketIoConnected(false))
      })

      // handle Got new message
      socket.on("new_message", (message) => {
        // cheack is for me ?
        const sender = message.sender
        const receiver = message.receiver_id
        const forMe = sender === my_Id || receiver === my_Id
        if (!forMe) return
        dispatch(pushMessage(message))
        dispatch(saveChats())
        if (sender !== my_Id && nootifySound) {
          try {
            Notify.play()
          } catch (err) { }
        }
      })

      socket.on("seen_response", (data) => {
        dispatch(messageSeen(data))
      })
      socket.on("typing_res", (data) => {
        // Check its for you or not
        const isForMe = data.receiver === my_Id
        if (isForMe) {
          dispatch(setTypingState(data))
        }
      })

      socket.on("react_res", (data) => {
        const { receiver, sender } = data
        if ((receiver?.filter(m => m.user_id === my_Id)).length) {
          dispatch(handleReact(data))
          dispatch(saveChats())
        }
        if (sender !== my_Id) {
          try {
            Notify.play()
          } catch (err) { }
        }
      })

      socket.on("undo_react", (data) => {
        const { receiver } = data
        if ((receiver?.filter(m => m.user_id === my_Id)).length) {
          dispatch(UndoReact(data))
          dispatch(saveChats())
        }
      })

      socket.on("user_offline_event", (data) => {
        dispatch(setAUserOffline(data))
      })
      socket.on("user_online_event", (data) => {
        dispatch(setAUserOnline(data))
      })
      socket.on("checkWhosOnline", (data) => {
        const online_users = data.online_users
        if (!online_users || !Array.isArray(online_users) || !online_users.length) return
        online_users.forEach((user_id) => dispatch(setAUserOnline({ user_id })))
      })

      // WAIT ALERT CONFIGARATION SETTIMEOUT
      var tt = setTimeout(() => {
        if (chatsList.isLodding) {
          setShowWaitAlert(true)
        }
      }, 5000)


    } // end if(my_Id)

    return () => {
      clearInterval(tt)
    }
  }, [my_Id, dispatch, Notify, chatsList.isLodding])

  return (
    <div className="h-dvh md:w-[500px] md:mx-auto bg-black text-white">

      <MyAlert
        title="Internet"
        text="Please Wait may your Internet Slow!"
        show={showWaitAlert}
        fixed={true}
        yes_btn_text="Ok"
        no_btn_text="Exit"
        onConfrom={() => setShowWaitAlert(false)}
        onClose={() => setShowWaitAlert(false)}
      />

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