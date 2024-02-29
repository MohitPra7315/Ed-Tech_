import { useParams } from "react-router-dom"
import { fetchCourseDetails } from "../services/operations/CourseDetail_Api"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { BuyCourse } from "../services/operations/Payments_API"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const Course_Details = () => {
    const navigate = useNavigate()
    const courseID = useParams()

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)


    const [courseData, setCourseData] = useState("")

    const fetchCourseAllData = async () => {
        try {
            const data = await fetchCourseDetails(courseID.id)
            console.log("fetchCourseDetails",data)
            setCourseData(data)

        } catch (error) {
            console.log(error.message)
        }
    }
    // 1 APi-==> fetch Fulll Course Details
    useEffect(() => {
        fetchCourseAllData()
    }, [courseID])


    // 2 Api-==> fetch Rating and review
    const [avgRatingAndReview, setavgRatingAndReview] = useState(0)
    // const count = courseData
    useEffect(() => {

    }, [courseData])


    const handleBuyCourse = async () => {
        if (token) {
            BuyCourse([courseID], token, user, navigate, dispatch)
        }
        else {
            toast.error("user is Not logged in")
            navigate("/login")
        }
    }

    return (
        <div>
            <div>
                <div>
                    <p></p>
                    <p></p>
                    <button className="text-black cursor-pointer bg-yellow-50 py-2 px-5" onClick={handleBuyCourse}>But Now</button>
                </div>
            </div>

        </div>
    )
}