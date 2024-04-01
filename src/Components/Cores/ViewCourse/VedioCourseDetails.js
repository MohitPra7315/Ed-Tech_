<<<<<<< HEAD
import { useEffect } from "react"
=======
import { useEffect, useState } from "react"
>>>>>>> 11c233078fee4c77d0803b95ea12528abe9eeeb9
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const VedioCourseDetails = () => {
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)
    const { user } = useSelector((state) => state.profile)
    const { courseID, sectionId, subSectionId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { courseEntireDetail } = useSelector((state) => state.courseViewDetail)
<<<<<<< HEAD
    console.log("redu courVeiwDetais", courseEntireDetail)
    useEffect(() => {
        const checkdat = () => {
const currentSection=courseEntireDetail.courseContent.section.findIndex((data)=>data._id===sectionId)
console.log("currentSection",currentSection)
         const   vedioIndex= courseEntireDetail.courseContent
        }
        checkdat()

    }, [])
=======
    console.log(" courseEntire data", courseEntireDetail)
    const [vedioData, setVedioData] = useState([])
    const isFirstvedio = () => {
        if (courseEntireDetail.courseContent) {
            const currentSection = courseEntireDetail.courseContent.findIndex((section) => section._id === sectionId)
            console.log(" coursection", currentSection)
            const currentSubSectionIndex = courseEntireDetail.courseContent[currentSection].subSection.findIndex((subSection) => subSection._id === subSectionId)
            console.log(" currentSubsection", currentSubSectionIndex)

            // find current vedio
            const currentVedio = courseEntireDetail.courseContent[currentSection].subSection[currentSubSectionIndex]._id
            console.log(" currentSubsection", currentVedio)
        } else {

            return false
        }
    }
    isFirstvedio()

>>>>>>> 11c233078fee4c77d0803b95ea12528abe9eeeb9

    return (
        <div className="text-3xl text-yellow-25">
            this is Vediw course detrais d

        </div>
    )
}

export default VedioCourseDetails