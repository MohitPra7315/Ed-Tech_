import { useSelector } from "react-redux"
import { IconBtn } from "../../../Common/IconBtn"
import { removeFromCart } from "../../../../Slices/cartSlice"
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux"
import { RiDeleteBin6Line } from "react-icons/ri"
export const CartCourse = () => {
    const dispatch = useDispatch()
    const { cart } = useSelector((state) => state.cart)
    console.log("Cardt Data", cart)

    return (
        <div className="flex flex-1 flex-col w-maxContent ">
            {
                cart.map((course, index) => {
                    return (
                        <div className={`flex  flex-wrap  items-start justify-between gap-6`}

                            key={index}>
                            <img src={course.image ? course.image : course.thumbnail}
                                alt={course?.courseName}
                                className="h-[148px] w-[220px] rounded-lg object-cover"
                            />
                            <div className="text-richblack-100">
                                <p>{course.desciption}</p>
                                <p>{course.courseName}</p>
                                <div>
                                    <p>899</p>
                                    <ReactStars
                                        count={5}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffdd76"
                                        emptyIcon={""}
                                        fullIcon={""}

                                    ></ReactStars>

                                    <p>(Rewiew Count)</p>

                                </div>
                                <p className=""></p>
                            </div>
                            <div>

                                <button className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                                    onClick={() => dispatch(removeFromCart(course))}
                                >
                                    <RiDeleteBin6Line />
                                    <span>remove</span>
                                </button>


                                <p>Rs.{course.price}</p>

                            </div>
                            <p className="h-[1px] w-full bg-richblack-300 mb-3"></p>
                        </div>
                    )
                })
            }
        </div >
    )
}
