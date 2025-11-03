import { Outlet, Navigate } from "react-router-dom"
import { useCookies  } from "react-cookie"


export default function PrivetComponent(){

  const [ cookie ] = useCookies();

  if(cookie.jessengar_auth){
    return <Outlet />
  }else{
    return <Navigate to="/login" />
  }
}