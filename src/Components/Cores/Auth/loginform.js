import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { useState } from "react";
import toast from "react-hot-toast";
import {getLogin} from "../../../services/operations/authAPI"
import { useSelector, useDispatch } from "react-redux"

export function LoginForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [hidden, setHidden] = useState(false)

    function hiddenHandler() {
        setHidden((prevd) => !prevd)
    }


    const [formData, setFormData] = useState(
        {
            email: "",
            password: ""
        }
    )

    // console.log(formData)

    function changeHandler(event) {

        setFormData((prevdata) => {
            return {
                ...prevdata,
                [event.target.name]: event.target.value
            }
        })

    }


    function submitHandler(e) {
        e.preventDefault();
        dispatch(getLogin(formData.email,formData.password,navigate))
        setFormData({
            email:"",
            password:" "
        })


    }
    return (
        <form onSubmit={submitHandler}
            className="flex flex-col w-full gap-y-4 mt-6"
        >

            <label htmlFor="email" className="w-full">
                {/* <p className="text-[0.857rem] text-richblack-5 mb-1 leading-[1.385rem]">Wmail Address<span className="text-pink-200">*</span></p> */}
                <input
                    className="bg-richblack-5 rounded-[0.8rem]  w-full p-[12px]  "
                    type="email"
                    required
                    onChange={changeHandler}
                    value={formData.email}
                    name="email"
                    id="email"
                    placeholder="Enter email address"
                />
            </label>

            <label htmlFor="password" className="relative w-full">
                {/* <p className="text-[0.857rem] text-richblack-5 mb-1 leading-[1.385rem]">  Passsword<span className="text-pink-200">*</span></p> */}
                <input
                    className="bg-richblack-5 rounded-[0.8rem]  w-full p-[12px] "

                    type={hidden ? "password" : "text"}
                    required
                    onChange={changeHandler}
                    value={formData.password}
                    name="password"
                    id="password"
                    placeholder="Password"
                />

                <span
                    className="absolute text-newRichblack-50 right-3 top-[15px] cursor-pointer"
                    onClick={hiddenHandler}>
                    {
                        hidden ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :
                            (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)
                    }
                </span>
            </label>

            <Link to="/forgot-password">
                <p className="text-blue-100 text-xs -mt-4  max-w-max ml-auto" >Forget password</p>
            </Link >
            <button className="w-full bg-yellow-400 h-10 mt-4 rounded-md font-mono ">Login</button>
        </form>
    )
}