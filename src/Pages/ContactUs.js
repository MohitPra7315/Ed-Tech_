import react from "react"
import Footer from "../Components/Common/Footer"
import { ContactUsForm } from "../Components/Cores/Contactus/ContactusForm"
import { LuMessagesSquare } from "react-icons/lu";
import { BiWorld } from "react-icons/bi";
import { IoCall } from "react-icons/io5";
export const ContactUs = () => {


    // const data = [
    //     {
    //         logo: <LuMessagesSquare></LuMessagesSquare>,
    //         heading: "call us",
    //         para: ""
    //     }
    // ]
    return (
        <div className=" w-full    ">
            <div className="w-11/12 max-w-maxContent mx-auto  flex  justify-between pt-20 rounded-lg" >
                {/* section 1 */}
                <div className="text-white h-fit w-[450px] flex flex-col p-[54px] bg-richblack-800 rounded-lg gap-7">
                    <div className="flex  items-start">

                        <LuMessagesSquare className="w-[40px]"></LuMessagesSquare>
                        <div>
                            <h1 className="font bold text-xl font-inter">Chat on us</h1>
                            <p className=" font-inter  text-richblack-300">Our friendly team is here to help.</p>
                            <p className=" font-inter  text-richblack-300">@mail address</p>
                        </div>

                    </div>
                    <div className="flex ">
                        <BiWorld className="w-[40px] "></BiWorld>
                        <div>
                            <h1 className="font bold text-xl font-inter">Visit us</h1>
                            <p className=" font-inter text-richblack-300 ">Come and say hello at our office HQ.</p>
                            <p className=" font-inter  text-richblack-300">Here is the location/ address</p>
                        </div>

                    </div>
                    <div className="flex ">
                        <IoCall className="w-[40px]"></IoCall>
                        <div>
                            <h1 className="font bold text-xl font-inter">Call us</h1>
                            <p className=" font-inter  text-richblack-300">Mon - Fri From 8am to 5pm</p>
                            <p className=" font-inter  text-richblack-300">+123 456 7890</p>
                        </div>

                    </div>
                </div>
                <div className="border p-[90px] border-richblack-300 rounded-lg">
                    <ContactUsForm></ContactUsForm>
                </div>
            </div>
            {/* section -2 */}
            <div>      <br></br>
                <br></br>

            </div>
            {/* section-3 Footer */}
            <div className="w-full">
                <Footer></Footer>
            </div>
        </div>
    )
}