import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"
import { IconBtn } from "../../../Common/IconBtn"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import UpdateProfile from "../../../../services/operations/setting_Api"

const EditProfile = () => {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)

    const genders = ["Male", "Female", "Other", "Gay"]

    const { register, handleSubmit, formState: { errors } } = useForm()
    // console.log("data for edit the profile", user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const SubmitProfileHandler = async (data) => {
        console.log("edit data is there ", data)
        try {
            dispatch(UpdateProfile(token, data))
        } catch (error) {
            console.log("Error Message..", error.message)
        }
    }


    return (
        <form onSubmit={handleSubmit(SubmitProfileHandler)}>
            <div className="flex w-full mx-auto gap-7 bg-richblack-800 flex-col rounded-lg p-6">

                <div className="flex w-full boder-2 justify-start items-center    border-richblack-100">
                    <p className="text-2xl"> Personal Details </p>

                </div>
                <div className="flex w-full">
                    <div className="w-[50%] flex flex-col">
                        <label htmlFor="fName" className="text-white">First Name</label>
                        <input
                            type="text "
                            id="fName"
                            {...register("firstName", { required: true })}
                            defaultValue={user ? user?.firstName : "Enter user Name"} className="bg-richblack-700 text-richblack-300 p-2 rounded-lg w-[90%]"
                        />
                        {
                            errors.firstName && (<span>
                                firstName is Required
                            </span>)
                        }
                    </div>
                    <div className="w-[50%] flex flex-col">
                        <label htmlFor="lName" className="text-white">Last Name</label>
                        <input type="text "
                            id="lName"
                            placeholder="Enter first name"

                            defaultValue={user ? user?.lastName : "Enter user Name"}
                            {
                            ...register("lastName", { required: true })
                            }
                            className="bg-richblack-700 text-richblack-300 p-2 rounded-lg w-[90%]" />
                        {
                            errors.lastName && (<span>
                                lastName is Required
                            </span>)
                        }
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-[50%] flex flex-col">
                        <label htmlFor="dateOfBirth" className="text-white">Date of Birth</label>
                        <input type="date"

                            id="dateOfBirth"
                            name="dateOfBirth"
                            {...register("dateOfBirth",
                                {
                                    required: {
                                        value: true,
                                        message: "please enter the Date of Birth"
                                    }, max: {
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date of Birth cannot be in the future.",
                                    },
                                })}
                            defaultValue={user?.additionalDetails?.dateOfBirth}
                            className="bg-richblack-700 text-richblack-300 p-2 rounded-lg w-[90%]" />
                        {
                            errors.dateOfBirth && (<span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.dateOfBirth.message}
                            </span>)
                        }
                    </div>
                    <div className="w-[50%] flex flex-col">
                        <label htmlFor="gender" className="text-white">Gender</label>
                        <select id="gender" name="gender"

                            {...register("gender", { required: true })
                            }
                            defaultValue={user?.additionalDetails?.gender}

                            className="bg-richblack-700 text-richblack-300 p-2 rounded-lg w-[90%]">

                            {
                                genders.map((gender, index) => {
                                    return (
                                        <option key={index} value={gender} >{gender}</option>
                                    )
                                })
                            }


                        </select>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-[50%] flex flex-col">
                        <label htmlFor="contactNumber" className="lable-style">
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            name="contactNumber"
                            id="contactNumber"
                            placeholder="Enter Contact Number"
                            className="bg-richblack-700 text-richblack-300 p-2 rounded-lg w-[90%]"
                            {...register("contactNumber", {
                                required: {
                                    value: true,
                                    message: "Please enter your Contact Number.",
                                },
                                maxLength: { value: 12, message: "Invalid Contact Number" },
                                minLength: { value: 10, message: "Invalid Contact Number" },
                            })}
                            defaultValue={user ? user?.additionalDetails?.contactNumber : "12345 67890"}

                        />{
                            errors.contactNumber && (<span>
                                {errors.contactNumber.message}
                            </span>)
                        }
                    </div>
                    <div className="w-[50%] flex flex-col">
                        <label htmlFor="about" className="text-white">About</label>
                        <input type="text "
                            id="about"
                            name="about"
                            placeholder="fill the about"
                            {...register("about", {
                                required: true,
                                message: "please fill the field"
                            })}
                            defaultValue={user?.additionalDetails?.about}

                            className="bg-richblack-700 text-richblack-300 p-2 rounded-lg w-[90%]" />
                        {
                            errors.about && (<span>
                                {errors.about.message}
                            </span>)
                        }
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                            navigate("/dashboard/my-profile")
                        }}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                        Cancel
                    </button>
                    <IconBtn type="submit" text="Save" />
                </div>
            </div >
        </form>
    )
}

export default EditProfile