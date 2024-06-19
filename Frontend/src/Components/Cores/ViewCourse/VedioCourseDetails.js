import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"


import { useRef } from 'react';
import { FaCirclePlay } from "react-icons/fa6";
import { IconBtn } from "../../Common/IconBtn";
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import { markLectureAsComplete } from "../../../services/operations/CourseDetail_Api";

const VedioCourseDetails = () => {
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)
    const { user } = useSelector((state) => state.profile)
    const { courseID, sectionId, subSectionId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const playerRef = useRef();
    const { courseEntireDetail } = useSelector((state) => state.courseViewDetail)
    const [vedioData, setVedioData] = useState([])
    const [videoEnded, setVideoEnded] = useState(false);

    const [loading, setLoading] = useState(false);

    console.log("entire detail of course ", courseEntireDetail.courseContent);
    console.log("vedio url ", );

    useEffect(() => {
        const setvideoSpecificDetails = async () => {
            if (!courseEntireDetail.length) {
                return
            }
            if (!courseID && !sectionId && !subSectionId) {
                navigate("/dashboard/enrolled-courses");
            }
            else {
                const filterData = courseEntireDetail.courseContent.filter((Coursse) => Coursse._id === sectionId)
                const filterVideoDatData = filterData?.[0].subSection.filter((data) => data._id === subSectionId)
                setVedioData(filterVideoDatData[0]);
                setVideoEnded(false);
            }
        }
        setvideoSpecificDetails();
    }, [courseEntireDetail, courseEntireDetail.courseContent, location.pathname])

    const isFirstvedio = () => {
        if (courseEntireDetail.courseContent) {
            const currentSectionIndex = courseEntireDetail.courseContent.findIndex((section) => section._id === sectionId)
            const currentSubSectionIndex = courseEntireDetail.courseContent[currentSectionIndex].subSection.findIndex((subSection) => subSection._id === subSectionId)
            // find current vedio
            // const currentVedio = courseEntireDetail.courseContent[currentSectionIndex].subSection[currentSubSectionIndex]._id === subSectionId
            if (currentSectionIndex === 0 && currentSubSectionIndex) {
                return true;
            }
        }
        else {

            return false
        }
    }
    const isLastVideo = () => {
        // if (courseEntireDetail.courseContent) {
        const currentSectionIndex = courseEntireDetail.courseContent.findIndex((section) => section._id === sectionId)
        const currentSubSectionIndex = courseEntireDetail.courseContent[currentSectionIndex].subSection.findIndex((subSection) => subSection._id === subSectionId)
        const noOfSubSection = courseEntireDetail.courseContent[currentSectionIndex].subSection.length;
        if (currentSectionIndex === courseEntireDetail.length - 1 &&
            currentSubSectionIndex === noOfSubSection - 1) {
            return true;
        }
        // }
        else {
            return false
        }
    }
    const isNextVideo = () => {
        // if (courseEntireDetail.courseContent) {
        const currentSectionIndex = courseEntireDetail.courseContent.findIndex((section) => section._id === sectionId)
        const currentSubSectionIndex = courseEntireDetail.courseContent[currentSectionIndex].subSection.findIndex((subSection) => subSection._id === subSectionId)
        const noOfSubSection = courseEntireDetail.courseContent[currentSectionIndex].subSection.length;
        if (currentSectionIndex === courseEntireDetail.length - 1 &&
            currentSubSectionIndex === noOfSubSection - 1) {
            return true;
        }
        // }
        else {
            return false
        }
    }

    const goToNExtVideo = () => {
        // if (courseEntireDetail.courseContent) {
        const currentSectionIndex = courseEntireDetail.courseContent.findIndex((section) => section._id === sectionId)
        const currentSubSectionIndex = courseEntireDetail.courseContent[currentSectionIndex].subSection.findIndex((subSection) => subSection._id === subSectionId)
        const noOfSubSection = courseEntireDetail.courseContent[currentSectionIndex].subSection.length;
        if (currentSectionIndex !== noOfSubSection - 1) {
            // same section ki vedio dekhni h 
            const nextSubSectionId = courseEntireDetail.courseContent[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
            navigate(`/view-course/${courseID}/section/${subSectionId}/sub-section/${nextSubSectionId}`)
        }
        // }
        else {
            // diff sesction ki first video p jana h  
            const nextSectionnId = courseEntireDetail.courseContent[currentSectionIndex + 1]._id;
            const nextSubSectionnId = courseEntireDetail.courseContent[currentSectionIndex + 1].subSection[0]._id;
            // is vedio par 
            navigate(`/view-course/${courseID}/section/${nextSectionnId}/sub-section/${nextSubSectionnId}`)
        }
    }
    const goToprevious = () => {
        // if (courseEntireDetail.courseContent) {
        const currentSectionIndex = courseEntireDetail.courseContent.findIndex((section) => section._id === sectionId)
        const currentSubSectionIndex = courseEntireDetail.courseContent[currentSectionIndex].subSection.findIndex((subSection) => subSection._id === subSectionId)
        const noOfSubSection = courseEntireDetail.courseContent[currentSectionIndex].subSection.length;
        if (currentSubSectionIndex !== 0) {
            // same section ki privious dekhni h 
            const prevSubSectionId = courseEntireDetail.courseContent[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
            navigate(`/view-course/${courseID}/section/${subSectionId}/sub-section/${prevSubSectionId}`);

        }
        // }
        else {
            // diff sesction ki last video p jana h  
            const prevSectionnId = courseEntireDetail.courseContent[currentSectionIndex - 1]._id;
            const prevSubSectionnIndex = courseEntireDetail.courseContent[currentSectionIndex - 1].subSection.length;
            const prevSubSectionnId = courseEntireDetail.courseContent[currentSectionIndex - 1].subSection[prevSubSectionnIndex - 1]._id;
            // is vedio par 
            navigate(`/view-course/${courseID}/section/${prevSectionnId}/sub-section/${prevSubSectionnId}`)
        }
    }

    const handleLectureComplete = async () => {
        // dummy code,baad we will 
        setLoading(true);
        const res = await markLectureAsComplete({ courseID: courseID, subSectionId: subSectionId }, token)
        if (res) {
            // dispatch(updateCompleteLectures(subSectionId))

        }
        setLoading(false)
    }


    return (
        <div className="text-3xl text-yellow-25">
            {
                !vedioData ?
                    (<div>Not Vedio Found</div>) :
                    (
                        <Player
                            ref={playerRef}
                            aspectRatio="16:9"
                            playsInline
                            onEnded={() => setVideoEnded(true)}
                            src={courseEntireDetail.courseContent[0].subSection[0].videoUrl}
                        >
                            <FaCirclePlay className=" bg-white" />
                            {/* {
                                videoEnded && (
                                    <div>

                                        <IconBtn disabled={loading}
                                            onClick={() => {
                                                if (playerRef?.current) {
                                                    playerRef.current?.seek(0);
                                                    setVideoEnded(false)
                                                }
                                            }}
                                            text="Rewatch"
                                        >

                                        </IconBtn>
                                    </div>
                                )
                            } */}
                        </Player>
                    )
            }
        </div>
    )
}
export default VedioCourseDetails