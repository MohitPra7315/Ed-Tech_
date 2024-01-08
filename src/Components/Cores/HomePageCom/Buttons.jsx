import { Link } from "react-router-dom"
import React from "react"

function CTButton({ children, active, linkWith }) {

    return (
        <Link to={linkWith}>
            <div className={`text-center  text-[13px] px-6 py-3 font-extrabold rounded-md 
              ${active ? "bg-yellow-50  text-black" : "bg-richblack-800 text-white    border-r-2 border-b-2 border-richblack-500"}
              hover:scale-95 transition-all duration-200 hover:shadow-lg hover:shadow-blue-100
              `}>
                {children}
            </div>
        </Link>
    )
}

export default CTButton;