import { useSelector } from "react-redux"

import { CartCourse } from "./CartCourse"
import { Totalamount } from "./Totalamount"
export const Cart = () => {
    const { totalItem, total, cart } = useSelector((state) => state.cart)
    return (
        <div className="w-full p-3 border-richblack-200  text-white  flex justify-center items-center flex-col">
            <div className="">
                <p>My Wishlist</p>
                <p>{totalItem}Course in Wishlist</p>
            </div>
            <div>
                {
                    total > 0 ?
                        (<div>
                            <CartCourse></CartCourse>
                            <Totalamount></Totalamount>
                        </div>) :
                        (<div>
                        

                            <p>Your cart is empty</p>
                        </div>)
                }
            </div>


        </div>
    )
}