import { useSelector } from "react-redux"
import { IconBtn } from "../../Common/IconBtn"
import { useNavigate } from "react-router-dom"
import { FaRegEdit } from "react-icons/fa";
export const MyProfile = () => {
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate()

    return (
        <div className="  text-white  flex flex-col gap-10  ">
            <div className="flex  w-11/12 mx-auto boder-2 justify-evenly items-center  bg-richblack-800 rounded-lg p-6 border-richblack-100">
                <div className="flex w-[calc(100%)]   border-white ">
                    <img src={user.image} width={"100px"} className="rounded-full" />
                    <div className="w-11/12 pl-5 pt-2 flex gap-1 flex-col items-start justify-center">
                        <p className="text-3xl font-bold">{user.firstName + " "}{user.lastName}</p>
                        <p className="text-richblack-300">{user?.email}</p>
                    </div>
                </div>
                <IconBtn text="Edit" children={<FaRegEdit></FaRegEdit>} onClick={() => navigate("/dashboard/settings")}></IconBtn>
            </div>
            {/* section */}
            <div className="flex w-11/12 mx-auto boder-2 justify-between items-center  bg-richblack-800 rounded-lg p-6 border-richblack-100">
                <div className="pl-5">
                    <p className="text-2xl"> About </p>
                    <p className="text-richblack-300">{user?.additionalDetails?.about ? user?.additionalDetails?.about : "you can edit "
                    }</p>
                </div>
                <IconBtn text="Edit" children={<FaRegEdit></FaRegEdit>} onClick={() => navigate("/dashboard/settings")}></IconBtn>
            </div>
            <div className="flex w-11/12 mx-auto gap-7 bg-richblack-800 flex-col rounded-lg p-6">

                <div className="flex w-full boder-2 justify-between items-center    border-richblack-100">
                    <p className="text-2xl"> Personal Details </p>
                    <IconBtn text="Edit" children={<FaRegEdit></FaRegEdit>} onClick={() => navigate("/dashboard/settings")}></IconBtn>
                </div>
                <div className="flex w-full">
                    <div className="w-[50%]">
                        <label htmlFor="fName" className="text-richblack-300">First Name</label>
                        <p>{user.firstName}</p>
                    </div>
                    <div className="w-[50%]">
                        <label className="text-richblack-300" htmlFor="fName">Last Name</label>
                        <p>{user.lastName}</p></div>
                </div>
                <div className="flex w-full">
                    <div className="w-[50%]">
                        <label htmlFor="fName" className="text-richblack-300">Email</label>
                        <p>{user.email}</p>
                    </div>
                    <div className="w-[50%]">
                        <label className="text-richblack-300" htmlFor="fName">Phone Number</label>
                        <p>{user?.additionalDetails?.contactNumber ? user?.additionalDetails?.contactNumber : "12345 67890"}</p></div>
                </div>
            </div >
        // </div>
    )
}