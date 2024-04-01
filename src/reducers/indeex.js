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
<<<<<<< HEAD
    courseViewDetail:courseViewDetailReducer
=======
    courseViewDetail: courseViewDetailReducer
>>>>>>> 11c233078fee4c77d0803b95ea12528abe9eeeb9
})


export default rootReducer