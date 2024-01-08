import { toast } from "react-hot-toast"

import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    totalItem: localStorage.getItem("totalItem") ? JSON.parse(localStorage).getItem("totalItem") : 0
}


const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setTotalItem(state, value) {


        }

        // add item 

        // remove item 
        // 
    }
})


export const { setTotalItem } = cartSlice.actions
export default cartSlice.reducer 