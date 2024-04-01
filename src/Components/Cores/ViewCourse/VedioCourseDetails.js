import { useEffect } from "react"
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
    console.log("redu courVeiwDetais", courseEntireDetail)
    useEffect(() => {
        const checkdat = () => {
const currentSection=courseEntireDetail.courseContent.section.findIndex((data)=>data._id===sectionId)
console.log("currentSection",currentSection)
         const   vedioIndex= courseEntireDetail.courseContent
        }
        checkdat()

    }, [])

    return (
        <div className="text-3xl text-yellow-25">
            this is Vediw course detrais d

        </div>
    )
}

export default VedioCourseDetails