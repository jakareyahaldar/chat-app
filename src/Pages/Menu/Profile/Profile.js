import Avatar from "./Avatar.js"
import TopBar from "../../../CastomElements/TopBar.js"
import useParsedCookie from "../../../hooks/useParsedCookie.js"

export default function Profile(){
  const data = useParsedCookie()
  
  return(
    <div>
      <TopBar text="Profile" path="/menu" />
      <Avatar avatar={data.avatar.url}/>
      
    </div>
    )
}