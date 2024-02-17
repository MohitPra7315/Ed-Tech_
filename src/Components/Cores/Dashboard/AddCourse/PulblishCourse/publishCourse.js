import { useForm } from "react-hook-form"
import { IconBtn } from "../../../../Common/IconBtn"
import { useSelector, useDispatch } from "react-redux"
import { resetCourseState, setStep } from "../../../../../Slices/coursesSlice"
import { COURSE_STATUS } from "../../../../../utils/constant"
import { useEffect, useState } from "react"
import { editCourseDetails } from "../../../../../services/operations/CourseDetail_Api"
import { useNavigate } from "react-router-dom"
export const PublishCourse = () => {

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm()
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const goBackHandle = () => {
        dispatch(setStep(2))
    }

    const goToCoursePage = () => {
        dispatch(resetCourseState())
        // Go to My course page
        navigate("/dashboard/my-courses")
    }

    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true);
        }
    }, []);

    const handleCoursePublish = async () => {

        if (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
            (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
            // no Updation in Form
            // no need to make api call
            console.log(" no need to make api call STEP-1")
            goToCoursePage()
            console.log(" no need to make api call   STEP-2")

            return
        }
        // if Form Upadated
        console.log(" no need to make api call STEP-3")

        const formData = new FormData()
        formData.append("courseId", course._id)
        console.log("Course ID ", course._id)
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        console.log("Course Status:", courseStatus);

        formData.append("status", courseStatus);
        console.log("Form Data:", formData.getAll("status"));

        console.log(" no need to make api call STEP-4", formData.entries(formData))

        setLoading(true)
        const result = await editCourseDetails(formData, token)
        console.log(" no need to make api call STEP-5")

        if (result) {
            console.log(" no need to make api call STEP-6")

            goToCoursePage()
        }
        setLoading(false)
    }
    const onSubmit = () => {

        handleCoursePublish()

    }
    return (
        <div className="text-white">
            <p className="text-3xl">Publish Course</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex">

                <div className="">

                    <label htmlFor="public">
                        <input
                            type="checkbox"
                            name="public"
                            id="public"
                            {
                            ...register("public", { required: true })
                            }
                        />
                        <span className="ml-3">Make this Course Public</span>
                    </label>

                </div>
                <div>
                    <button
                        className="py-2 px-5 text-white"
                        disabled={loading}
                        onClick={() => goBackHandle}>
                        BAck
                    </button>
                    <IconBtn disabled={loading} text="save change"></IconBtn>
                </div>
            </form>

        </div>
    )
}

