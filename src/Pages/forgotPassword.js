import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux"
import { getpasswordTokenReset } from "../services/operations/authAPI"
export const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")
    const { loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    console.log("lpojdj  ", loading)

    const handleonSubmit = (e) => {
        e.preventDefault();
        dispatch(getpasswordTokenReset(email, setEmailSent))
    }
    return (
        <div className="w-11/12 max-w-maxContent mx-auto  h-[900px] flex justify-center items-center  ">
            {
                loading
                    ? (<div className="flex justify-center items-center w-full h-[900px]">Loading......</div>)
                    : (<div className="text-richblack-5  flex flex-col items-start gap-10 w-[508px] p-10  ">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-3xl">
                                {
                                    !emailSent
                                        ? "Reset Your Password"
                                        : "check email"

                                }
                            </h1>
                            <p>
                                {
                                    !emailSent
                                        ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                                        : `We have sent the reset email to  ${email}`
                                }
                            </p>

                        </div>
                        <form onSubmit={handleonSubmit} className="w-full">
                            {
                                !emailSent && (
                                    <label className="flex flex-col gap-4  ">
                                        <p>Email Address *</p>
                                        <input
                                            className=" bg-richblack-800 p-3 rounded-lg w-auto"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your Email Address"
                                        ></input>



                                    </label>
                                )
                            }
                            <button
                                className=" bg-yellow-100 p-3 rounded-lg w-full mt-3  text-black font-semibold"

                                type="submit">
                                {
                                    !emailSent ? "Reset Password" : 'Resend Email'
                                }
                            </button>
                        </form>

                        <div>

                            <div className=" flex flex-row items-center gap-3" >
                                <FaArrowLeft></FaArrowLeft>
                                {
                                    <Link to="/login">Back to Login</Link>
                                }
                            </div>
                        </div>

                    </div>
                    )
            }

        </div>

    )
}