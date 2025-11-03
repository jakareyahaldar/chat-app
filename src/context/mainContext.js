import { createContext } from "react"
export const mainContext = createContext()

export default function ContextWraper({ resetkey, reloadContext, children }){
  
  return(
    <mainContext.Provider value="">
      {children}
    </mainContext.Provider>
    )
}