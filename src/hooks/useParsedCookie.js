import { useCookies } from "react-cookie"
import { jwtDecode } from "jwt-decode";

export default function useParsedCookie(){
  const [ cookies ] = useCookies()
  const myCookie = cookies.jessengar_auth
  const parsedCookie = myCookie ? jwtDecode(myCookie) : null
  return parsedCookie
}