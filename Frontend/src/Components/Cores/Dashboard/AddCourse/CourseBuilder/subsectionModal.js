import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { createSubSection, updateSubSection } from "../../../../../services/operations/CourseDetail_Api"
import { setCourse } from "../../../../../Slices/coursesSlice"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
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
                // if (currentValues.LectureDesc !== modalData.description) {
                //     formData.append("description", currentValues.LectureDesc)
                // }
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
            formData.append("courseId", course._id)
            formData.append("title", data.LectureTitle)
            // formData.append("Description ", data.LectureDesc)
            // formData.append("timeDuration",data.timeDuration)
            formData.append("videoFile", data.Lecturevideo[0])
            console.log("Check the Data for Add SUB SECTION", data.Lecturevideo)

            setLoading(true)
            const toastId = toast.loading("Loading....")

            const result = await createSubSection(formData, token)
            console.log("Updated Course-2 ", result)

            if (result) {
                console.log("data Add Sub Section ", result)


                dispatch(setCourse(result))


            }
            toast.dismiss(toastId)
            setModalData(null)
            setLoading(false)


        }



    }



    return (

        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800" >

                <div>
                    <p>{view && "Viewing Lecture"} {add && "Adding Lecture "}  {edit && "Editing Lecture"} </p>
                    <button onClick={() => (!loading ? setModalData(null) : {})}>
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>

                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-black">
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


                    {/* <div>
                    <label htmlFor="">Select the Vedio for Upload</label>
                    <input

                        type="Number"
                        id="timeDuration"
                        name="timeDuration"
                        {
                        ...register("timeDuration", { required: true })
                        }


                    />
                    {
                        errors.timeDuration && (<span>
                            This is required
                        </span>)
                    }
                </div> */}

                    <div className="text-black">
                        <label htmlFor="Lecturevideo">Lecture VIDEO<sup>*</sup></label>
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

                    <div className="text-black">
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


                    <button

                        type="Submit"
                        className="bg-yellow-50 text-black font-bold py-2 px-5 rounded-md border-richblack-800 "
                    >
                        save


                    </button>

                </form>
            </div>

        </div>
    )
}