import User from "./User.js"
import TopBar from "../../CastomElements/TopBar.js"
import { useEffect, useState } from "react"

export default function Users(){
  const api = process.env.REACT_APP_API_URL
  const defaultAvatar = {url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7aH70ubSk8FPfa1NLXvIP_wWOVbueWEQkA&usqp=CAU"}
  const [ userList, setUsers ] = useState([])
  
  useEffect(()=>{
   
   async function GetUsers(){
     try{
       const request = await fetch(api+"/users")
       const {users} = await request.json()
       if(users){
         setUsers(users)
       }
     }catch(err){}
   }
   GetUsers()
    
  },[])
  
  
  return(
    <div className="h-full">
      
      <TopBar text="Peoples" path="/" />
      
      {
        userList.length === 0 ? 
        (
        <div className="h-full flex justify-center items-center">
          <p>Please Wait!</p>
        </div>
        ) : 
        (
         <div className="flex flex-col gap-3 p-3">
          {
            userList.map((user)=>{
              return(
              <User 
                avatar={user.avatar ? user.avatar : defaultAvatar.url}
                name={user.name}
                _id= {user._id}
              />
              )
            })
          }
          </div>
        )
      }
      
    </div>
    )
}