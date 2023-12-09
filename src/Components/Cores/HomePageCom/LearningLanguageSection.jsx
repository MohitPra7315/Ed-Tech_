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
                <div className="flex flex-row items-center justify-center mt-5 ">
                    <img src={know_your_progress}
                    className="object-contain  -mr-32"  />
                    <img src={compare_with_others}
                     className="object-contain mt-10 "  />
                    <img src={plan_your_lesson} 
                     className="object-contain -ml-40 " />

                </div>
                <div className="w-fit">
                    <CTButton active={true} linkWith={"/signup"} >
                        <div className="font-bold">

                        Learn More 
                        </div>
                    </CTButton>
                    </div>
            </div>
        </div>
    )
}

export default LearningLanguageSection