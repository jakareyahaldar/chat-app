export default function Footer(){
  return(
    <div className=" shrink-0 flex items-center justify-between p-3 px-5">
      {/*Options*/}
      <div className="text-2xl flex gap-3">
        <i className="fa-solid fa-image"></i>
        <i className="fa-solid fa-microphone"></i>
      </div>
      {/*Type message*/}
      <div className="flex gap-3">
        <input className="bg-[#192a2a] rounded-2xl px-3 py-1 outline-none" type="text" placeholder="Message" />
        <i className="text-2xl fa fa-paper-plane" aria-hidden="true"></i>
      </div>
    </div>
    )
}