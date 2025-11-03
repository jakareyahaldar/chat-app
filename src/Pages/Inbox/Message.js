export default function Message({ user, message }){
  return(
    <div className={`${user ? "ml-auto" : ""} flex gap-3 items-end max-w-[60%]`}>
        {
          !user && <img className="h-[30px] w-[30px] rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP6w89XAoM0Fx6fEQmjdMj9iYZjpxK3RaB3KL5SOEhXg&s=10" alt="."/>
        }
        <div className="h-fit p-2 rounded-2xl bg-[#172828]">
          <p>{message}</p>
        </div>
      </div>
    )
}