import React from "react"
// import HighlightedText from "../Components/Cores/HomePageCom/HighlightedText"
import CTButton from "./Buttons"
import { TiArrowRight } from "react-icons/ti";
import { TypeAnimation } from "react-type-animation"

function CodeBlocks({ heading, Subheading, postion, CtaBtn1, CtaBtn2, CodeBlock, backgroundGraident, codeColor }) {
    return (
        <div className={`flex ${postion} my-20 gap-10 justify-between items-center flex-col lg:flex-row `}>
            {/* section --1 */}
            <div className="min-w-[50%]  lg:max-w-[50%] flex flex-col gap-8 font-semibold  items-center ">
                {heading}
                <div className="text-black font-bold">
                    {Subheading}
                </div>
                {/* buttons */}
                <div className="flex gap-10 items-center ">
                    <div className="flex gap-7 my-10  ">

                        <CTButton active={CtaBtn1.active} linkWith={CtaBtn1.linkWith} >
                            <div className=" flex flex-row  items-center py-[1px] px-5  ">
                                {CtaBtn1.Text}
                                <TiArrowRight></TiArrowRight>
                            </div>
                        </CTButton>

                        <CTButton active={CtaBtn2.active} linkWith={CtaBtn2.linkWith}>
                            {CtaBtn2.Text}
                        </CTButton>
                    </div>
                </div>
            </div>

            {/* section--2*/}
            <div className="relative w-[100%] flex flex-row rounded-md max-w-[500px] lg:w-[500px] bg-richgray-50  border-2 border-richblack-200   ">
                {/* <div className={` absolute z-1  h-[100%] w-[75%] -top-10 -left-5 bg-gradient-to-r bg-richblack-5 rounded-full `}></div> */}
                <div className=" relative  z-5  flex   ">

                    <div className="w-[10%] flex items-center bg-transparent  text-richblack-900 font-inter font-bold flex-col ">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>

                    </div>
                    <div className={`w-[90%] font-bold flex flex-col  font-mono bg-transparent ${codeColor} pr-2`}>
                        <TypeAnimation
                            sequence={[CodeBlock, 1000, " "]}
                            speed={50}
                            style={{

                                whiteSpace: 'pre-line',
                                display: "block"
                            }}
                            omitDeletionAnimation={true}
                            repeat={Infinity}
                        />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CodeBlocks;