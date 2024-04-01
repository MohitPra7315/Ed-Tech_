import { useParams } from "react-router-dom"
import { fetchCourseDetails } from "../services/operations/CourseDetail_Api"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { BuyCourse } from "../services/operations/Payments_API"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import GetAvgRating from "../utils/avgRating"
import { Error } from "../Pages/ErrorPage"
import { RatingStars } from "../Components/Common/RatingStar"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import ConfirmationModal from "../Components/Common/ConfirmModal"
import { CourseDetailsCard } from "../Components/Cores/BuyCourseDetailsCard/CourseDetailsCard"
import CourseAccordionBar from "../Components/Cores/BuyCourseDetailsCard/CourseAccordingdrop"
import Footer from "../Components/Common/Footer"
export const Course_Details = () => {
    const navigate = useNavigate()
    const courseID = useParams()

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { loading } = useSelector((state) => state.profile)
    const { paymentLoading } = useSelector((state) => state.course)
    const [confirmationMadalLogin, setConfirmationMadalLogin] = useState(null)
    console.log("cvnvbkf weuh9io...", confirmationMadalLogin)
    const [courseData, setCourseData] = useState("")

    const fetchCourseAllData = async () => {
        try {
            const data = await fetchCourseDetails(courseID.id)
            console.log("fetchCourseDetails", data.data[0])
            setCourseData(data.data[0])

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
        const count = GetAvgRating(courseData?.ratingAndReviews)
        setavgRatingAndReview(count)
    }, [courseData])

    // 
    const [totalEnrolledStudents, setToatalEnrolledStudents] = useState(0)
    useEffect(() => {


    }, [courseData])

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
    console.log("totalNoOfLectures", totalNoOfLectures)
    useEffect(() => {
        let lecture = 0;
        courseData?.courseContent?.forEach((section) => {
            lecture += section.subSection.length || 0
        })
        setTotalNoOfLectures(lecture)
    }, [courseData])

    //  Collapse the Section
    const [isActive, setIsActive] = useState(Array())
    console.log("Active aaaray ", isActive)
    const handleisActive = (id) => {
        setIsActive(!isActive.includes(id) ?
            isActive.concat(id) :
            isActive.filter((e) => e !== id))

    }

    const handleBuyCourse = async () => {
        if (token) {
            BuyCourse([courseID], token, user, navigate, dispatch)
            return
        }

        setConfirmationMadalLogin({
            heading: "are you sure ?",
            subHeading: "you please Login  your account",
            btn1: "Log In",
            btn2: "Cancel",
            btnHandler1: () => { navigate("/Login") },
            btnHandler2: () => setConfirmationMadalLogin(null)
        })

    }
    if (loading || !courseData) {
        return
        (<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
        </div>)
    }



    return (
        <>
            <div className="">
                <div className="relative w-full bg-richblack-800 ">
                    <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
                        <div className="min-w-[800px] h-full flex flex-col gap-3 justify-start py-10">
                            <p className="text-richblack-200 font-bold">Home / Learning /<span className="text-yellow-50">{`${courseData.courseName}`}</span></p>
                            <p className="text-3xl text-white font-bold">{courseData.category?.description}</p>
                            <p className="text-richblack-200 font-bold">{courseData.courseDescription}</p>
                            <div className="flex flex-row gap-4">
                                <span>{avgRatingAndReview}</span>
                                <RatingStars Review_Count={avgRatingAndReview} Star_Size={24} />
                                <span>{`(${courseData?.ratingAndReviews.length}) reviews`}</span>
                                <span>{`${courseData?.studentsEnrolled.length} enrolled Students`}</span>
                            </div>
                            <div>
                                <p className="">
                                    Created By {`${courseData?.instructor.firstName} ${courseData?.instructor.lastName}`}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-5 text-lg">
                                <p className="flex items-center gap-2">
                                    {" "}
                                    {/* <BiInfoCircle /> Created at {formatDate(courseData?.createdAt)} */}
                                </p>
                                <p className="flex items-center gap-2">
                                    {" "}
                                    <HiOutlineGlobeAlt /> English
                                </p>
                            </div>
                        </div>
                        {/* CARD buy Card component */}
                        <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                            <CourseDetailsCard

                                setConfirmationMadalLogin={setConfirmationMadalLogin}
                                course={courseData}
                                handleBuyCourse={handleBuyCourse}
                            />
                        </div>

                    </div>

                </div>
                <div className="mx-auto box-content px-4 text-start  gap-10 text-richblack-5 lg:w-[1260px]">
                    <div className="mx-auto flex flex-col  max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                        <div className="border-2 border-richblack-25 w-full  flex gap-5 flex-col mt-10  p-10">
                            <h1 className="text-3xl font-bold ">What you'll learn</h1>
                            <div className="text-xl ">
                                {courseData?.whatYouWillLearn}
                            </div>
                        </div>
                        <div className=" text-richblack-5  w-full flex flex-col mt-10 ">
                            <p className="text-3xl font-bold ">Courses Content</p>
                            <div className=" w-full  flex justify-between    p-10">
                                <div className="flex gap-2">
                                    <p>{courseData?.courseContent?.length} Sections</p>
                                    <p>{totalNoOfLectures} Lectures</p>
                                    <p>{courseData?.courseContent?.section?.subSection?.title} Total durataion</p>
                                    <p></p>
                                </div>
                                <div >
                                    <button className="text-yellow-50" onClick={() => { setIsActive([]) }}>Collaspse The Sections</button>
                                </div>
                            </div>
                            <div>
                                <div className="py-4">
                                    {courseData?.courseContent?.map((course, index) => (
                                        <CourseAccordionBar
                                            course={course}
                                            key={index}
                                            isActive={isActive}
                                            handleActive={handleisActive}
                                        />
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {confirmationMadalLogin && <ConfirmationModal ModalData={confirmationMadalLogin} />}


        </>
    )
}