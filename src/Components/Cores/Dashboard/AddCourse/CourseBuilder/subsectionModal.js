import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { createSubSection, updateSubSection } from "../../../../../services/operations/CourseDetail_Api"
import { setCourse } from "../../../../../Slices/coursesSlice"
import { toast } from "react-hot-toast"
import Upload from "../CourseInformation/Upload"

export const SubsectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false
}) => {

    const { register, setValue, getValues, formState: { errors }, handleSubmit } = useForm()

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)

    console.log("Upload ", Upload)
    useEffect(() => {
        if (view || edit) {
            setValue("LectureTitle", modalData?.title)
            setValue("LectureDesc", modalData?.description)
            setValue("Lecturevideo", modalData?.videoUrl)

        }
    }, [])


    const isFormUpdated = () => {
        const currentValues = getValues()
        if (currentValues.LectureTitle !== modalData?.title ||
            currentValues.LectureDesc !== modalData?.description ||
            currentValues.Lecturevideo !== modalData?.videoUrl
        ) {
            return true
        }
        else {
            return false
        }
    }


    const onSubmit = async (data) => {
        if (view) {
            return
        }
        if (edit) {
            if (isFormUpdated()) {
                const currentValues = getValues();

                const formData = new FormData()
                console.log("data check", data)
                formData.append("sectionId", modalData?.sectionId)
                formData.append("subSectionId", modalData._id)
                if (currentValues.LectureTitle !== modalData.title) {
                    formData.append("title", currentValues.LectureTitle)
                }
                if (currentValues.LectureDesc !== modalData.description) {
                    formData.append("description", currentValues.LectureDesc)
                }
                if (currentValues.Lecturevideo !== modalData.videoUrl) {
                    formData.append("vidio", currentValues.Lecturevideo)
                }
                setLoading(true)
                const toastId = toast.loading("Loading....")
                const result = await updateSubSection(formData, token)
                if (result) {
                    const subSection = course?.courseContent.map((section) =>
                        section.id === modalData.sectionId ? result : section)
                    const UpdatedCourse = { ...course, courseContent: subSection }
                    dispatch(setCourse(UpdatedCourse))
                }
                setLoading(false)
                toast.dismiss(toastId)
                setModalData(null)

            } else {
                toast.error("No changes made to the form")
            }
            return
        }

        if (add) {
            const formData = new FormData();
            formData.append("sectionId", modalData)
            formData.append("title", data.LectureTitle)
            formData.append("description ", data.LectureDesc)
            formData.append("video", data.Lecturevideo)
            setLoading(true)
            const toastId = toast.loading("Loading....")

            const result = await createSubSection(formData, token)

            if (result) {
                const subSection = course?.courseContent.map((section) =>
                    section.id === modalData.sectionId ? result : section)
                const UpdatedCourse = { ...course, courseContent: subSection }
                dispatch(setCourse(UpdatedCourse))

            }
            setLoading(false)
            toast.dismiss(toastId)
            setModalData(null)



        }



    }



    return (
        <div>
            <div>
                <p>{view && "Viewing Lecture"} {add && "Adding Lecture "}  {edit && "Editing Lecture"} </p>
                <button onClick={() => !loading ? setModalData(null) : ""}>

                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="LectureTitle">Lecture Title<sup>*</sup></label>
                    <input id="LectureTitle"
                        name="LectureTitle"
                        placeholder="Emter the Lecture  Title"
                        {...register("LectureTitle", { required: true })}
                        className="w-full"
                    />
                    {
                        errors.LectureTitle && (<span>This is Required</span>)
                    }
                </div>
                {/* <Upload
                    label="Lecture Video"
                    name="Lecturevideo"
                    video={true}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                    viewData={view ? modalData?.videoUrl : null}
                    addData={add ? modalData?.videoUrl : null}

                /> */}

                <div>
                    <label htmlFor="Lecturevideo">Lecture Description<sup>*</sup></label>
                    <input id="Lecturevideo"
                        name="Lecturevideo"
                        type="file"
                        placeholder="Emter the Lecture  Title"
                        {...register("Lecturevideo", { required: true })}
                        className="w-full"
                    />
                    {
                        errors.LectureDesc && (<span>This is Required</span>)
                    }
                </div>

                <div>
                    <label htmlFor="LectureDesc">Lecture Description<sup>*</sup></label>
                    <input id="LectureDesc"
                        name="LectureDesc"
                        placeholder="Emter the Lecture  Title"
                        {...register("LectureDesc", { required: true })}
                        className="w-full"
                    />
                    {
                        errors.LectureDesc && (<span>This is Required</span>)
                    }
                </div>



            </form>

        </div>
    )
}