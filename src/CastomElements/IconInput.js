import { useState, useEffect } from "react"

export default function IconInput({ type, placeholder, icon, value, onChange }){
  
  // States
  const [ focas,setFocas ] = useState(false)
  
  useEffect(()=>{
    window.addEventListener("click",(e)=>{
      const target = e.target.nodeName
      if(target !== "INPUT"){
        setFocas(false)
      }
    })
  })
  
  return(
    <div className="relative px-2 bg-[#192a2a] rounded-md">
      {(!focas && !value) && <label htmlFor={placeholder} className="absolute left-3 top-[50%] -translate-y-[50%]"> {icon} {placeholder}</label>}
      <input onChange={(e)=>onChange(e.target.value)} value={value} id={placeholder} onFocus={()=>setFocas(true)} onBlur={()=>setFocas(false)} className="h-full w-full bg-transparent p-2 outline-none" type={type} />
    </div>
    )
}