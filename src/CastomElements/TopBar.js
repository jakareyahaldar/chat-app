import { useNavigate } from "react-router-dom"

export default function TopBar({ text, path }){
  const Navigate = useNavigate()
  
  return(
    <div className="flex items-center gap-4 py-3 px-5">
      <i onClick={()=> Navigate(path)} className="font-extrabold text-[20px] fa fa-arrow-left" aria-hidden="true"></i>
      <p className="font-bold text-xl">{text}</p>
    </div>
    )
}