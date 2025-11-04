export default function Message({ user, message, avatar }){
  const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7aH70ubSk8FPfa1NLXvIP_wWOVbueWEQkA&usqp=CAU"
  
  return(
    <div className={`${user ? "ml-auto" : ""} my-3 px-3 flex gap-3 items-end max-w-[60%]`}>
        {
          !user && <img className=" h-[30px] w-[30px] rounded-full object-cover" src={avatar ? avatar : defaultAvatar} alt="."/>
        }
        <div className={`${user ? "ml-auto" : ""} h-fit p-2 rounded-2xl bg-[#172828]`}>
          <p>{message}</p>
        </div>
      </div>
    )
}