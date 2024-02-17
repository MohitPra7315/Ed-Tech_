import { useSelector, useDispatch } from "react-redux"
import { IconBtn } from "../../../Common/IconBtn"
import { useNavigate } from "react-router-dom"

import { useState } from "react"
import UpdatedProfileimage from "./Update_Profile_image"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"
import DeleteAccount from "./DeleteAccount"

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

            <EditProfile></EditProfile>
            <UpdatePassword></UpdatePassword>
            <DeleteAccount></DeleteAccount>

        </div>
    )
}

export default Settings