
import React from "react";
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import { useState } from "react";
import { useSelector } from "react-redux"
import OtpInput from 'react-otp-input';


export const verifyEmail = () => {
  
    // const { loading } = useSelector((state) => state.auth)

    const loading=false
    const [otp, setOtp] = useState("")
    return (
        <div>
            {
                loading
                    ? (<div>Loading</div>)
                    : (<div>
                        <div>
                            <h1> Verify email</h1>
                            <p>A verification code has been sent to you. Enter the code below</p>
                        </div>
                        <form>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => <input {...props} className="text-richblack-500" />}
                            />
                            <button>
                                Verify email
                            </button>
                        </form>
                        <div>
                            <div>
                                <FaArrowLeft></FaArrowLeft>
                                {
                                    <Link to="/login">
                                        Back to login
                                    </Link>
                                }
                            </div>
                            <div>
                                {

                                }
                                <p>Resend it</p>
                            </div>
                        </div>
                    </div>)
            }

        </div>
    )
}