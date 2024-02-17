import React, { useState, useEffect } from "react"
import { NavbarLinks } from "../../data/navbar-links"
import { Link, matchPath } from "react-router-dom"
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ProfileDropdown } from "../Cores/Auth/ProfileDropDown"
import { apiConnector } from "../../services/apiConnection"
import { courseEndpoints } from "../../services/apis"
export function Navbar() {

    const location = useLocation();
    function matchRoute(route) {
        return matchPath({ path: route }, location.pathname)

    }


    // test for check the  catalog data show on display

    const [currentCourseLink, setCurrentCourseLink] = useState(null)
    const [subLinks, setSubLinks] = useState([])
    {

    }





    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { totalItem } = useSelector((state) => state.cart)
    const { course } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        const AllCategory = async () => {
            setLoading(true)
            try {
                const result = await apiConnector("GET", courseEndpoints.COURSE_CATEGORIES_API)
                console.log("check category of Course", result.data.Alldata)

                setSubLinks([result.data.Alldata])
            } catch (error) {
                console.error(error.message)
            }
            setLoading(false)
        }
        AllCategory();
    }, [])


    return (
        <div className="h-14 border-b-[2px] border-richblack-600 justify-center items-center">
            <div className="flex w-11/12 h-full max-w-maxContent flex-row mx-auto justify-between items-center gap-4 ">

                <Link to={"/"} >
                    <img
                        src={logo}>


                    </img>
                </Link>

                <nav>
                    <ul className="flex flex-row gap-4">
                        {
                            NavbarLinks.map((link, index) => {
                                return (
                                    <li key={index} >
                                        {
                                            link.title === "Catalog" ?
                                                (<div className="relative  flex items-center text-richblack-25 gap-1 group ">
                                                    <p>Catalog</p>
                                                    <IoIosArrowDropdownCircle />
                                                    <div className="absolute invisible bg-richblack-5   left-[50%]
                                                       translate-x-[-50%] translate-y-[30%]
                                                        z-[10]
                                                       top-[50%]
                                                         flex flex-col
                                                      rounded-md p-4 text-richblack-900 opacity-0 transition-all duration-200  
                                                        group-hover:visible group-hover:opacity-100 lg:w-[300px] ">
                                                        <div className="absolute invisible bg-richblack-5 top-[-0%]  left-[50%]
                                                         translate-x-[80%] translate-y-[-45%] w-6 h-6  rotate-45  rounded transition-all duration-200 
                                                        group-hover:visible
                                                        ">

                                                        </div>

                                                        {
                                                            loading ?
                                                                <div>Loading</div>
                                                                :
                                                                (
                                                                    subLinks[0].length > 0 ?
                                                                        (subLinks[0].map((sublink, index) => (
                                                                            <Link
                                                                                key={index}
                                                                                to={`/catalog/${sublink.name
                                                                                    .split(" ")
                                                                                    .join("-")
                                                                                    .toLowerCase()}`}
                                                                            >
                                                                                <p>{sublink.name}</p>
                                                                            </Link>
                                                                        ))) :
                                                                        (<div>
                                                                            Category Not Found
                                                                        </div>)
                                                                )
                                                        }
                                                    </div>

                                                </div>) :
                                                (<Link to={link?.path}>
                                                    <p
                                                        className={`${matchRoute(link?.path)
                                                            ? "text-yellow-25"
                                                            : "text-richblack-25"
                                                            }`}
                                                    >
                                                        {link.title}
                                                    </p>
                                                </Link>)
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>

                <div className="flex gap-x-4 items-center justify-center">
                    {
                        user && user?.accounType != "Instructor" && (
                            <Link to="/dashboard/cart">

                            </Link>
                        )
                    }

                    {
                        token === null && (
                            <Link to="/login">
                                <button className="border-2 border-richblack-700 bg-richblack-800 text-richblack-100 rounded-md px-[12px] py-[8px]">
                                    Login
                                </button>
                            </Link>
                        )
                    }

                    {
                        token === null && (
                            <Link to="/signup">
                                <button className="border-2 border-richblack-700 bg-richblack-800 text-richblack-100 rounded-md px-[12px] py-[8px]">
                                    SignUp
                                </button>
                            </Link>
                        )
                    }

                    {
                        token !== null && (<ProfileDropdown></ProfileDropdown>)
                    }

                </div>


            </div>

        </div>
    )
}