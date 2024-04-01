import { useSelector } from "react-redux"
import { RatingStars } from "../../Common/RatingStar"
import { useForm } from "react-hook-form"
import { createRating } from "../../../services/operations/CourseDetail_Api"
import { useParams } from "react-router-dom"
const ReviewForm = ({ setActive }) => {

    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { course } = useSelector((state) => state.course)
    const { register, getValues, setValue, formState: { errors }, handleSubmit } = useForm()
    const { courseId } = useParams()
    console.log("courseExperience", courseId)
    const onSubmit = async (Data) => {

        const res = await createRating({
            courseID: courseId,
            rating: 3,
            review: Data.courseExperience
        }, token)
        console.log("response", res)
        setValue("courseExperience", "")



    }

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">

            <div className="w-[600px] bg-richblack-800  rounded-t-lg flex flex-col gap-5 pb-10 ">
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5 ">
                    <p className="text-xl font-semibold text-richblack-5">Review</p>
                    <button
                        onClick={() => setActive(false)}
                    >close</button>
                </div>
                <div className="">
                    <div className="flex w-full justify-center items-center my-5">
                        <img src={user?.image}
                            alt="imag"
                            className=" w-[70px] rounded-full aspect-square"
                        />
                        <div>
                            <p className="text-white text-3xl">{user.firstName}{user.lastName}</p>
                            <p className="text-white ">Posting policy</p>
                        </div>
                    </div>

                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex w- flex-col justify-center items-center gap-3">
                    <div>
                        <RatingStars Review_Count={3.4}

                        />
                    </div>
                    <div className="flex w-11/12 flex-col space-y-2">
                        <label
                            className="text-sm text-richblack-5"
                            htmlFor="courseExperience"
                        >
                            Add Your Experience <sup className="text-pink-200">*</sup>
                        </label>
                        <textarea
                            id="courseExperience"
                            placeholder="Add Your Experience"
                            {...register("courseExperience", { required: true })}
                            className="form-style resize-x-none min-h-[130px] w-full text-white border-richblack-700 bg-richblack-600 rounded-md"
                        />
                        {errors.courseExperience && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Please Add Your Experience
                            </span>
                        )}
                    </div>
                    <div className="flex w-full gap-x-5 justify-end px-8">
                        <button className="text-xl bg-transparent border-richblack-50 border-2 text-richblack-5 py-2 px-3 rounded-md" onClick={() => setActive(false)}>Cancel</button>
                        <button type="submit" className="text-xl bg-yellow-50 py-2 px-3 rounded-md">save</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
export default ReviewForm