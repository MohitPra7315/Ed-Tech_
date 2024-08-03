import HighlightedText from "./HighlightedText"
import React, { useState } from "react"
import { HomePageExplore } from "../../../data/homepage-explore"
import CourseCard from "./CourseCard"

function ExploreMore() {

    const TabsName = [
        "Free",
        "New To Coding",
        "Most Popular",
        "Skills Paths",
        "Career Paths"

    ]


    const [currentTab, setCurrentTab] = useState(TabsName[0])
    const [courses, setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMycard = (value) => {
        setCurrentTab(value)
        const result = HomePageExplore.filter((course) => course.tag === value);
        console.log("result is here ",result)
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
        console.log("result ", result)
    }
    return (
        <div>
            <div className="flex flex-col gap-5 items-center px-4  py-1">
                <div className="text-white text-4xl">
                    Unlock the
                    <HighlightedText text={"Power of Code"}></HighlightedText>
                </div>
                <div className="text-[16px] text-sm mt-2 text-richblack-300  ">
                    Learn to Build Anything  You can imagine
                </div>
                <div className="flex bg-richblack-800 text-richblack-100 mb-5 rounded-full px-1 py-1">
                    {
                        TabsName.map((element, index) => {
                            return (
                                <div key={index} className={`
                                flex flex-row gap-2 text-[16px] items-center
                                     ${currentTab === element ?
                                        "bg-richblack-900 text-richblack-5 font-medium" :
                                        "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer
                                     hover:bg-richblack-900 hover:text-richblack-5 px-5 py-1
                                `}
                                    onClick={() =>setMycard(element)}
                                >
                                    {element}

                                </div >
                            )
                        })
                    }
                </div>
                <div>
                    <div className="lg:[150px]">

                        <div className="flex flex-row gap-10 mt-6 mx-10 ">

                            {
                                courses.map((Course, index) => (<CourseCard key={index} currentCard={currentCard} setCurrentCard={setCurrentCard} Course={Course}></CourseCard>))
                            }


                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ExploreMore