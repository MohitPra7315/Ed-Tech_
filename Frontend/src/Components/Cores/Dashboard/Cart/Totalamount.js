import { useSelector, useDispatch } from "react-redux"
import { IconBtn } from "../../../Common/IconBtn";
import { useNavigate } from "react-router-dom/dist";
import { BuyCourse } from "../../../../services/operations/Payments_API";
export const Totalamount = () => {
    const { Totalamount } = useSelector((state) => state.cart)

    const { cart } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.profile)
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let amount = 0;
    cart.forEach(course => { amount += course.price });

   



    const handleBuyCourse = () => {
        const Courses = cart.map((course) => course._id)
    BuyCourse( Courses, token,user, navigate, dispatch)



    }


    return (
        <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
            <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {amount}</p>
            <IconBtn text="Buy Now"
                onclick={handleBuyCourse}
                customClasses="w-full justify-center"
            ></IconBtn>
        </div>
    )
}