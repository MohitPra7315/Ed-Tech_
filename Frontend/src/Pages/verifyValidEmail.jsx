import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import OtpInput from 'react-otp-input';
import { SignupA, sendOtp } from "../services/operations/authAPI"
import { setSignupData } from '../Slices/authSlice';
export const VerifyValidEmailPage = () => {

    const { loading, signupData } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [otp, setOtp] = useState("")





    useEffect(() => {
        if (!signupData) {
            navigate("/signup")
        }
    }, [])




    function handleonSubmit(e) {
        e.preventDefault()
        const { fName,
            lName,
            email,
            password,
            confirm,
            accounttype,

        } = signupData
    
        dispatch(SignupA(fName, lName, email, password, confirm, accounttype,  otp, navigate))

    }

    function resendOtp(e) {
        e.preventDefault()
        console.log("otp handler,", signupData.email)
        dispatch(sendOtp(signupData.email,navigate))
    }

    return (
        <div className=' w-11/12 max-w-maxContent mx-auto  h-[900px] flex justify-center items-center'>
            {
                loading
                    ? (<div className='className="text-richblack-100 font-bold flex justify-center items-center w-full h-[900px"'>Loading.....</div>)
                    : (<div className='flex flex-col items-start gap-10 w-[508px] p-10'>
                        <div>
                            <h1 className='text-richblack-25 text-3xl'  > Verify email</h1>
                            <p className=' text-richblack-100 text-[19px]' > A verification code has been sent to you. Enter the code below</p>
                        </div>
                        <form
                            onSubmit={handleonSubmit}
                            className='w-full'>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span className='w-[95%] '>-</span>}
                                renderInput={(props) => <input {...props} className=" bg-richblack-800  px-7 py-4  rounded-md  " />}
                            />
                            <button
                                type='submit'
                                className=' bg-yellow-100 p-3 rounded-lg w-full mt-3  text-black font-semibold'>
                                Verify email
                            </button>
                        </form>
                        <div className='w-full flex justify-between'>
                            <div className='text-richblack-100 flex items-center gap-2'>
                                <FaArrowLeft></FaArrowLeft>
                                {
                                    <Link to="/login">
                                        Back to login
                                    </Link>
                                }
                            </div>
                            <div className='text-blue-100'>
                                {

                                }
                                <p onClick={resendOtp} className='cursor-pointer'>Resend it</p>
                            </div>
                        </div>
                    </div>
                    )
            }
        </div>
    )
}