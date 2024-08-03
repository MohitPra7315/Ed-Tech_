
import { useState } from "react"
import { useForm } from "react-hook-form"
import { IconBtn } from "../../../../Common/IconBtn"
import { useSelector, useDispatch } from "react-redux"
import { FiPlusCircle } from "react-icons/fi";
import { setCourse, setEditCourse, setStep } from "../../../../../Slices/coursesSlice";
import { MdNavigateNext } from "react-icons/md";
import toast from "react-hot-toast";
import { updateSection, createSection } from "../../../../../services/operations/CourseDetail_Api"
import SubSectionCreate from "./subSectionCreate"
const CourseBuilder = () => {

    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm()
    const [editSectionName, setEditSectionName] = useState(null)
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const handleCancelEdit = () => {
        setEditSectionName(null)
        setValue("sectionName", " ")
    }

    const goBackHandle = () => {
        dispatch(setStep(1))
        dispatch(setEditCourse(true))
    }

    const goNextHandle = () => {
        if (course.courseContent.length === 0) {
            toast.error("Please Add Atleast One Section")
            return
        }
        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Please Add Atleast one Lecture in  subSection")
            return

        }
        dispatch(setStep(3))

    }
    const onSubmit = async (data) => {
        const toastId = toast.loading("Loading....")
        let result;

        // this is for when user update or edit old section in selected course category

        if (editSectionName) {
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id
                }, token
            )
        }
        // this is for create new section in selected course category
        else {
            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id
            },
                token
            )
            console.log("RESULT FOR CREATE SECTION AND", result);
        }

        // when we get response from Update section and add new section we save in redux that data
        if (result) {
            console.log("editSectionData result", course)
            dispatch(setCourse(result))
            setEditSectionName(null)
            setValue("sectionName", " ")
            console.log("Updated", course)


        }
        toast.dismiss(toastId)

    }




    const handlechangeEditsection = (sectionName, sectionId) => {

        if (editSectionName === sectionId) {
            setEditSectionName(null)
            setValue("sectionName", " ")
            console.log("sectionID also putted inside the editSectionName")
            return
        }
        else {

            console.log("sectionID putt in  the editSectionName")

            setEditSectionName(sectionId)
            setValue("sectionName", sectionName)
            return
        }

    }
    return (
        <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
            <form className="w-full text-white " onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-2">
                    <label htmlFor='sectionName'>Section name <sup>*</sup></label>
                    <input
                        id='sectionName'
                        placeholder='Add section name for build a Course'
                        {...register("sectionName", { required: true })}
                        className='form-style text-black w-full'
                    />
                    {errors.sectionName && (
                        <span>Section Name is required</span>
                    )}
                </div>
                <div className="flex items-end gap-x-4">
                    <IconBtn
                        customClasses={"text-yellow-50"}
                        text={`${editSectionName ? "Edit section Name" : "Create Course"}`}
                        type="Submit"
                        outline={true}
                    >
                        <FiPlusCircle />

                    </IconBtn>

                    <button type="button"
                        onClick={handleCancelEdit}
                        className="text-richblack-300 underline"

                    >
                        CancelEdit
                    </button>
                </div>
            </form>
            <div>
                {/* section  */}
                {
                    course?.courseContent?.length > 0 && (
                        <SubSectionCreate handlechangeEditsection={handlechangeEditsection}></SubSectionCreate>
                    )
                }
            </div>
            <div className="flex w-fit float-right gap-4 mt-5">
                <button className="bg-richblack-300 rounded-md py-2 px-5 font-bold"
                    onClick={goBackHandle}
                >
                    BAck
                </button>
                <button className="bg-yellow-50 font-bold text-black rounded-md py-2 px-5 flex gap-5 justify-center items-center"
                    onClick={goNextHandle}
                >
                    Next
                    <MdNavigateNext></MdNavigateNext>
                </button>
            </div>

        </div>
    )
}

export default CourseBuilder