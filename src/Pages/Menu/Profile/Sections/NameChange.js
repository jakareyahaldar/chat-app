import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../../../../CastomElements/TopBar";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux"
import { want_reload } from "../../../../features/chats/chatsSlice";
import { useCookies } from "react-cookie";
import MyAlert from "../../../../CastomElements/MyAlert"

export default function NameChange() {

    const dispatch = useDispatch()
    const { state } = useLocation()
    const Navigate = useNavigate()
    const api = process.env.REACT_APP_API_URL
    const [, setCookie] = useCookies()

    const [ShowAlert, setShowAlert] = useState({})


    // Element refarence 
    const submitBtn = useRef({})

    // HANDLE EMPTY STATE CASE > LOCATION STATE 
    if (!state) {
        alert("something wrong...")
        Navigate("/")
    }

    // usestate variable create 
    const [name, setName] = useState(state?.name)
    const [username, setUserName] = useState(state?.username)

    // Handle submit the form 
    async function OnSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)

        // Compare data changes 
        const ChangedData = {}
        for (const [key, val] of formData) {
            if (val !== state[key]) {
                ChangedData[key] = val
            }
        }

        // If not any chenge then exict and alert
        if (!(Object.keys(ChangedData)).length) {
            setShowAlert({ text: "You not change any field!", show: true })
            return
        }

        // go to update requist process
        const option = {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                user_id: state?._id,
                data: ChangedData
            })
        }

        // Request
        try {
            submitBtn.current.innerText = "..."
            const request = await fetch(api + "/users/nemeusername", option)
            if (!request.ok) {
                alert("server error!")
                return
            }
            const response = await request.json()
            submitBtn.current.innerText = "Save Changes"
            if (response.token) {
                setCookie("jessengar_auth", response.token, { maxAge: 60 * 60 * 24 * 360 })
                dispatch(want_reload())
                Navigate('/menu/profile')
            } else if (response.error) {
                setShowAlert({ text: response.error, show: true })
            }
        } catch (err) {
            setShowAlert({ text: err.message, show: true })
        }
    }


    // handle change state data besed on input field
    function onChange(e) {
        const name = e.target.name
        switch (name) {
            case "name":
                setName(e.target.value)
                break
            case "username":
                setUserName(e.target.value)
                break
            default:
                return
        }
    }


    return (
        <>

            <MyAlert
                show={ShowAlert?.show}
                onClose={() => {
                    setShowAlert({})
                }}
                onConfrom={() => {
                    setShowAlert({})
                }}
                fixed={true}
                title="Alert."
                text={ShowAlert?.text}
            />

            {/* NAVIGATION BAR */}
            <TopBar text="Back" path="/menu/profile" />
            <div className="w-full h-full top-0 left-0 p-10">


                {/* NAME CHENGE SECTION              */}
                <div>
                    <p className="text-2xl mt-3">Name Change</p>
                    <form onSubmit={OnSubmit} className="md:w-2/3 w-full bg-slate-900 rounded-lg p-4 mt-4 mx-auto">
                        <div className="flex flex-col">
                            <label htmlFor="name">Name</label>
                            <input
                                onChange={onChange}
                                value={name} id="name"
                                className="text-black p-2 rounded-md bg-slate-300 placeholder:text-yellow-600 "
                                placeholder="Enter Your Name."
                                name="name"
                                type="text" />
                        </div>
                        <div className="flex flex-col mt-2">
                            <label htmlFor="username">Username</label>
                            <input
                                value={username}
                                onChange={onChange}
                                id="username"
                                className="text-black p-2 rounded-md bg-slate-300 placeholder:text-yellow-600 "
                                placeholder="Enter Username."
                                name="username"
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