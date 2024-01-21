import { toast } from "react-hot-toast"

import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    totalItem: localStorage.getItem("totalItem") ? JSON.parse(localStorage).getItem("totalItem") : 0,
    total: localStorage.getItem("total") ? JSON.parse(localStorage).getItem("total") : 0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    step: 1
}


const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setTotalItem(state, action) {
            state.totalItem = action.payload
        },
        // add item 
        addtoCart(state, action) {
            const course = action.payload
            // check if course already in the cart
            const index = state.cart.filter((item) => item._id === course._id)
            if (index >= 0) {
                // If the course is already in the cart, do not modify the quantity
                toast.error("Course already in cart")
                return
            }
            // If the course is not in the cart, add it to the cart
            state.cart.push(course)
            // Update the total quantity and price
            state.totalItem++
            state.total += course.price
            // Update to localstorage
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItem", JSON.stringify(state.totalItem))
            // show toast
            toast.success("Course added to cart")
        },
        removeFromCart: (state, action) => {
            const courseId = action.payload
            const index = state.cart.filter((item) => item._id === courseId)

            if (index >= 0) {
                // If the course is found in the cart, remove it
                state.totalItem--
                state.total -= state.cart[index].price
                state.cart.splice(index, 1)
                // Update to localstorage
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItem", JSON.stringify(state.totalItems))
                // show toast
                toast.success("Course removed from cart")
            }
        },
        resetCart: (state) => {
            state.cart = []
            state.total = 0
            state.totalItem = 0
            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItem")
        },

        // remove item 
        // 
    }
})


export const { addToCart, removeFromCart, resetCart } = cartSlice.actions
export default cartSlice.reducer 