import HighlightedText from "./HighlightedText";
import know_your_progress  from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTButton from "./Buttons";
function LearningLanguageSection() {
    return (
        <div className="mt-[150px] mb-32                            ">
            <div className="flex flex-col gap-5 items-center">
                <div className="text-4xl font-semibold text-center ">
                    Your Swiss Knife for
                    <HighlightedText text={"Learning Any language"}></HighlightedText>

                </div>
                <div className=" w-[75%] text-center font-medium ">
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.

                </div>
                <div className="flex flex-col lg:flex-row items-center justify-center -gap-y-[100px] ">
                    <img src={know_your_progress}
                    className="object-contain  lg:-mr-32 mb-3"  />
                    <img src={compare_with_others}
                     className="object-contain lg:mt-10 -mt-24 "  />
                    <img src={plan_your_lesson} 
                     className="object-contain lg:-ml-40 -mt-20 " />

                </div>
                <div className="w-fit">
                    <CTButton active={true} linkWith={"/signup"} >
                        <div className="">

                        Learn More 
                        </div>
                    </CTButton>
                    </div>
            </div>
        </div>
    )
}

export default LearningLanguageSection