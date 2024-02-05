import { useState } from "react"
import { useForm } from "react-hook-form"
import { IconBtn } from "../../../Common/IconBtn"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import changePassword from "../../../../services/operations/setting_Api"
export default function UpdatePassword() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [showoldPassword, setShowoldPassword] = useState(false)
    const [shownewPassword, setShownewPassword] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)

    const submitdataHandler = async (data) => {
        console.log("data is their ", data)
        try {
            dispatch(changePassword(token, data))
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)

        }
    }

    return (

        <form onSubmit={handleSubmit(submitdataHandler)}

            className="flex w-full flex-col mx-auto gap-7 bg-richblack-800  rounded-lg p-6">
            <div className="w-full flex justify-between">
                <p className="text-2xl"> Change Password </p>

                <div className="flex  gap-2">
                    <button onClick={() => { navigate("/dashboard/my-profile") }}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"

                    >Cancel</button>
                    <IconBtn type="submit" text="save"></IconBtn>
                </div>
            </div>
            <div className="flex w-full gap-x-2  ">


                <div className="relative flex flex-col  gap-2  lg:w-[50%]">
                    <label htmlFor="oldPassword" >Old Password</label>
                    <input className="bg-richblack-700 text-richblack-300 p-2 rounded-lg w-[90%]"
                        type={showoldPassword ? "text" : "password"}
                        name="oldPassword"
                        placeholder="Enter Current Password"
                        {
                        ...register("oldPassword", { required: true })
                        }

                    />
                    <span
                        className="absolute right-10 top-[38px]  z-[10] cursor-pointer text-white"
                        onClick={() => setShowoldPassword((prev) => !prev)}>
                        {
                            !showoldPassword ? "invisible" : "visible"
                        }
                    </span>
                    {
                        errors.oldPassword && (<span>
                            Please enter your Current Password.
                        </span>)
                    }
                </div>
                <div className="relative flex flex-col gap-2 lg:w-[50%]">
                    <label htmlFor="newPassword" >New Password</label>
                    <input
                        className="bg-richblack-700 text-richblack-300 p-2 rounded-lg w-[90%]"
                        type={shownewPassword ? "text" : "password"}
                        name="newPassword"
                        placeholder="Enter New Password"
                        {
                        ...register("newPassword", { required: true })
                        }

                    />
                    <span
                        className="absolute right-10 top-[38px]  z-[10] cursor-pointer text-white"
                        onClick={() => setShownewPassword((prev) => !prev)}>
                        {
                            !shownewPassword ? "invisible" : "visible"
                        }
                    </span>
                    {
                        errors.newPassword && (<span>
                            Please enter your New Password.
                        </span>)
                    }
                </div>
            </div>
            <div>

            </div>
        </form>
    )
} 