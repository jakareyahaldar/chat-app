import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/Home.js"
import Inbox from "./Pages/Inbox/Inbox.js"
import Login from "./Pages/Auth/Login.js"
import Signup from "./Pages/Auth/Signup.js"
import PrivetComponent from "./Pages/PrivetComponent.js"
import Users from "./Pages/Users/Users.js"
import Menu from "./Pages/Menu/Menu.js"
import Profile from "./Pages/Menu/Profile/Profile.js"

export default function App(){
  return (
    <div className="h-screen md:w-[500px] md:mx-auto bg-black text-white">
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