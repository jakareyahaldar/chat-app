import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../../../../CastomElements/TopBar";
import { useRef, useState } from "react";
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux"
import {want_reload} from "../../../../features/chats/chatsSlice"

export default function PasswordChange() {

    const { id } = useParams()
    const Navigate = useNavigate()
    const api = process.env.REACT_APP_API_URL
    const dispatch = useDispatch()


    const [,setCookie] = useCookies()


    // Element refarence 
    const submitBtn = useRef({})

    // HANDLE EMPTY STATE CASE > LOCATION STATE 
    if (!id) {
        alert("something wrong...")
        Navigate("/")
    }

    // usestate variable create 
    const [CurrentE_P, setCurrentE_P] = useState("")
    const [Password, setPassword] = useState("")
    const [newE_P, setnewE_P] = useState("")

    // Handle submit the form 
    async function OnSubmit(e) {
        e.preventDefault()
        // convert into formdata
        const formdata = new FormData(e.target)

        // check and manage data 
        const dataObj = {}
        for (const [key, val] of formdata) {
            if(val !== ""){
                dataObj[key] = val.trim();
            }
        }
        
        // Check Empty field
        if ((Object.values(dataObj).length) < 3) {
            alert("Please fill all field.")
            return
        }

        // Check New Email Or Phone
        const emailREgEx = /^[a-z]+[\w.+]*@gmail.com$/g
        const phoneREgEx = /^01[3-9]\d{8}$/g
        const IsEmail = emailREgEx.test(dataObj.newE_P) ? true : phoneREgEx.test(dataObj.newE_P) ? false : null
        
        if(IsEmail === null) {
            alert("Please enter a valid email or numbar.")
            return
        }
        
        dataObj.IsEmail = IsEmail
        dataObj.user = id

        
        const option = {
            method: "PUT",
            headers:{"content-type":"application/json"},
            body: JSON.stringify(dataObj)
        }

        try{
            submitBtn.current.innerText = "..."
            const req = await fetch(api+"/users/email-phone",option)
            const res = await req.json()
            submitBtn.current.innerText = "Save Change"
            if(req.ok){
                alert("Sucess!")
                setCookie("jessengar_auth",res.token,{maxAge:60*60*24*360})
                dispatch(want_reload())
            }else{
                alert(res.error)
            }
        }catch(err){
            alert(err.message)
        }


    }


    // handle change state data besed on input field
    function onChange(e) {
        const name = e.target.name
        switch (name) {
            case "CurrentE_P":
                setCurrentE_P(e.target.value)
                break
            case "Password":
                setPassword(e.target.value)
                break
            case "newE_P":
                setnewE_P(e.target.value)
                break
            default:
                return
        }
    }


    return (
        <>
            {/* NAVIGATION BAR */}
            <TopBar text="Back" path="/menu/profile" />
            <div className="w-full h-full top-0 left-0 p-10">


                {/* current_password CHENGE SECTION              */}
                <div>
                    <p className="text-2xl mt-3">Change Email OR Phone</p>
                    <form onSubmit={OnSubmit} className="w-2/3 bg-slate-900 rounded-lg p-4 mt-4 mx-auto">
                        <div className="flex flex-col">
                            <label htmlFor="c_u_e">Email or Phone</label>
                            <input
                                onChange={onChange}
                                value={CurrentE_P} id="c_u_e"
                                autoComplete={true.toString(true)}
                                className="text-black p-2 rounded-md bg-slate-300 placeholder:text-yellow-600 "
                                placeholder="Current Email or number."
                                name="CurrentE_P"
                                type="text" />
                        </div>
                        <div className="flex flex-col mt-2">
                            <label htmlFor="Password">Enter Password</label>
                            <input
                                value={Password}
                                autoComplete={true.toString()}
                                onChange={onChange}
                                id="Password"
                                className="text-black p-2 rounded-md bg-slate-300 placeholder:text-yellow-600 "
                                placeholder="Enter Password."
                                name="Password"
                                type="password" />
                        </div>
                        <div className="flex flex-col mt-2">
                            <label htmlFor="newE_P">New Email Or Phone</label>
                            <input
                                value={newE_P}
                                autoComplete={true.toString()}
                                onChange={onChange}
                                id="newE_P"
                                className="text-black p-2 rounded-md bg-slate-300 placeholder:text-yellow-600 "
                                placeholder="New Email Or Phone."
                                name="newE_P"
                                type="text" />
                        </div>
                        <button ref={submitBtn}
                            className="bg-red-900 p-2 w-full mt-4 rounded-lg hover:bg-white hover:text-black transition"
                            type="submit" >Save Changes</button>

                    </form>
                </div>

            </div>
        </>
    )
}