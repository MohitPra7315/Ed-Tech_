import { useSelector } from "react-redux"
import { FaCheck } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { CourseInformation } from "./CourseInformation/CourseInformation"
import {CourseBuilder} from "./CourseBuilder/CourseBuilder"
export const RenderAddcourses = () => {
    const { step } = useSelector((state) => state.course)

    const steps = [
        {
            id: "1",
            title: "Course Information"
        },
        {
            id: "2",
            title: "Course Builder "
        },
        {
            id: "3",
            title: "Publish"
        }
    ]


    return (
        <div className="w-full">
            {/* steps for  */}
            <div>
                {
                    steps.map((item) => {
                        return (
                            <>
                                <div className="w-full">
                                    <div key={item.id} className={`${item.id === step ?
                                        "bg-yellow-900  border-yellow-50 rounded-full text-yellow-50" :
                                        "bg-richblack-800 border-richblack-700 text-richblack-300"}`}>
                                        {
                                            step > item.id ? (<FaCheck></FaCheck>) : (<p>{item.id}</p>)
                                        }

                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
            <div>
                {
                    steps.map((item) => {
                        return (
                            <div key={item.id}
                            >
                                <p>
                                    {item.title}
                                </p>

                            </div>
                        )
                    })
                }
            </div>
            {/* section 2  */}

            <div>
                {
                    step == 1 && (<CourseInformation />)
                }
                {
                    // step === 2 && (<CourseBuilder />)
                }
            </div>
        </div>
    )
}