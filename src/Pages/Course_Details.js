import { useParams } from "react-router-dom"
import { fetchCourseDetails } from "../services/operations/CourseDetail_Api"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

export const Course_Details = () => {

    const courseID = useParams()

    const courseId = courseID.id
    const [CourseDetailData, setCourseDetailData] = useState(null)

    const { token } = useSelector((state) => state.auth)
    useEffect(() => {

        const fetchCourseDetailsData = async () => {
            try {
                const res = await fetchCourseDetails(courseId, token)
                console.log("Course Details page for Id", res)
                setCourseDetailData(res)
            } catch (error) {
                console.error(error.message)
            }

        }

        fetchCourseDetailsData()

    }, [courseID])

    const {
        _id: _id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
        tag
    } = CourseDetailData?.data[0]


    return (
        <div>
            <div>
                <div>
                    <p className="text-white text-3xl">{_id}</p>
                    <p></p>
                    <p></p>
                </div>
            </div>

        </div>
    )
}