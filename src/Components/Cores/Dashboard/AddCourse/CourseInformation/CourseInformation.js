import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import FetchAllCourseCategory from "../../../../../services/operations/CourseDetail_Api"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { ChipInput } from './ChipInput';
import { Upload } from '../Upload';
import RequirmentFields from "../requirmentField"
import { IconBtn } from "../../../../Common/IconBtn"
export const CourseInformation = () => {

    const { course, editCourse } = useSelector((state) => state.course)
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)
    const [allCoursecategory, setAllCourseCategory] = useState()
    console.log("Course redux", allCoursecategory)

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
            try {
                const AllCategory = await FetchAllCourseCategory();
                if (AllCategory.length > 0) {

                    setAllCourseCategory(AllCategory)
                }
                console.log("Data is ther ", AllCategory)
            } catch (error) {
                console.error("faat gya code", error.message)
            }
            setLoading(false)

        }


        if (editCourse) {
            setValue("courseTitle", course.courseName)
            setValue("courseDesc", course.courseDescription)
            setValue("coursePrice", course.Price)
            setValue("courseCategory", course.Category)
            setValue("courseTag", course.tag)
            setValue("courseImage", course.thumbnail)
            setValue("courseBenifits", course.whatYouWillLearn)
            setValue("courseRequirement", course.instructions)


        }
        getCategories();
    }, [])


    const isFormUpdated = () => {
        const CurrentValue = getValues()
        if (CurrentValue.courseTitle !== course.courseName ||
            CurrentValue.courseDesc !== course.courseDescription ||
            CurrentValue.coursePrice !== course.price ||
            CurrentValue.courseCategory !== course.Category ||
            // CurrentValue.Tags||
            // CurrentValue.courseImage !== course.thumbnail ||
            CurrentValue.courseBenifits !== course.whatYouWillLearn ||
            CurrentValue.courseRequirement.toString() !== course.instructions.toString

        ) {
            return true
        }
        else {
            return false
        }



    }


    const onsubmit = async (data) => {
        console.log("data course 76 ", course.courseName)


        if (editCourse) {
            const formData = new FormData()
            const currentValues = getValues()
            formData.append("courseId", course._id)

            if (currentValues.courseTitle !== course.courseName) {
                formData.append("courseName", data.courseName)
            }
            if (currentValues.courseDesc !== course.courseDescription) {
                formData.append("courseDesc", data.courseDesc)
            }
            if (currentValues.coursePrice !== course.price) {
                formData.append("Price", data.coursePrice)
            }
            if (currentValues.courseCategory._id !== course.Category._id) {
                formData.append("Category", data.courseCategory)
            }
            if (currentValues.courseBenifits !== course.whatYouWillLearn) {
                formData.append("courseBenifits", data.courseBenifits)
            }
            if (currentValues.courseRequirement.toString() !== course.instructions.toString()) {
                formData.append("instructions", data.courseRequirement)
            }

        }



    }


    return (
        <form className="w-11/12   gap-y-5    bg-richblack-700 mx-auto  flex flex-col "
            onSubmit={handleSubmit(onsubmit)}
        >




            <div className="flex flex-col">
                <label htmlFor="courseTitle">Course Title </label>
                <input type="text"

                    className="bg-richblack-800 text-white"
                    id="courseTitle"
                    placeholder="Enter Course Title"
                    {
                    ...register("courseTitle", {
                        required: true,
                    })
                    }
                />
                {
                    errors.courseTitle && (
                        <span>Course title required</span>)

                }


            </div>

            <div className="flex flex-col ">
                <label>Course Short Description *
                </label>
                <input type="text"
                    className="bg-richblack-800 text-white"
                    placeholder="Enter Description"
                    {
                    ...register("courseDesc", {
                        required: true,
                    })
                    }
                />
                {
                    errors.courseDesc && (
                        <span>Course Desciption is Required</span>
                    )
                }

            </div>
            <div className="relative flex flex-col">

                <label>Price *
                </label>
                <div>
                    <input type="text"
                        className="bg-richblack-800 text-white"
                        placeholder="Enter Course Price"
                        {
                        ...register("price", {
                            required: true,
                            defaultValue: ""
                        })
                        }
                    />
                    <HiOutlineCurrencyRupee className=" top-1/2 absolute text-black"></HiOutlineCurrencyRupee>
                </div>
                {
                    errors.courseDesc && (
                        <span>Course Desciption is Required</span>
                    )
                }
            </div>

            <div className="flex flex-col ">
                <label htmlFor="Cat"> Category  *
                </label>

                <select id="Cat" className="bg-richblack-800 text-white"

                    {
                    ...register("courseCategory", { required: true })
                    }>

                    <option value="" disabled  >Chosse the Category</option>
                    {
                        allCoursecategory && allCoursecategory.map((Category, index) => {
                            return (
                                <option className="text-white text-3xl" key={index} value={Category._id}>{Category?.className}</option>

                            )
                        })
                    }

                </select>
                {

                    errors.courseCategory && (
                        <span>Category is required</span>
                    )
                }
            </div>


            {/* <ChipInput
                label="Tag"
                name="courseTag"
                placeholder="Choose a Tag"
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
            >

            </ChipInput> */}


            <Upload
                label="Thumbnail"
                name="courseThumbnail"
                // placeholder="Upload"
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}

            >
            </Upload>

            <RequirmentFields
                name="courseRequirement"
                label="Requirements/Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}

            />

            <div>
                {
                    editCourse && (
                        <button

                        >
                            Continue Without Saving
                        </button>
                    )

                }
                <IconBtn text={editCourse ? "save changes" : "Next"} active={true}

                ></IconBtn>
            </div>

        </form  >
    )
}