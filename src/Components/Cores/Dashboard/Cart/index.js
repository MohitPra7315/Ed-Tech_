import { useSelector } from "react-redux"

import { CartCourse } from "./CartCourse"
import { Totalamount } from "./Totalamount"
export const Cart = () => {
    const { totalItem, total, cart } = useSelector((state) => state.cart)
    return (
        <>
            <div className="flex flex-col gap-5">
                <p className="text-3xl text-richblack-5 font-semibold">My Wishlist</p>
                <div className="">
                    <p className="text-richblack-300">{totalItem}Course in Wishlist</p>
                </div>
                <div className="h-[1px] w-full bg-richblack-300"></div>
                {
                    total > 0 ?
                        (<div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row   ">
                            <CartCourse></CartCourse>
                            <Totalamount></Totalamount>
                        </div>) :
                        (

                            <p className="mt-14 text-center text-3xl text-richblack-100">Your cart is empty</p>
                        )
                }



            </div>
        </>
    )
}