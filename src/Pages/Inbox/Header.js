import { useNavigate } from "react-router-dom"

export default function Header(){
  const Navigate = useNavigate()
  
  return(
    <div className="shrink-0 grow-0 bg-black flex justify-between items-center p-3">
      
      <div className="flex gap-3 items-center">
        <i onClick={()=> Navigate("/")} className="font-extrabold text-[20px] fa fa-arrow-left" aria-hidden="true"></i>
        <img className="h-[40px] w-[40px] object-cover rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP6w89XAoM0Fx6fEQmjdMj9iYZjpxK3RaB3KL5SOEhXg&s=10" alt="" />
        <div>
          <p>Jakareya Haldar</p>
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