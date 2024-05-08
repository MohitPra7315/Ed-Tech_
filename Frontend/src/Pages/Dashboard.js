import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { Sidebar } from "../Components/Cores/Dashboard/Sidebar"
export const Dashboard = () => {

    const { user, loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)
    if (authLoading || profileLoading) {
        return (<div className="text-5xl text-white flex justify-center items-start w-full ">
            Loading....
        </div>)
    }


    return (
        <div className=" relative  flex min-h-[calc(100vh-3.5rem)] ">
            <Sidebar></Sidebar>
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto ">
                <div className="mx-auto w-11/12 max-w-[1000px] border-2 py-10 ">
                    <Outlet></Outlet>
                </div>
            </div>

        </div>
    )
}