import useParsedCookie from "../../../hooks/useParsedCookie.js"
import { useCookies } from "react-cookie"
import { useState } from "react"

export default function Avatar(){
  const [ reload, setReload ] = useState()
  const api_url = process.env.REACT_APP_API_URL
  const [ , setCookies ] = useCookies()
  const data = useParsedCookie()
  const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7aH70ubSk8FPfa1NLXvIP_wWOVbueWEQkA&usqp=CAU"
  
  
  async function UpdateAvatar(e){
    const Input = e.target
    const formData = new FormData()
    formData.append("user_id",data._id)
    formData.append("avatar",Input.files[0])
    
    try{
      const options ={
        method:"POST",
        body:formData
      }
      const requst = await fetch(api_url+"/avatar",options)
      const response = await requst.json()
      if(response.token){
        setCookies("jessengar_auth", response.token, { maxAge:60*60*24*360 })
      }
      setReload()
    }catch(err){
      console.log(err)
    }
    
  }
  return(
    <div className="grid justify-center">
      
      <div>
        <input onChange={UpdateAvatar} className="h-0 w-0 opacity-0" type="file" id="avatar"/>
        <label className="h-[150px] w-[150px] rounded-full block relative rounded-full border-2 hover:border-amber-100" htmlFor="avatar">
          <img className="h-full w-full object-cover rounded-full" 
          src={data.avatar.url ? data.avatar.url : defaultAvatar } 
          alt="avatar"/>
          <div className="absolute bottom-1 right-1 h-8 w-8 bg-black border-2 rounded-full flex justify-center items-center"><i className="fa-solid fa-camera"></i></div>
        </label>
      </div>
      
    </div>
    )
}