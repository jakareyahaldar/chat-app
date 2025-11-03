import IconInput from "../../CastomElements/IconInput.js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import LogoutAlert from "../../CastomElements/LogoutAlert.js"

export default function Signup(){
  const Navigate = useNavigate()
  const api = process.env.REACT_APP_API_URL
  const [reload,setReload] = useState(false)
  // Signup data state 
  const [ signupData, setSignupData ] = useState({})
  const [cookies,setCookie,removeCookie] = useCookies()
  
  if(cookies.jessengar_auth){
    return <LogoutAlert
    onClose={()=>{
      Navigate("/")
    }}
    onConfrom={()=>{
      removeCookie("jessengar_auth")
      setReload(Date.now())
    }}
    show={true}
    fixed={false}
    />
  }
  
  async function SignupRequest(){
    try{
      const request = await fetch(api+"/signup",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(signupData)
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
        <h2 className="text-2xl">Signup</h2>
        
        <IconInput
        type="text"
        placeholder="Full Name"
        icon={<i class="fa-solid fa-person"></i>}
        value={signupData.fullName}
        onChange={ (value)=>setSignupData((prev)=> ({...prev, fullName: value}) ) }
        />
        
        <IconInput
        type="text"
        placeholder="Email"
        icon={<i className="fa-solid fa-phone"></i>}
        value={signupData.email}
        onChange={ (value)=>setSignupData((prev)=> ({...prev, email: value}) ) }
        />
        
        <IconInput
        type="password"
        placeholder="Password"
        icon={<i className="fa-solid fa-key"></i>}
        value={signupData.password}
        onChange={ (value)=>setSignupData((prev)=> ({...prev, password: value}) ) }
        />
        
        <div className="flex gap-2.5">
          <button onClick={SignupRequest} className="px-2 py-1 rounded-md bg-red-700">Registar</button>
          <button onClick={()=>Navigate("/login")} className="px-2 py-1 rounded-md bg-red-700">>Login</button>
        </div>
        
      </div>
      
    </div>
    )
}