import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import CountryCode from "../../../data/countrycode.json"
import CTButton from "../HomePageCom/Buttons";
import toast from "react-hot-toast";

export const ContactUsForm = ({ heading, subheading }) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const [loading, setLoading] = useState(false)
    const ContactData = async (data) => {
        const toastId = toast.loading("Loading...")
        setLoading(true)
        try {

            const response = { sucess: "OK" }
            console.log("response", response)
        } catch (error) {

            console.error('error', error)
        }
        toast.dismiss(toastId)
        setLoading(false)


    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(
                // firstName = "",
                // lastName = "",
                // email = "",
                // phone = "",
                // message = ""
            )
        }

    }, [reset, isSubmitSuccessful])
    return (
        <div className="w-11/12 max-w-maxContent pt-10 mx-auto flex  flex-col gap-4 justify-center items-center">
            <h1 className="text-3xl font-bold text-white">Get in Touch</h1>
            <p className="text-richblack-300">We’d love to here for you, Please fill out this form.</p>

            <form
                onSubmit={handleSubmit(ContactData)}
                className="flex flex-col gap-4">
                <div className="flex   gap-7">
                    {/* First NAme field */}
                    <div className="flex flex-col">
                        <label htmlFor="fName" >
                            First Name
                        </label>
                        <input
                            className="bg-richblack-800 px-4 py-2 rounded-md border-b border-richblack-200"
                            type="text"
                            id="fName"
                            placeholder="First Name"
                            name="fName"
                            {
                            ...register("fName", { required: true })
                            }
                        />
                        {
                            errors.fName && (<span>
                                Please Enter First Name
                            </span>)
                        }

                    </div>
                    {/* LAst Name */}
                    <div className="flex flex-col">
                        <label htmlFor="lName" >
                            Last Name
                        </label>
                        <input
                            className="bg-richblack-800 px-4 py-2 rounded-md border-b border-richblack-200"
                            type="text"
                            id="lName"
                            placeholder="Last Name"
                            name="lName"
                            {
                            ...register("lName", { required: true })
                            }
                        />
                        {
                            errors.lName && (<span>
                                Please Enter Last Name
                            </span>)
                        }


                    </div>

                </div>
                {/* email section */}
                <div className="w-full flex flex-col">
                    <label htmlFor="email">Email Address</label>
                    <input
                        className="bg-richblack-800 px-4 py-2 rounded-md border-b border-richblack-200"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email address"
                        {
                        ...register("email", { required: true })
                        }
                    />
                    {
                        errors.email && (<span>
                            please fill the Email
                        </span>)
                    }

                </div>
                {/* phone Number section */}
                <div className="flex flex-col ">
                    <label htmlFor="PhoneNumber">Phone Number</label>
                    <div className="flex gap-5" >
                        {/* dropDown */}
                        <select className="bg-richblack-800 text-white w-[90px] border-b border-richblack-200  rounded-lg"
                            name="PhoneNumber"
                            id="PhoneNumber"

                            {
                            ...register("countryCode", { required: true })
                            }
                        >
                            {
                                CountryCode.map((elment, index) => {
                                    return (
                                        <option key={index}>{elment.code}-{elment.country}</option>
                                    )
                                })
                            }


                        </select>
                        {/* Number section */}

                        <div className="w-full">
                            <input
                                className="w-full bg-richblack-800 rounded-lg border-b border-richblack-200 text-white p-2"
                                type="Number"
                                name="Number"
                                id="Number"
                                placeholder="12345 67890"
                                {...register("ContactNumber", { required: true })}

                            />
                            {
                                errors.PhoneNumber && (<span>please fill the Number</span>)
                            }
                        </div>

                    </div>


                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor="message">Email Address</label>
                    <textarea
                        className="bg-richblack-800 px-4 py-2 rounded-md border-b border-richblack-200"
                        type="text"
                        name="message"
                        id="message"
                        cols="30"
                        rows="7"
                        placeholder="message"
                        {
                        ...register("message", { required: true })
                        }
                    />
                    {
                        errors.message && (<span>
                            please fill the message
                        </span>)
                    }

                </div>
                <button type="submit" className="bg-yellow-100 p-2 text-black rounded-lg font-bold" >Send Message</button>
            </form>

        </div>
    )
}