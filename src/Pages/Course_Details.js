import { useParams } from "react-router-dom"
import { getFullDetailsOfCourse } from "../services/operations/CourseDetail_Api"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

export const Course_Details = () => {

    const CourseId = useParams()

    const { token } = useSelector((state) => state.auth)
    useEffect(() => {
    
            const fetchCourseDetailsData = async () => {
                try{

                    const res = await getFullDetailsOfCourse(CourseId, token)
                    console.log("Course Details page for Id", res)
                }catch(error){
                    console.error(error.message)
                }

            }
      
        fetchCourseDetailsData()

    }, [CourseId])



    return (
        <div>
            <div className="text-white">courses/65d2eccfb0f2072306b2e4ea</div>
        </div>
    )
}