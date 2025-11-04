import { useNavigate } from "react-router-dom"

export default function Header({ name, avatar }){
  const Navigate = useNavigate()
   avatar = avatar ? avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7aH70ubSk8FPfa1NLXvIP_wWOVbueWEQkA&usqp=CAU"
  
  return(
    <div className="shrink-0 grow-0 bg-black flex justify-between items-center p-3">
      
      <div className="flex gap-3 items-center">
        <i onClick={()=> Navigate("/")} className="font-extrabold text-[20px] fa fa-arrow-left" aria-hidden="true"></i>
        <img className="h-[40px] w-[40px] object-cover rounded-full" src={avatar} alt="" />
        <div>
          <p>{name}</p>
          <p className="text-xs text-[#93acab]">Active</p>
        </div>
      </div>
      
      <div className="flex gap-2 items-center text-xl">
        <i className="fa-solid fa-phone"></i>
        <i className="fa-solid fa-circle-info"></i>
      </div>
      
    </div>
    )
}