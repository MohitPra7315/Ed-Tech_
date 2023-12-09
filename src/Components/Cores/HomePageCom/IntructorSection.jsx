
import { TiArrowRight } from "react-icons/ti"
import Intructor from "../../../assets/Images/Instructor.png"
import CTButton from "./Buttons"
import HighlightedText from "./HighlightedText"
function IntructorSection() {
    return (
        <div className="mt-[100px]  ">
            <div className="flex flex-row gap-20 items-center ">
                <div className="w-[45%]">
                    <img src={Intructor} alt="" className="shadow-white" />
                </div>
                <div className="flex flex-col gap-10 items-start w-[50%]">
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