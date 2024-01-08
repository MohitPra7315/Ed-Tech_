import { Link } from "react-router-dom"
import { TiArrowRight } from "react-icons/ti";
import HighlightedText from "../Components/Cores/HomePageCom/HighlightedText"
import CTButton from "../Components/Cores/HomePageCom/Buttons";
import CodeBlocks from "../Components/Cores/HomePageCom/CodeBlocks"
import Banner from "../assets/Images/banner.mp4"
import TimelineSection from "../Components/Cores/HomePageCom/TimeTable";
import LearningLanguageSection from "../Components/Cores/HomePageCom/LearningLanguageSection";
import IntructorSection from "../Components/Cores/HomePageCom/IntructorSection";
import Footer from "../Components/Common/Footer";
import ExploreMore from "../Components/Cores/HomePageCom/exploreMore";
function HomePage() {

    return (
        <div>
            {/* section 1 */}
            <div className="relative mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between text-white">

                {/* button  */}
                <div className="flex items-center flex-col">

                    <Link to={"/signup"}>
                        <div className="group  mt-16 mx-auto p-1 rounded-full bg-richblack-800 font-bold shadow-2xl shadow-richblack-700 text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
                            <div className="flex flex-row items-center  gap-2 rounded-full px-10  py-[5px] group-hover:bg-richblack-900">
                                <p>Become an Instructor</p>
                                <TiArrowRight className="text-2xl"></TiArrowRight>
                            </div>
                        </div>
                    </Link>
                    <div className="text-4xl font-semibold text-center mt-6 ">
                        Empower Your Future with
                        <HighlightedText text={"Coding Skills"}></HighlightedText>
                    </div>

                    <div className="text-richblack-300 text-center text-lg font-bold w-[90%] mt-4">
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                    </div>

                    <div className="flex flex-row mt-4 gap-8">
                        <CTButton active={true} linkWith={"/signup"} >Learn More</CTButton>
                        <CTButton active={false} linkWith={"/login"}>Book a Demo</CTButton>
                    </div>
                </div>
                {/* vedios section */}
                <div className="relative w-full border-l-caribbeangreen-5 mt-7 ">

                    {/* <div className="absolute z-10 shadow-blue-100 -my-52 shadow-2xl w-[600px] rounded-full rotate-180 bg-white top-16  left-96 h-[400px]"></div> */}
                    <div className="  w-full h-full  z-10 mx-3 my-0 shadow-blue-200 shadow-lg">
                        <video loop muted autoPlay>
                            <source src={Banner} />
                        </video>
                    </div>

                </div>

                {/* CodeBlocks--1 */}
                <div>
                    <CodeBlocks
                        postion={`lg:flex-row`}
                        Subheading={
                            <p>Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</p>
                        }
                        heading={<div className="text-4xl">Unlock Your  <HighlightedText text={"Coding Potiential   "}></HighlightedText>
                            With our online Courses
                        </div>}
                        CtaBtn1={{
                            Text: `try it Yourself`,
                            linkWith: `/signup`,
                            active: true

                        }}

                        CtaBtn2={{
                            Text: `learn More`,
                            linkWith: `/login`,
                            active: false

                        }}
                        CodeBlock={`<!DOCTYPE html>
                         <html>
                          head><title>Example</title>
                          <linkrel="stylesheet"href="sty
                          les.css">
                          /head>
                          body>
                          h1><ahref="/">Header</a>/h1>nav>
                          <ahref="one/">One</a><ahref="two/">Two</a>
                          <ahref="three/">Three</a>/nav>`}
                        backgroundGraident={""}
                        codeColor={"text-richblue-100 "}
                    />

                </div>

                {/*2 second blocks */}
                <div>

                    <CodeBlocks
                        postion={`lg:flex-row-reverse`}
                        Subheading={
                            <p>Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.</p>
                        }
                        heading={<div className="text-4xl w">Start  <HighlightedText text={"Coding in seconds   "}></HighlightedText>

                        </div>}
                        CtaBtn1={{
                            Text: `Continue lesson`,
                            linkWith: `/signup`,
                            active: true

                        }}

                        CtaBtn2={{
                            Text: `learn More`,
                            linkWith: `/login`,
                            active: false

                        }}
                        CodeBlock={`<!DOCTYPE html>
                         <html>
                          head><title>Example</title>
                          <linkrel="stylesheet"href="styles.css">
                          /head>
                          body>
                          h1><ahref="/">Header</a>/h1>nav>
                          <ahref="one/">One</a><ahref="two/">Two</a>
                          <ahref="three/">Three</a>/nav>`}
                        backgroundGraident={""}
                        codeColor={"text-richblue-100 "}
                    />

                </div>

                <div>
                    <ExploreMore />
                </div>

            </div>
            {/* section 2  white section*/}

            <div className="bg-pure-greys-5 ">

                <div className="homePage_bg  h-[310px] flex justify-center items-center">
                    <div className="h-[150px]">

                    </div>
                    <div className=" w-11/12 max-w-maxContent lg:w-[100%] flex flex-row justify-center gap-4 items-center ">
                        <CTButton active={true} linkWith={"sigup"} >

                            <div className="flex  justify-center items-center gap-3">
                                pagal h k
                                <TiArrowRight className="text-[18px]"></TiArrowRight>
                            </div>
                        </CTButton>
                        <CTButton active={false} linkWith={"/signup"} >
                            Learn More
                        </CTButton>
                    </div>

                </div>

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-center">
                    <div className="flex lg:flex-row gap-5 mt-[60px] flex-col  ">
                        <div className="text-4xl font-semibold min-w-[45%] ">
                            Get the skills you need for a
                            <HighlightedText text={"job in demand"} ></HighlightedText>
                        </div>
                        <div className="flex flex-col gap-10 min-w-[45%] items-start">
                            <div className="text-[16px]">

                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTButton active={true} linkWith={"/signup"}>
                                Learn More
                            </CTButton>

                        </div>
                    </div>
                    <div className="">

                    <TimelineSection />
                    <LearningLanguageSection />
                    </div>

                </div>
            </div>

            {/* section 3 */}
            <div className="w-11/12 mx-auto max-w-maxContent flex flex-col justify-center items-center">
                <IntructorSection></IntructorSection>
                <h2 className="text-center  text-4xl font-semibold mt-10">reviews from other learners</h2>

            </div>
            {/* Footer*/}
            <Footer />

        </div >
    )
}
export default HomePage
