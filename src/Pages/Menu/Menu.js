import TopBar from "../../CastomElements/TopBar.js" 
import { useNavigate } from "react-router-dom"
import useParsedCookie from "../../hooks/useParsedCookie.js"
import { useState } from "react"
import LogoutAlert from "../../CastomElements/LogoutAlert.js"
import { useCookies } from "react-cookie"

export default function Menu(){
  const Navigate = useNavigate()
  const { name, username, avatar } = useParsedCookie()
  const [showLogout,setShowLogout] = useState(false)
  const [,,removeCookie] = useCookies()
  
  return(
    <div>
      <LogoutAlert
      show={showLogout}
      onClose={()=>{
        setShowLogout(false)
      }}
      onConfrom={()=>{
        removeCookie("jessengar_auth")
        Navigate("/login")
      }}
      fixed={true}
      />
      <TopBar text="Menu" path="/" />
      
      <div className="grid gap-3 p-3">
        
        {/*Profile*/}
        <div onClick={()=>Navigate("profile")} className="flex gap-4 p-3">
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            <img className="h-full w-full object-cover" src={ avatar.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq0aVzpF_JDE4onZ7MO2JS79xJTkm2kSMxh33DGd5ovw&s=10"} alt="" />
          </div>
          <div>
            <p>{name}</p>
            <p className="text-xs">{username}</p>
          </div>
        </div>
        {/*Logout*/}
        <div onClick={()=>setShowLogout(true)} className="flex gap-4 p-3 items-center">
          <i class="fas fa-sign-out-alt"></i>
          <p>Log out</p>
        </div>
      </div>
    </div>
    )
}