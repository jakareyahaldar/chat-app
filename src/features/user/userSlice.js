import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const api = process.env.REACT_APP_API_URL+"/users/user"


export const getUserData = createAsyncThunk("user/getUserData", async (id)=>{
    try {
        const req = await fetch(api+`/${id}`)
        const data = await req.json()
        if(!req.ok) return {error: data.message}
        if(req.ok) return {data}
    } catch (error) {
        return {error: error.message}
    }
})


const initialState = {
    isLodding: false,
    isError: false,
    error: null,
    data: {}
}

const userSlice = createSlice({
    name: "user,",
    initialState, 
    extraReducers: (builder) => {
        builder.addCase(getUserData.fulfilled, (state, action) => {
            const error = action.payload.error
            if(error){
                state.isError = true
                state.error = error
                return
            }
            state.data = action.payload.data
        })
    },
})

export default userSlice.reducer