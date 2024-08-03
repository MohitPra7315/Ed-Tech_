import { sidebarLinks } from "../../../data/dashboard-links"
import { useSelector } from "react-redux"
import SidebarLink from "./SidebarLink"
import { NavLink } from "react-router-dom"
import { VscSignOut } from "react-icons/vsc"
import { HiOutlineLogout } from "react-icons/hi";
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import ConfirmationModal from "../../Common/ConfirmModal"
import { logout } from "../../../services/operations/authAPI"
import { VscSettingsGear } from "react-icons/vsc"

export const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [confirmModal, setConfirmModal] = useState(null)

    // console.log("confirmdata", confirmModal)

    if (profileLoading || authLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        // side bar 
        <>
            <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px]  py-10">

                <div className="flex flex-col">

                    {
                        sidebarLinks.map((link) => {
                            {
                                if (link.type && user?.accountType !== link.type) return null
                                return <SidebarLink key={link.id} link={link} iconName={link.icon}></SidebarLink>
                            }
                        })
                    }
                </div>

                {/* horizontal line */}
                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>

                {/* setting and logout */}
                <div className="flex flex-col">

                    <SidebarLink className="w-full flex justify-center" link={{ path: "/dashboard/settings", name: "setting", iconName: <VscSettingsGear></VscSettingsGear> }}
                    />
                    <button
                        onClick={() => setConfirmModal({
                            heading: "are you sure ?",
                            subHeading: "you will be logged out from your account",
                            btn1: "Logout",
                            btn2: "Cancel",
                            btnHandler1: () => { dispatch(logout(navigate)) },
                            btnHandler2: () => setConfirmModal(null)
                        })}>
                        <div className=" flex gap-1 px-8 py-2 text-sm font-medium  ">
                            <VscSignOut className="text-lg"></VscSignOut>
                            <div>Log Out</div>
                        </div>

                    </button>
                </div>
                {
                    confirmModal !== null && <ConfirmationModal ModalData={confirmModal}></ConfirmationModal>
                }
            </div >
        </>

    )
}