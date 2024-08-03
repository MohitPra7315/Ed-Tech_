import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { IconBtn } from "../../../Common/IconBtn";
import { DateFormater } from "../../../../utils/DateFormater"
import { COURSE_STATUS } from "../../../../utils/constant";
import { HiClock } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import ConfirmationModal from "../../../Common/ConfirmModal";
import { useNavigate } from "react-router-dom"
import { FiEdit2 } from "react-icons/fi";
import {RiDeleteBin6Line} from "react-icons/ri"
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/CourseDetail_Api"

export const MyCourse = ({ courses, setCourses }) => {
    console.log("Course of Instructor ......", courses)

    // const { courses } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const DescriptionLenth = 30;
    const handleCourseDetail = async (courseId) => {
        console.log("check deleted courseId", courseId)
        setLoading(true)
        await deleteCourse({ courseId: courseId }, token)
        const result = await fetchInstructorCourses(token)
        if (result) {
            console.log("response....", result)
            setCourses(result)
        }
        setConfirmationModal(null)
        setLoading(false)
    }
    return (

        <div>

            <Table className="rounded-xl border border-richblack-800 w-full ">
                <Thead>

                    <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                            Courses
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Duration
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Price
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Actions
                        </Th>
                    </Tr>

                </Thead>
                <Tbody>
                    {courses.length === 0 ?
                        (<Tr>
                            <Td className="py-10 text-center text-2xl font-medium text-richblack-100">NOT A Signle Course</Td>
                        </Tr>)
                        : (courses.map((course) => (
                            <Tr
                                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                                key={course._id}>
                                <Td className="flex text-white">
                                    <img

                                        src={course?.thumbnail ? course.thumbnail : ""}
                                        alt={course?.courseName}
                                        className="h-[148px] w-[220px] rounded-lg object-cover "
                                    />
                                    <div className="flex flex-col justify-between">
                                        <p className="text-lg font-semibold text-richblack-5">{course.courseName}</p>

                                        <p className="text-xs text-richblack-300">
                                            {course.courseDescription.split(" ").length >
                                                DescriptionLenth
                                                ? course.courseDescription
                                                    .split(" ")
                                                    .slice(0, DescriptionLenth)
                                                    .join(" ") + "..."
                                                : course.courseDescription}
                                        </p>
                                        <p className="text-[12px] text-white">
                                            Created: {DateFormater(course.createdAt)}
                                        </p>

                                        {
                                            course.status === COURSE_STATUS.DRAFT ?
                                                (<p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                    <HiClock size={14} />
                                                    Drafted
                                                </p>) :
                                                (<p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                                    <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                        <FaCheck size={8} />
                                                    </div>
                                                    Published
                                                </p>)
                                        }

                                    </div>

                                </Td>
                                <Td className="text-sm font-medium text-richblack-100">
                                    2hr 30min
                                </Td>
                                <Td className="text-sm font-medium text-richblack-100">
                                    ₹{course.price}
                                </Td>
                                <Td className="text-sm font-medium text-richblack-100 ">
                                    <button
                                       
                                        disabled={loading}
                                        onClick={() =>
                                            navigate(`/dashboard/edit-course/${course._id}`)
                                        }
                                        title="Edit"
                                        className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                    >
                                   <FiEdit2 size={20} />
                                    </button>
                                    <button
                                        title="Delete"
                                        className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                        onClick={() => {
                                            setConfirmationModal({
                                                heading: "are you want to delete this course?",
                                                subHeading: "this course will be  deleted from your account",
                                                btn1: "Delete",
                                                btn2: "Cancel",
                                                btnHandler1: !loading ? () => handleCourseDetail(course._id) : () => { },
                                                btnHandler2: !loading ? () => setConfirmationModal(null) : () => { }
                                            })

                                        }}>
                                        <RiDeleteBin6Line size={20} />
                                    </button>
                                </Td>
                            </Tr>

                        )))

                    }
                </Tbody>
            </Table>

            {
                confirmationModal != null && <ConfirmationModal ModalData={confirmationModal} setModalData={setConfirmationModal}></ConfirmationModal>
            }
        </div>

    )
}

