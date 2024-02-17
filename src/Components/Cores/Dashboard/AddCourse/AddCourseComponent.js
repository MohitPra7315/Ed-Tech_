import { useSelector } from "react-redux"
import { FaCheck } from "react-icons/fa"

import { CourseInformation } from "./CourseInformation/CourseInformation"
import CourseBuilderForm from "./CourseBuilder/CourseBuilder"
import { PublishCourse } from "./PulblishCourse/publishCourse"
export const RenderAddcourses = () => {
    const { step } = useSelector((state) => state.course)

    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder "
        },
        {
            id: 3,
            title: "Publish"
        }
    ]


    return (
        <div>
            <div className="relative mb-2 flex w-full justify-center">
                {steps.map((item) => (
                    <>
                        <div
                            className="flex flex-col items-center "
                            key={item.id}
                        >
                            <button
                                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${step === item.id
                                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                                    : "border-richblack-700 bg-richblack-800 text-richblack-300"}
                                    ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
                            >
                                {step > item.id ? (
                                    <FaCheck className="font-bold text-richblack-900" />
                                ) : (
                                    item.id
                                )}
                            </button>

                        </div>
                        {item.id !== steps.length && (
                            <>
                                <div
                                    className={`h-[calc(34px/3)] w-[33%]  border-dashed border-b-2 ${step > item.id ? "border-yellow-50" : "border-richblack-500"
                                        } `}
                                ></div>
                            </>
                        )}
                    </>
                ))}
            </div>

            <div className="relative mb-16 flex w-full select-none justify-between">
                {steps.map((item) => (
                    <>
                        <div
                            className="flex min-w-[130px] flex-col items-center gap-y-2"
                            key={item.id}
                        >

                            <p
                                className={`text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-500"
                                    }`}
                            >
                                {item.title}
                            </p>
                        </div>

                    </>
                ))}
            </div>
            {/* Render specific component based on current step */}
            {step == 1 && <CourseInformation />}
            {step == 2 && <CourseBuilderForm />}
            {step == 3 && <PublishCourse />}
        </div>
        // <div className="">
        //     {/* steps for  */}
        //     <div className="relative mb-2 flex w-full justify-center">
        //         {
        //             steps.map((item) => {
        //                 return (
        //                     <>
        //                         <div className=" flex flex-col items-center  " key={item.id}>
        //                             <button className={`${item.id === step ?
        //                                 "bg-yellow-900  border-yellow-50 rounded-full text-yellow-50" :
        //                                 "bg-richblack-800 border-richblack-700 text-richblack-300"}`}>
        //                                 {step > item.id ? (
        //                                     <FaCheck className="font-bold text-richblack-900" />
        //                                 ) : (
        //                                     item.id
        //                                 )}
        //                             </button>
        //                         </div>
        //                         {item.id !== steps.length && (
        //                             <>
        //                                 <div
        //                                     className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${step > item.id ? "border-yellow-50" : "border-richblack-500"
        //                                         } `}
        //                                 ></div>
        //                             </>
        //                         )}
        //                     </>
        //                 )
        //             })
        //         }
        //     </div>
        //     <div className="relative mb-16 flex w-full select-none justify-between">
        //         {
        //             steps.map((item) => {
        //                 return (
        //                     <div key={item.id}
        //                     >
        //                         <p>
        //                             {item.title}
        //                         </p>

        //                     </div>
        //                 )
        //             })
        //         }
        //     </div>
        //     {/* section 2  */}

        //     <div>
        //         {
        //             step == 1 && (<CourseInformation />)
        //         }
        //         {
        //             step == 2 && (<CourseBuilder></CourseBuilder>)
        //         }
        //     </div>
        // </div>
    )
}