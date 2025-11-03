import Header from "./Header.js"
import ChatList from "./ChatList.js"
import { Link } from "react-router-dom"

export default function Home(){
  return(
    <div className="h-dvh relative">
      <Header />
      <ChatList />
      {/*Add New friend on Contact list */}
      <div className="hover:bg-white hover:text-black p-3 rounded-xl absolute bottom-10 right-10 flex justify-center items-center bg-[#1e2e2e] text-2xl">
        <Link to="/users"><i className="fa-solid fa-plus"></i></Link>
      </div>
    </div>
    )
}