import { Link } from "react-router-dom"
import { RatingStars } from "../../Common/RatingStar"
import GetAvgRating from "../../../utils/avgRating"
import { useEffect, useState } from "react"
export const Course_Card = ({ Course, Height }) => {


    const [avgRating, setAvgRating] = useState(0)
    useEffect(() => {
        const count = GetAvgRating(Course?.ratingAndReviews)
        setAvgRating(count)
    }, [Course])
    return (
        <div>
            <Link to={`/courses/${Course._id}`}>
                <div className="">
                    <div>
                        <img src={`${Course?.thumbnail}`}
                            alt="Course Thumbnail"
                            className={`${Height} w-full rounded-xl object-cover `}
                        />
                    </div>
                    <div className="flex flex-col gap-2 px-1 py-3">
                        <p className="text-2xl text-richblack-5">{Course.courseName}</p>
                        {/* <p className="text-xl text-richblack-5">{Course?.instructor?.name}</p> */}
                        <p className="text-sm text-richblack-50"> {Course?.instructor?.firstName} {Course?.instructor?.lastName}</p>
                        <div className="flex items-center gap-2 ">
                            <span className="text-yellow-25 flex items-center">{avgRating || 0}</span>
                            <RatingStars Review_Count={avgRating} />
                            <span className="text-richblack-400">{Course?.ratingAndReviews?.length}    Ratings</span>
                        </div>
                        <p className="text-xl text-richblack-5">Rs.  {Course?.price}</p>
                    </div>
                </div>

            </Link>
        </div>
    )
}