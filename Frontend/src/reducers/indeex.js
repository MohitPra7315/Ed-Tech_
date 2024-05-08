import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../Slices/authSlice"
import profileReducer from "../Slices/profileSlice"
import cartReducer from "../Slices/cartSlice"
import coursesReducer from "../Slices/coursesSlice";
import courseViewDetailReducer from "../Slices/viewCourseSlice"
const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course: coursesReducer,
    courseViewDetail: courseViewDetailReducer
})


export default rootReducer