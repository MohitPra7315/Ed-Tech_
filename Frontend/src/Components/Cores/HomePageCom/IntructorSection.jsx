
import { TiArrowRight } from "react-icons/ti"
import Intructor from "../../../assets/Images/Instructor.png"
import CTButton from "./Buttons"
import HighlightedText from "./HighlightedText"
function IntructorSection() {
    return (
        <div className="mt-[100px]  ">
            <div className="flex lg:flex-row flex-col  relative gap-20 items-center ">
                    {/* <div className=" absolute top-4 left-4 -z-1 h-full w-[45%]  bg-richblack-5">                    </div> */}
                <div className="min-w-[45%] max-h-[550px]  lg:w-[45%]">
                    <img src={Intructor} alt="" className="  shadow-white h-540 w-360 lg:w-full lg:h-full"  />
                </div>
                <div className="flex flex-col gap-10 items-start min-w-[45 %] lg:w-[50%]">
                    <div className="w-[200px] font-bold text-4xl ">
                        <div className="text-white">
                            Become an
                        </div>
                        <HighlightedText text={"Instructor"}></HighlightedText>
                    </div>
                    <div className="text-[px] text-richblack-300  w-[75%] ">
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </div>
                    <CTButton className="" active={true} linkWith={"/signup"}>
                        <div className="flex flex-row items-center justify-center  gap-2">
                            Start Teaching Today
                            <TiArrowRight className="text-[18px]"></TiArrowRight>

                        </div>
                    </CTButton>
                </div>

            </div>

        </div>
    )
}

export default IntructorSection