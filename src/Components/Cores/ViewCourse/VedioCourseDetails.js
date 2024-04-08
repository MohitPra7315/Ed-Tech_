import { useEffect, useState } from "react"
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
    const [vedioData, setVedioData] = useState([])
    const isFirstvedio = () => {
        if (courseEntireDetail.courseContent) {
            const currentSection = courseEntireDetail.courseContent.findIndex((section) => section._id === sectionId)
            const currentSubSectionIndex = courseEntireDetail.courseContent[currentSection].subSection.findIndex((subSection) => subSection._id === subSectionId)

            // find current vedio
            const currentVedio = courseEntireDetail.courseContent[currentSection].subSection[currentSubSectionIndex]._id
        } else {

            return false
        }
    }
    isFirstvedio()


    return (
        <div className="text-3xl text-yellow-25">
            this is Vediw course detrais d

        </div>
    )
}

export default VedioCourseDetails