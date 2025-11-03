import { useNavigate } from "react-router-dom"

export default function Persone({ name, last_message, seen, image }){
  const Navigate = useNavigate()
  
  return(
    <div onClick={()=>Navigate("/inbox")} className="hover:scale-95 transition flex justify-between items-center p-3">
        <div className="flex gap-3 items-center">
          <img className="w-[70px] h-[70px] rounded-full object-cover" src={image} alt="Persone" />
          <div className="flex flex-col ">
            <p>{name}</p>
            <p className={`${!seen ? "font-bold" :"text-[#84d9d5]"} text-sm`}>{last_message}</p>
          </div>
        </div>
        {
          seen && <img className="w-[20px] h-[20px] rounded-full object-cover" src={image} alt="Persone" />
        }
      </div>
    )
}