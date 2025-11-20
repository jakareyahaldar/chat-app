import IconInput from "../../CastomElements/IconInput.js"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useCookies } from "react-cookie"
import LogoutAlert from "../../CastomElements/MyAlert.js"

export default function Login(){
  const api = process.env.REACT_APP_API_URL
  const Navigate = useNavigate()
  const [ showLogout, setLogout ] = useState(true)
  // Login data state 
  const [loginData,setLoginData] = useState({})
  const [cookies,setCookie,removeCookie] = useCookies()
  const cookie = cookies.jessengar_auth
  
  
  if(cookie){
    return <LogoutAlert 
    show={true}
    title="Logout?"
    text="Want Log Out ?"
    onClose={()=>Navigate("/")}
    onConfrom={()=>{
      removeCookie("jessengar_auth")
      setLogout(!showLogout) // just for reload page
    }}
    />
  }

  
  async function LoginRequest(){
    try{
      const request = await fetch(api+"/signin",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(loginData)
      })
      const response = await request.json()
      if(response.token){
        setCookie("jessengar_auth",response.token,{maxAge:60*60*24*360})
        Navigate("/")
      }else if(response.error){
        alert(response.error)
      }
    }catch(err){
      console.log(err)
    }
  }
  
  return(
    <div className="h-dvh flex justify-center items-center">
      
      <div className="bg-[#aef6f659] py-6 rounded-2xl backdrop-blur w-[300px] flex flex-col items-center gap-3">
        <h2 className="text-2xl font-bold">Login</h2>
        <IconInput 
        type="text"
        placeholder="Email"
        icon={<i className="fa-solid fa-phone"></i>}
        value={loginData.email}
        onChange={(value)=>setLoginData((prev)=>({...prev,email:value}))}
        />
        <IconInput 
        type="password"
        placeholder="Password"
        icon={<i className="fa-solid fa-key"></i>}
        value={loginData.password}
        onChange={(value)=>setLoginData((prev)=>({...prev,password:value}))}
        />
        
        <div className="flex gap-3.5">
          <button onClick={LoginRequest} className="p-2 py-1 rounded-md bg-red-700">Login</button>
          <button onClick={()=>Navigate("/signup")} className="p-2 py-1 rounded-md bg-red-700">Signup</button>
        </div>
        <Link className="text-sm underline" to="/">Forgote password</Link>
      </div>
      
    </div>
    )
}