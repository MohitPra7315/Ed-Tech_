import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { setCourse, setEditCourse } from "../../../../Slices/coursesSlice"
import { RenderAddcourses } from "../AddCourse/AddCourseComponent"
import { useEffect } from "react"
import {getFullDetailsOfCourse} from "../../../../services/operations/CourseDetail_Api"

export const EditCourse = () => {

    const [loading, setLoading] = useState(false)
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const courseId = useParams()
    console.log("Course Id--=====>>",course)
    useEffect(() => {
        const populateFullCourseDetails = async () => {
            setLoading(true)
            const result = await getFullDetailsOfCourse(courseId.id, token)
            console.log(result[0])
            
            if (result[0]) {
                dispatch(setEditCourse(true))
                dispatch(setCourse(result[0]))
            }
            setLoading(false)

        }

        populateFullCourseDetails()
    }, [])

    return (
        <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[600px]">
        {course ? (
          <RenderAddcourses />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
    )
}