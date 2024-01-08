import { useSelector, useDispatch } from "react-redux"
import { IconBtn } from "../../Common/IconBtn"
import { useNavigate } from "react-router-dom"
import { UpdateImage } from "../../../services/operations/setting"
import { useState } from "react"
import  UpdatedProfileimage  from "./Settings/Update_Profile_image"
const Settings = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)

    console.log("token", token)

    return (
        <div className="  text-white  flex flex-col gap-10 ">
            <p className="text-white text-3xl pl-9">Edit Profile</p>

            <UpdatedProfileimage></UpdatedProfileimage>
            {/* section */}
            <div className="flex w-full mx-auto gap-7 bg-richblack-800 flex-col rounded-lg p-6">

                <div className="flex w-full boder-2 justify-start items-center    border-richblack-100">
                    <p className="text-2xl"> Personal Details </p>
                </div>
                <div className="flex w-full">
                    <div className="w-[50%] flex flex-col">
                        <label htmlFor="fName" className="text-white">First Name</label>
                        <input type="text " onChange={""} value={user.firstName} className="bg-richblack-700 text-richblack-300 p-2 rounded-lg w-[90%]" />
                    </div>
                    <div className="w-[50%] flex flex-col">
                        <label htmlFor="fName" className="text-white">First Name</label>
                        <input type="text " onChange={""} value={user.firstName} className="bg-richblack-700 text-richblack-300 p-2 rounded-lg w-[90%]" />
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-[50%] flex flex-col">
                        <label htmlFor="fName" className="text-white">First Name</label>
                        <input type="text " onChange={""} value={user.firstName} className="bg-richblack-700 text-richblack-300 p-2 rounded-lg w-[90%]" />
                    </div>
                    <div className="w-[50%] flex flex-col">
                        <label htmlFor="fName" className="text-white">First Name</label>
                        <input type="text " onChange={""} value={user.firstName} className="bg-richblack-700 text-richblack-300 p-2 rounded-lg w-[90%]" />
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-[50%] flex flex-col">
                        <label htmlFor="fName" className="text-white">First Name</label>
                        <input type="text " onChange={""} value={user.firstName} className="bg-richblack-700 text-richblack-300 p-2 rounded-lg w-[90%]" />
                    </div>
                    <div className="w-[50%] flex flex-col">
                        <label htmlFor="fName" className="text-white">First Name</label>
                        <input type="text " onChange={""} value={user.firstName} className="bg-richblack-700 text-richblack-300 p-2 rounded-lg w-[90%]" />
                    </div>
                </div>
            </div >
            <div className="w-11/12 flex p-6 justify-end">
                <IconBtn text="Upload" children={""} onClick={""}></IconBtn>

            </div>
            <div>

            </div>

        </div>
    )
}

export default Settings