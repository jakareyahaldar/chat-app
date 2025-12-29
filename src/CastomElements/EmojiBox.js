import {useRef,useEffect} from "react"
export default function EmojiBox(Props){
  const emojiCode = ["128512","128513","128514","128515","128516","128517","128518","128519","128520","128521","128522","128523","128524","128525","128526","128527","128528","128529","128530","128531","128532","128533","128534","128535","128536","128537","128538","128539","128540","128541","128542","128543","128544","128545","128546","128547","128548","128549","128550","128551","128552","128553","128554","128555","128556","128557","128558","128559","128560","128561","128562","128563","128564","128565","128566","128567","128577","128578","128579","128580","129296","129297","129298","129299","129300","129301","129303","129312","129314","129315","129316","129317","129319","129320","129321","129322","129323","129325","129326","129327","129392","129393","129395","129396","129397","129398","129402","129488","128568","128569","128570","128571","128572","128573","128574","128575","128576","128584","128585","128586","128127","128128","129324"]
  
  const { setEmoji, isOpen, tailwind, x, y } = Props
  const BoxEl = useRef(null)
  
  
  useEffect(()=>{
    if(BoxEl.current && (x || y)){
      BoxEl.current.style.top = y
      BoxEl.current.style.left = x
    }
  },[x,y])
  
  function HandleOnClick(code){
    setEmoji(code)
  }
  
  
  if(!isOpen) return null
  
  return(
    <div ref={BoxEl} className={`${tailwind} md:w-[300px] w-fit max-h-[300px] overflow-y-scroll bg-amber-100 rounded-xl grid grid-cols-6 gap-3 p-3 m-auto`}>
      {
        emojiCode.map((code)=>{
          return <div 
          className="text-2xl hover:bg-amber-200 rounded"
          onClick={()=>HandleOnClick(code)}
          >{String.fromCodePoint(code)}</div>
        })
      }
    </div>
    )
}