import { useState } from "react"
import { useSelector } from "react-redux"
import { FaArrowLeft } from "react-icons/fa"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import React from "react"
import { getUpdatePassword } from "../services/operations/authAPI"

export const UpdatePasswordPage = () => {

    const { loading } = useSelector((state) => state.auth)
    const [showPassword, setShowPassword] = useState(false)
    const [showconfirmPassword, setShowconfirmPassword] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation()


    // const token=location.pathname.split("/").at(-1)


    const [formData, setFormData] = useState({
        password: "", confirmPassword: ""
    })


    function handleshowConfirmpassword(e) {
        setShowconfirmPassword((prev) => !prev)

    }

    function handleshowpassword(e) {
        setShowPassword((prev) => !prev)

    }

    function handleOnChange(e) {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }

    function handleOnSubmit(e) {
        e.preventDefault()
        const token = location.pathname.split("/").at(-1)
        console.log("token fromm url", token)
        dispatch(getUpdatePassword(formData.password, formData.confirmPassword, token))
        setFormData({
            password: "",
            confirmPassword: ""
        })
    }


    return (
        <div className=" w-11/12 max-w-maxContent mx-auto  h-[900px] flex justify-center items-center  ">
            {
                loading
                    ? (<div className="text-richblack-100 font-bold flex justify-center items-center w-full h-[900px">Loding....</div>)
                    : (<div className="   flex flex-col items-start gap-10 w-[508px] p-10" >
                        <div>
                            <h1 className="text-richblack-25 text-3xl">Choose  new password</h1>
                            <p className=" text-richblack-100 text-[19px]">Almost done. Enter your new password and youre all set.</p>
                        </div>
                        <form className="flex flex-col gap-y-6 w-full text-richblack-100"
                            onSubmit={handleOnSubmit}>
                            <label className="relative">
                                <p>New Password *</p>
                                <input
                                    className="w-full bg-richblack-800 p-3 rounded-lg "
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleOnChange}
                                />
                                <span className="absolute text-white right-3 top-[40px] cursor-pointer"
                                    onClick={handleshowpassword}
                                >

                                    {
                                        showPassword
                                            ? <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
                                            : <AiOutlineEye></AiOutlineEye>

                                    }
                                </span>
                            </label>

                            <label className="relative">
                                <p>Confirm Password *</p>
                                <input
                                    className="w-full bg-richblack-800 p-3 rounded-lg"
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleOnChange}
                                />
                                <span
                                    className="absolute text-white right-3 top-[40px] cursor-pointer"
                                    onClick={handleshowConfirmpassword}
                                >

                                    {
                                        showconfirmPassword
                                            ? <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
                                            : <AiOutlineEye></AiOutlineEye>
                                    }
                                </span>
                            </label>
                            <button
                                className=" bg-yellow-100 p-3 rounded-lg w-full mt-3  text-black font-semibold"

                                type="submit">
                                Reset Passsword
                            </button>
                        </form>
                        <div>


                            <div className=" flex flex-row items-center gap-3 text-richblack-50" >
                                <FaArrowLeft></FaArrowLeft>
                                {
                                    <Link to="/login">Back to Login</Link>
                                }
                            </div>
                        </div>

                    </div>)
            }

        </div>
    )
}