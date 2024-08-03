import React from "react"

const CourseCard = ({ Course, currentCard, setCurrentCard }) => {

    console.log("data", currentCard)
    return (
        <div className="min-w-11/12 bg-white flex gap-8  mt-14 ">

            <div className={`flex flex-col justify-evenly gap-3 items-center text-richblack-300
            ${Course.heading === currentCard ?
                    "bg-white text-black" :
                    "bg-richblack-700  "
                }
            `}
                onClick={(e) => setCurrentCard(Course.heading)}
            >

                <div className="flex flex-col gap-8  px-6 pt-8  ">
                    <h1 className={` font-bold ${Course.heading === currentCard ? "text-black" : "text-white "}`}>{Course.heading}</h1>
                    <p className="h-32">{Course.description}</p>
                </div>
                <div className="border-t-2 border-dotted w-full">

                </div>
                <div className={`flex flex-row w-full  justify-between px-10 h-10 items-center ${Course.heading === currentCard ? "text-caribbeangreen-100" : " text-richblack-300"}   `}>
                    <div>
                        icon
                        <div>{Course.level}</div>

                    </div>
                    <div>
                        <div> <icon></icon></div>
                        <div>Lession</div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default CourseCard