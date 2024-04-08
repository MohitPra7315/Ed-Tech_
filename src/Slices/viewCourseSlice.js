

import { createSlice } from "@reduxjs/toolkit";
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
