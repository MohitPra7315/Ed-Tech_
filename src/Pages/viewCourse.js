import { Outlet } from "react-router-dom"

export const ViewCourse = () => {
    return (
        <>
            <div className="flex text-3xl text-brown-25">This ViewCourse sidebar</div>
            <div className="w-[1000px] border-2 border-richblack-25 ">
                <div>
                    <Outlet />
                </div>

            </div>

        </>
    )
}