import React, { useEffect } from "react"
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom"
import { FiArrowLeftCircle } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import ReviewForm from "../Components/Cores/ViewCourse/ReviewForm"

import { getFullDetailsOfCourse } from "../services/operations/CourseDetail_Api"
import VedioCourseSlider from "../Components/Cores/ViewCourse/vedioCourseSlider"
import { setCourseEntireDetail, setcourseSectionDetails, setCompleteLectures, setNoOfLectures } from "../Slices/viewCourseSlice";


export const ViewCourse = () => {

    const [courseData, setCourseData] = useState([])
    const [active, setActive] = useState("")
    const { courseId } = useParams()
    const dispatch = useDispatch()
    const location = useLocation()
    const { token } = useSelector((state) => state.auth)
    const { courseEntireDetail, courseSectionDetails } = useSelector((state) => state.courseViewDetail)


    const ReviewToggle = () => {
        setActive(active ? false : true)
    }



    useEffect(() => {
        const singleUniqueCourseData = async () => {
            try {
                const response = await getFullDetailsOfCourse(courseId, token)

                console.log("courseData", response.courseDetails)
                setCourseData(response.courseDetails)
                dispatch(setcourseSectionDetails(response?.courseDetails.courseContent?.section))
                dispatch(setCourseEntireDetail(response.courseDetails))
                dispatch(setNoOfLectures(response?.totalDuration))


                // 
            } catch (error) {
                console.error("error ehile Fetching FullCourseDetails APi", error.message)
            }
        }
        singleUniqueCourseData()
    }, [])

    return (
        <><div className="relative">

            <div className="flex min-h-[calc(100vh-3.5rem)] relative ">
                <VedioCourseSlider courseData={courseData} setActive={setActive} ReviewToggle={ReviewToggle} />
                <div className=" relative h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                    <div className="mx-6">
                        <Outlet />
                    </div>
                </div>
            </div>
            {
                active && <ReviewForm setActive={setActive} />
            }
        </div>
        </>
    )
}