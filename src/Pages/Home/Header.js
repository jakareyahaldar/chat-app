import { useNavigate } from "react-router-dom"

export default function Header(){
  const Navigate = useNavigate()
  
  return(
    <div className="h-[50px] flex justify-between items-center px-3 ">
      <h1 className="text-3xl tracking-wider font-bold">jessengar</h1>
      <i onClick={()=>Navigate("/menu")} className="text-[20px] fa-solid fa-gear"></i>
    </div>
    )
}