import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RxDropdownMenu } from "react-icons/rx";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { deleteSection } from "../../../../../services/operations/CourseDetail_Api"
import ConfirmationModal from "../../../../Common/ConfirmModal"
import { IconBtn } from "../../../../Common/IconBtn";
import { AiOutlinePlus } from "react-icons/ai"
import { SubsectionModal } from "./subsectionModal"
import { deleteSubSection } from "../../../../../services/operations/CourseDetail_Api"
import { setCourse } from "../../../../../Slices/coursesSlice";

const SubSectionCreate = ({ handlechangeEditsection }) => {

    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const [viewSubsection, setViewSubsection] = useState(null)
    const [addSubsection, setAddSubsection] = useState(null)
    const [editSubsection, setEditSubsection] = useState(null)
    console.log("addsection Data", addSubsection)

    const [confirmationModal, setConfirmationModal] = useState(null)

    const handledeleteSection = async (sectionId) => {

        console.log("CHECK DELETE OR NOT.......!", course._id)
        const result = await deleteSection({ sectionId, courseId: course._id, token })
        console.log("...............", result)
        if (result) {


            dispatch(setCourse(result))
        }
        setConfirmationModal(null)

    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({ sectionId, subSectionId, token })
        console.log("Result For ADDing SUB SECTION", result)
        if (result) {
            // const subSection = course?.courseContent.map((section) =>
            //     section.id === sectionId ? result : section)
            // const UpdatedCourse = { ...course, courseContent: subSection }
            dispatch(setCourse(result))

        }
        setConfirmationModal(null)

    }


    return (
        <div className="rounded-lg bg-richblack-700 p-6 px-8 text-white">

            <div className=" flex flex-col    ">
                {
                    course?.courseContent?.map((section) =>
                        <details key={section._id} open>
                            <summary className="flex justify-between items-center border-b-2 border-b-richblack-600 py-2 ">
                                <div className="flex items-center gap-x-2 ">
                                    <RxDropdownMenu></RxDropdownMenu>
                                    <p>{section.sectionName}</p>

                                </div>
                                <div className="flex items-center gap-x-2">
                                    <button className="cursior-pointer" onClick={() => handlechangeEditsection(section.sectionName, section._id)}>
                                        <MdOutlineEdit />
                                    </button>
                                    <button
                                        onClick={() => setConfirmationModal({
                                            heading: "Delete this Section ?",
                                            subHeading: "All the Lectures of this Section will be Deleted",
                                            btn1: "Delete",
                                            btn2: "Cancel",
                                            btnHandler1: () => handledeleteSection(section._id),

                                            btnHandler2: () => setConfirmationModal(null)
                                        })}
                                    >
                                        <MdDeleteForever />
                                    </button>
                                    <span>|</span>
                                    <IoMdArrowDropdown></IoMdArrowDropdown>

                                </div>
                            </summary>
                            {/*  Lecture of Subsection for Edit,viewing,Delete */}
                            <div>
                                {
                                    section?.subSection?.map((data) =>
                                    (
                                        <div
                                            key={data?._id}
                                            onClick={() => setViewSubsection(data)}
                                            className="flex items-center justify-between gap-x-2  border-b-2"
                                        >
                                            <div className="flex items-center gap-x-3 py-2 ">
                                                <RxDropdownMenu className="text-2xl text-richblack-50" />
                                                <p className="font-semibold text-richblack-50">
                                                    {data.title}
                                                </p>
                                            </div>
                                            <div
                                                onClick={(e) => { e.stopPropagation() }}
                                                className="flex items-center gap-x-2">
                                                {/* editSubsection for open Modal */}
                                                <button className="cursior-pointer"
                                                    onClick={() => setEditSubsection({ ...data, sectionId: section._id })}>
                                                    <MdOutlineEdit />
                                                </button>
                                                <button
                                                    onClick={() => setConfirmationModal({
                                                        heading: "Delete this Sub Section ?",
                                                        subHeading: "This Lecture will be Declared",
                                                        btn1: "Delete",
                                                        btn2: "Cancel",
                                                        btnHandler1: () => {
                                                            handleDeleteSubSection(data._id, section._id)
                                                        },
                                                        btnHandler2: () => setConfirmationModal(null)
                                                    })}
                                                >
                                                    <MdDeleteForever />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                    )

                                }
                                <button
                                    className="mt-8 flex items-center gap-x-2 text-yellow-50"
                                    onClick={() => {
                                        setAddSubsection(section._id)
                                    }}>
                                    <AiOutlinePlus />
                                    <p>    Add Lecture</p>

                                </button>

                            </div>

                            {/* Add Lecture Button  */}






                        </details>
                    )}
            </div>

            {
                addSubsection ?
                    (<SubsectionModal
                        modalData={addSubsection}
                        setModalData={setAddSubsection}
                        add={true}
                    />)
                    : viewSubsection ?
                        (<SubsectionModal
                            modalData={addSubsection}
                            setModalData={setAddSubsection}
                            view={true} />)
                        : editSubsection ? (<SubsectionModal

                            modalData={addSubsection}
                            setModalData={setAddSubsection}
                            edit={true} />)
                            : (<div></div>)
            }
            {
                confirmationModal !== null && <ConfirmationModal ModalData={confirmationModal}></ConfirmationModal>
            }
        </div>
    )
}
export default SubSectionCreate