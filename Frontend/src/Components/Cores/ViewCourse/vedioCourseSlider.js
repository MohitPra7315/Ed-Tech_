import { useEffect, useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { IconBtn } from "../../Common/IconBtn";
import { useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { HiOutlineVideoCamera } from "react-icons/hi2"
const VedioCourseSlider = ({ courseData, setActive, ReviewToggle }) => {

    // this field for save index of section and subSection index
    const [activeSectionStatus, setActiveSectionStatus] = useState("")
    const [vedioStatus, setVedioStatus] = useState("")
    const { sectionId, subSectionId } = useParams()
    const [open, setOpen] = useState(false)
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        courseEntireDetail,
        courseSectionDetails,
        noOfLectures

    } = useSelector((state) => state.courseViewDetail)
    useEffect(() => {
        // first render fetched from url current course sectionId and SubSectionId
        const firstrender = () => {
            if (!courseData?.courseContent)
                return
            const currentSectionIndx = courseData.courseContent.findIndex(
                (data) => data._id === sectionId
            )

            const currentSubSectionIndx = courseData.courseContent?.[
                currentSectionIndx
            ]?.subSection.findIndex((data) => data._id === subSectionId)

            const activeSubSectionId =
                courseData.courseContent[currentSectionIndx]?.subSection?.[
                    currentSubSectionIndx
                ]?._id
            setActiveSectionStatus(courseData.courseContent[currentSectionIndx]._id)
            setVedioStatus(activeSubSectionId)
        }
        firstrender()
    }, [location.pathname, courseData, courseEntireDetail])

    if (courseData === null || undefined) {
        return
    }

    return (
        <>
            <div className="relative w-[320px] max-w-[350px] h-[calc(100vh-3.5rem)] hidden md:block flex-col text-white border-r-[1px] pt-6  border-r-richblack-700 bg-richblack-800">
                <div className="flex  w-full justify-around ">
                    <FiArrowLeftCircle className="bg-richblack-25 cursor-pointer" onClick={() => navigate(-1)} size={"30px"} />
                    <IconBtn text="Add Review"
                        outline={false}
                        onclick={() => ReviewToggle()}
                        customClasses={"ml-auto"}
                    />
                </div>
                {/* count totalNo of Lecture section */}
                <div>
                    {
                    }
                </div>
                <div className="h-[1px] w-[100%] bg-richblack-400 my-3 mx-auto"></div>
                <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
                    {courseData?.courseContent?.map((section, index) => (
                        <div className="cursor-pointer"
                            key={index}
                            onClick={() => setActiveSectionStatus(section._id)}
                        >
                            <div className="bg-richblack-500 flex justify-between h-[50px]">
                                <div>
                                    <div>{section.sectionName}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`${activeSectionStatus === section?._id
                                            ? "rotate-0"
                                            : "rotate-180"
                                            } transition-all duration-500`}
                                    >
                                        <FaAngleDown />
                                    </span>
                                </div>
                            </div>
                            {/* sub-Sections */}
                            <div>
                                {activeSectionStatus === section?._id && (
                                    <div className="transition-[height] duration-500 ease-in-out">
                                        {section.subSection.map((topic, i) => (
                                            <div
                                                className={`flex gap-3  px-5 py-2 ${vedioStatus === topic._id
                                                    ? "bg-yellow-200 font-semibold text-richblack-800"
                                                    : "hover:bg-richblack-900"
                                                    } `}
                                                key={i}
                                                onClick={() => {
                                                    navigate(
                                                        `/view-course/${courseData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                                                    )
                                                    setVedioStatus(topic._id)
                                                }}
                                            >
                                                {/* <input
                                                    type="checkbox"
                                                    checked={completedLectures.includes(topic?._id)}
                                                    onChange={() => { }}
                                                /> */}
                                                {topic.title}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>

        </>
    )
}

export default VedioCourseSlider