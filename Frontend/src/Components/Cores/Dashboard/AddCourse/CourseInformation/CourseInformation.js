import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { ChipInput } from './ChipInput';
import Upload from "./Upload"
import RequirmentFields from "../requirmentField"
import { IconBtn } from "../../../../Common/IconBtn"
import { setCourse } from "../../../../../Slices/coursesSlice"
import { setStep } from "../../../../../Slices/coursesSlice"
import toast from "react-hot-toast"
import { COURSE_STATUS } from "../../../../../utils/constant"
import { MdNavigateNext } from "react-icons/md"
import { editCourseDetails,addCourseDetails } from "../../../../../services/operations/CourseDetail_Api"
import FetchAllCourseCategory from "../../../../../services/operations/CourseDetail_Api"

export const CourseInformation = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { course, editCourse } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])




    useEffect(() => {
        setLoading(true)
        const fetcheAllCategory = async () => {
            const response = await FetchAllCourseCategory()
            if (response.length > 0) {
                setCourseCategories(response)
            }
        }
        fetcheAllCategory()
        setLoading(false)
        if (editCourse) {
            // console.log("data populated", editCourse)
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formUpdate = () => {
        let current = getValues()
        if (current.courseTitle !== course.courseName ||
            current.courseShortDesc !== course.courseDescription ||
            current.coursePrice !== course.price ||
            current.courseTags.toString() !== course.tag.toString() ||
            current.courseBenefits !== course.whatYouWillLearn ||
            current.courseCategory._id !== course.category._id ||
            current.courseRequirements.toString() !== course.instructions.toString() ||
            current.courseImage !== course.thumbnail) {
            return true
        }
        else {
            return false
        }
    }


    const onSubmit = async (data) => {
        const toastId = toast.loading("Loading...")
        console.log("working upto here")
        // Edit  course logic from there
        if (editCourse) {
            console.log("redux data for Edit course".course)
            if (course) {
                setValue("courseName", course.courseName)
                setValue("courseDescription", course.courseDescription)
                setValue("price", course.price)
                setValue("tag", course.tag)
                setValue("whatYouWillLearn", course.whatYouWillLearn)
                setValue("categoryId", course.category)
                setValue("status", course.status)
                setValue("instructions", JSON.stringify(course.Requirements))
                setValue("thumnaileImg", course.thumbnail[0])
            }
            if (formUpdate()) {
                const current = getValues()
                let formdataEdit = new FormData()
                if (course.courseName !== current.courseName) {
                    formdataEdit.append("courseName", data.courseName)
                }
                if (current.courseShortDesc !== course.courseDescription) {
                    formdataEdit.append("courseDescription", data.courseShortDesc)
                }
                if (current.coursePrice !== course.price) {
                    formdataEdit.append("price", data.coursePrice)
                }
                if (current.courseTags.toString() !== course.tag.toString()) {
                    formdataEdit.append("tag", JSON.stringify(data.courseTags))
                }
                if (current.courseBenefits !== course.whatYouWillLearn) {
                    formdataEdit.append("whatYouWillLearn", data.courseBenefits)
                }
                if (current.courseCategory._id !== course.category._id) {
                    formdataEdit.append("categoryId", data.courseCategory)
                }
                if (
                    current.courseRequirements.toString() !== course.instructions.toString()) {
                    formdataEdit.append("instructions", JSON.stringify(data.courseRequirements))
                }
                if (current.courseImage !== course.thumbnail) {
                    formdataEdit.append("thumnaileImg", data.courseImage[0])
                }
                // const toastId = toast.loading("Loading...")
                const result = await editCourseDetails(formdataEdit, token)
                // toast.dismiss(toastId)
                if (result) {
                    dispatch(setStep(2))
                    dispatch(setCourse(result))
                }
            } else {
                toast.error("No made change in Course")
            }
            return
        }
        console.log("working upto here ---2")

        // add course login from there
        const formdataa = {
            courseName: data.courseTitle,
            courseDescription: data.courseShortDesc,
            price: data.coursePrice,
            tag: JSON.stringify(data.courseTags),
            categoryId: data.courseCategory,
            status: COURSE_STATUS.DRAFT,
            instructions: JSON.stringify(data.courseRequirements),
            thumnaileImg: data.courseImage[0],
            whatYouWillLearn: data.courseBenefits
        }
        console.log("working upto here ---3")

        const addcourseData = async () => {
        console.log("working upto here--==4")

            console.log("clicked Next button for create new Course", formdataa)
            const res = await addCourseDetails(formdataa, token)
            if (res) {
                dispatch(setCourse(res))
                dispatch(setStep(2))
            }
        console.log("working upto here----==>>> 5")

        }
        toast.dismiss(toastId)
        addcourseData();
    }


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
        >
            {/* Course Title */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseTitle">
                    Course Title <sup className="text-pink-200">*</sup>
                </label>
                <input
                    name="courseTitle"
                    id="courseTitle"

                    placeholder="Enter Course Title"
                    className="mb-4"
                    {...register("courseTitle", { required: true })}
                />
                {errors.courseTitle && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course title is required
                    </span>
                )}
            </div>
            {/* Course Short Description */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
                    Course Short Description <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                    id="courseShortDesc"
                    placeholder="Enter Description"
                    {...register("courseShortDesc", { required: true })}
                    className="form-style resize-x-none min-h-[130px] w-full"
                />
                {errors.courseShortDesc && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Description is required
                    </span>
                )}
            </div>
            {/* Course Price */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="coursePrice">
                    Course Price <sup className="text-pink-200">*</sup>
                </label>
                <div className="relative">
                    <input
                        id="coursePrice"
                        placeholder="Enter Course Price"
                        {...register("coursePrice", {
                            required: true,
                            valueAsNumber: true,
                            pattern: {
                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            },
                        })}
                        className="form-style w-full !pl-12"
                    />
                    <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
                </div>
                {errors.coursePrice && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Price is required
                    </span>
                )}
            </div>
            {/* Course Category */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseCategory">
                    Course Category <sup className="text-pink-200">*</sup>
                </label>
                <select
                    {...register("courseCategory", { required: true })}
                    defaultValue=""
                    id="courseCategory"
                    className="form-style w-full"
                >
                    <option value="" disabled>
                        Choose a Category
                    </option>
                    {!loading &&
                        courseCategories?.map((category, indx) => (
                            <option key={indx} value={category?._id}>
                                {category?.name}
                            </option>
                        ))}
                </select>
                {errors.courseCategory && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Category is required
                    </span>
                )}
            </div>
            {/* Course Tags */}
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter Tags and press Enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />
            {/* Course Thumbnail Image */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseThumbnail">
                    Course Thumbnail <sup className="text-pink-200">*</sup>
                </label>
                <input
                    type="file"
                    id="courseThumbnail"
                    name="courseImage"
                    {...register("courseImage", { required: true })}
                    className="form-style resize-x-none min-h-[130px] w-full"
                />
                {errors.courseShortDesc && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Thumbnail is required
                    </span>
                )}
            </div>
            {/* <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            /> */}
            {/* Benefits of the course */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
                    Benefits of the course <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                    id="courseBenefits"
                    placeholder="Enter benefits of the course"
                    {...register("courseBenefits", { required: true })}
                    className="form-style resize-x-none min-h-[130px] w-full"
                />
                {errors.courseBenefits && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Benefits of the course is required
                    </span>
                )}
            </div>
            {/* Requirements/Instructions */}
            <RequirmentFields
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                setValue={setValue}
                errors={errors}
                getValues={getValues}
            />
            {/* Next Button */}
            <div className="flex justify-end gap-x-2">
                {editCourse && (
                    <button
                        onClick={() => dispatch(setStep(2))}
                        disabled={loading}
                        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                    > Continue Wihout Saving
                    </button>
                )}
                <button
                    type="Submit"
                    className="bg-yellow-50 border-black py-2 px-5 rounded-lg"
                >
                    {!editCourse ? "Next" : "Save Changes"}
                    <MdNavigateNext />
                </button>
            </div>
        </form>
    )
}