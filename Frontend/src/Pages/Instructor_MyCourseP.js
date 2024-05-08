import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MyCourse } from "../Components/Cores/Dashboard/IntructorCourse/CourseTable"
import { fetchInstructorCourses } from "../services/operations/CourseDetail_Api"
export const InstructorCourses = () => {
    const { token } = useSelector((state) => state.auth)
    const [courses, setCourses] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await fetchInstructorCourses(token)
            if (result) {
                setCourses(result)
            }
        }
        fetchCourses()
    }, [])

    return (
        <div className="  ">
            <div className="mb-14 flex items-center justify-between">
                <h1 className='text-3xl font-medium text-richblack-5'>
                    My Courses
                </h1>

                <button
                    onClick={() => { navigate("/dashboard/addCourse") }}
                    className="bg-yellow-50 text-black font-bold rounded-md py-2 px-5">
                    Add Course +

                </button>
            </div>

            <MyCourse courses={courses} setCourses={setCourses}></MyCourse>
        </div>
    )
}