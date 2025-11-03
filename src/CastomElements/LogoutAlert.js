import { createPortal } from 'react-dom';

export default function LogoutAlert({ 
  onClose,onConfrom,show,fixed
}){
  
  
  if(!show){
    return null
  }
  
  const tailwind = `bg-[#0b08135d] h-dvh w-dvw flex justify-center items-center ${fixed ? "fixed top-0 left-0" : ""}`
  
  if (fixed) return createPortal(
    
    <div className={tailwind}>
      
      <div className="text-white mx-auto custom-ui w-[80%] max-w-[400px] p-5 flex flex-col gap-2 bg-[#142121] rounded-xl shadow-md">
        <h4 className="text-2xl font-bold">Logout?</h4>
        <p>Are you sure you want to log out ?</p>
        <div className="flex justify-between mt-3">
          <button onClick={onConfrom} className="py- px-7 rounded-md bg-[#2f5454]" >Yes</button>
          <button onClick={onClose} className="py-1 px-7 rounded-md bg-[#7f65c4]" >No</button>
        </div>
      </div>
      
    </div>,
    document.querySelector("#protal")
    )
    
    return(
      <div className={tailwind}>
      
      <div className="text-white mx-auto custom-ui w-[80%] max-w-[400px] p-5 flex flex-col gap-2 bg-[#142121] rounded-xl shadow-md">
        <h4 className="text-2xl font-bold">Logout?</h4>
        <p>Are you sure you want to log out ?</p>
        <div className="flex justify-between mt-3">
          <button onClick={onConfrom} className="py- px-7 rounded-md bg-[#2f5454]" >Yes</button>
          <button onClick={onClose} className="py-1 px-7 rounded-md bg-[#7f65c4]" >No</button>
        </div>
      </div>
      
    </div>
      )
}