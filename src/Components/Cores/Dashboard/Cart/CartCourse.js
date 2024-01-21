import { useSelector } from "react-redux"
import { IconBtn } from "../../../Common/IconBtn"
import { removeFromCart } from "../../../../Slices/cartSlice"
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux"
export const CartCourse = () => {
    const dispatch = useDispatch()
    const { cart } = useSelector((state) => state.cart)
    return (
        <div>
            {
                cart.map((course, index) => {
                    return (
                        <div key={index}>
                            <img src={course.image} />
                            <div>
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
                                <p></p>
                            </div>
                            <div>
                                <IconBtn
                                    onClick={() => dispatch(removeFromCart(course))}
                                    children={<p>deleted</p>}
                                    text={"remove"}

                                ></IconBtn>

                                <p>Rs.{course.price}</p>

                            </div>
                        </div>
                    )
                })
            }
        </div >
    )
}
