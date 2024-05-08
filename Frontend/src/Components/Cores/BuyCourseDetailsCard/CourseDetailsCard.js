import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ACCOUNT_TYPE } from "../../../utils/constant"
import { toast } from "react-hot-toast"
import { addToCart } from "../../../Slices/cartSlice"
import { BsFillCaretRightFill } from "react-icons/bs"
import copy from 'copy-to-clipboard';
import { FaShareSquare } from "react-icons/fa"

export const CourseDetailsCard = ({ setConfirmationMadalLogin, course, handleBuyCourse }) => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log("Dispatched ", user)
    console.log(" Course", course)


    const handleshare = () => {
        copy(window.location.href)
        toast.success("Link copied to clipboard")
    }


    const handleAddCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor. You can't buy a course.")
            return
        }
        if (token) {

            dispatch(addToCart(course))
            return
        }
        setConfirmationMadalLogin({
            text1: "You are not logged in!",
            text2: "Please login to add To Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationMadalLogin(null),
        })
    }
    return (
        <>
            <div
                className=" flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5" >
                <img src={course.thumbnail}
                    alt={course?.courseName}
                    className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
                />
                <div>
                    <p className="space-x-2 pb-4">Rs.{course?.price}</p>
                </div>
                <div className="flex items-center flex-col justify-center gap-4">
                    <button
                        className="bg-yellow-50 text-black font-bold py-3 px-28 rounded-md"
                        onClick={
                            user && course?.studentsEnrolled.includes(user._id) ?
                                () => { navigate("/dashboard/enrolled-courses") } :
                                handleBuyCourse
                        }>

                        {user && course?.studentsEnrolled.includes(user?._id)
                            ? "Go To Course"
                            : "Buy Now"}

                    </button>
                    <button
                        className="bg-richblack-900 text-white font-bold py-3 px-28 rounded-md"
                        onClick={handleAddCart}
                    >
                        Add to Cart

                    </button>
                </div>
                <div>
                    <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
                        30-Day Money-Back Guarantee
                    </p>
                </div>
                <div>
                    <p className="my-2 text-xl font-semibold ">This Course includes:</p>
                    <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                        {course?.instructions?.map((item, i) => {
                            return (

                                <p className="flex gap-3 text" key={i}>
                                    <BsFillCaretRightFill />
                                    <span>{item}</span>
                                </p>

                            )
                        })}
                    </div>
                </div>
                <div className="text-center">
                    <button
                        className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
                        onClick={handleshare}
                    >
                        <FaShareSquare size={15} /> Share
                    </button>
                </div>
            </div></>
    )
}