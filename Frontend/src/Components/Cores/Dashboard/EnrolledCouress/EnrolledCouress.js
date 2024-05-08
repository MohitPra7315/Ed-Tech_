import { useState } from "react"
import { apiConnector } from "../../../../services/apiConnection"
import { categories } from "../../../../services/apis"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { GetUserEnrolledCourseDetails } from "../../../../services/operations/Profile_Api"
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
const EnrolledCouress = () => {
    const { ALL_CATEGORIES_API } = categories
    const [allcoures, setAllcoures] = useState(null)
    const { token } = useSelector((state) => state.auth)
    console.log("response for Enrolled Couress", allcoures)

    const navigate = useNavigate()
    const showAllCategory = async () => {
        try {
            const response = await GetUserEnrolledCourseDetails(token)

            setAllcoures(response)
        } catch (error) {
            console.error(error.message)
            toast.error("Failed to fetch Enrolled Couress")
        }


    }


    useEffect(() => {
        showAllCategory()
    }, [])



    return (
        <div className="">
            <p className="text-3xl text-richblack-50">Enrolled Couress</p>
            {
                !allcoures ?
                    (<div className="text-white ">Loading...</div>) :
                    (allcoures.length == 0 ?
                        (<div className="grid h-[10vh] w-full place-content-center text-richblack-5 font-bold">You haven't enrolled any coures</div>) :
                        (<div className="my-10  text-richblack-5">
                            <div className="flex rounded-t-lg bg-richblack-500 h-10">
                                <p className="w-[45%] px-5 py-3">Course Name</p>
                                <p className="w-1/4 px-2 py-3">Duration</p>
                                <p className="flex-1 px-2 py-3">Progress</p>
                            </div>
                            {/* course */}

                            <div className="">
                                {
                                    allcoures?.map((course, index) => {
                                        return (
                                            <Link to={`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`}>
                                                <div
                                                    className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                                    onClick={() => {
                                                        navigate(

                                                        )
                                                    }}
                                                >
                                                    <div className="flex  border-2 border-richblack-500 gap-4 py-2">
                                                        <div className="flex w-[45%] py-2 px-3">
                                                            <img src={course?.thumbnail}
                                                                alt="course_img"
                                                                className="h-14 w-14 rounded-lg object-cover" />
                                                            <div className="flex flex-col  max-w-xs gap-2 pl-3 ">
                                                                <h1 className="font-semibold">{course?.courseName}</h1>
                                                                <p className="text-xs text-richblack-5">{course?.courseDescription}</p>
                                                            </div>
                                                        </div>
                                                        <p className="w-1/4 py-2 px-3">
                                                            {course?.duration}
                                                            2hr 30min
                                                        </p>
                                                        <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                                            <p>
                                                                Progress:{course?.progressPercentage || 0}%    </p>
                                                            <ProgressBar completed={30}
                                                                height="8px"
                                                                isLabelVisible={false}
                                                            ></ProgressBar>

                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>

                        </div>)
                    )

            }

        </div>
    )
}
export default EnrolledCouress