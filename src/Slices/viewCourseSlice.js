

import { createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD
const initialState={
    courseEntireDetail:[],
    courseSectionDetails:[],
    noOfLectures:[],
    completedLectures:[]
}
const courseViewDetailSlice=createSlice({
    name:"courseViewDetail",
    initialState:initialState,
    reducers:{
        setCourseEntireDetail:(state,action)=>{
            state.courseEntireDetail=action.payload
        },
        setcourseSectionDetails:(state,action)=>{
            state.courseSectionDetails=action.payload
        },
        setNoOfLectures:(state,action)=>{
            state.noOfLectures=action.payload
        },
        setCompleteLectures:(state,action)=>[
            state.completedLectures=action.payload
        ]
    }
})


export const {setCourseEntireDetail,setcourseSectionDetails,setCompleteLectures,setNoOfLectures}=courseViewDetailSlice.actions
export default courseViewDetailSlice.reducer
=======
const initialState = {
    courseEntireDetail: [],
    courseSectionDetails: [],
    noOfLectures: [],
    completedLectures: []
}
const courseViewDetailSlice = createSlice({
    name: "courseViewDetail",
    initialState: initialState,
    reducers: {
        setCourseEntireDetail: (state, action) => {
            state.courseEntireDetail = action.payload
        },
        setcourseSectionDetails: (state, action) => {
            state.courseSectionDetails = action.payload
        },
        setNoOfLectures: (state, action) => {
            state.noOfLectures = action.payload
        },
        setCompleteLectures: (state, action) => [
            state.completedLectures = action.payload
        ]
    }
})
export const { setCourseEntireDetail, setcourseSectionDetails, setCompleteLectures, setNoOfLectures } = courseViewDetailSlice.actions
export default courseViewDetailSlice.reducer
>>>>>>> 11c233078fee4c77d0803b95ea12528abe9eeeb9
