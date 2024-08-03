import HighlightedText from "../Components/Cores/HomePageCom/HighlightedText"

import aboutus1 from "../assets/Images/aboutus1.webp"
import aboutus2 from "../assets/Images/aboutus2.webp"
import aboutus3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"
import { LearningGrid } from "../Components/Cores/AboutUS/LearningGrid"
import { ContactUsForm } from "../Components/Cores/Contactus/ContactusForm"
import Footer from "../Components/Common/Footer"
export const About = () => {

    return (
        <div>
            {/* section */}
            <div className="bg-richblack-800 h-[618px] relative ">
                <div className="w-11/12 mx-auto absolute left-[50%] -translate-x-[50%] top-28 border-white  -mb-12  max-w-maxContent flex justify-center items-center flex-col h-full  gap-8 ">
                    <div className="text-center w-[913px] ">
                        <h1 className="text-4xl text-white font-bold">
                            Driving Innovation in Online Education for a
                            <br></br>
                            <HighlightedText text={"Brighter Future"} ></HighlightedText>
                        </h1>
                        <p className="text-richblack-300 text-[18px]">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </div>
                    <div className="flex w-full gap-6 justify-center items-center ">
                        <img src={aboutus1} width={"380px"} height={"311px"} />
                        <img src={aboutus2} width={"380px"} height={"311px"} />
                        <img src={aboutus3} width={"380px"} height={"311px"} />
                    </div>
                </div>

            </div>

            {/* section --2 */}

            <section className=" mt-28 max-w-maxContent mx-auto" >
                <p className="text-4xl  text-richblack-50 text-center w-full py-[90px] px-[90px]">
                    ''We are passionate about revolutionizing the way we learn. Our innovative platform
                    <HighlightedText className="" text={" combines technology,"} ></HighlightedText>
                    <span className="text-pink-100 font-bold">expertise ,</span>
                    and community to create an
                    <span className="text-pink-600 font-bold ">unparalleled educational experience. </span>
                    ,,
                </p>
            </section>

            {/* 3rd section */}
            <section className="flex flex-col gap-11 pb-16 ">

                <div className=" max-w-maxContent mx-auto flex justify-around ">
                    <div className=" flex flex-col gap-6 max-w-[40%] ">
                        <h1 className="text-pink-500 text-4xl font-bold">Our Founding Story </h1>
                        <p className="text-richblack-300  text-[18px] " >Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world</p>

                        <p className="text-richblack-300 text-[18px]">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <img src={FoundingStory} ></img>
                    </div>
                </div>
                <div className=" max-w-maxContent mx-auto flex justify-around">
                    <div className=" flex flex-col gap-6 max-w-[40%] ">
                        <h1 className="text-yellow-300 text-4xl font-bold">Our Founding Story </h1>

                        <p className="text-richblack-300 text-[18px] " >With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>

                    </div>
                    <div className=" flex flex-col gap-6 max-w-[40%] ">
                        <h1 className="text-blue-200 text-4xl font-bold">Our Founding Story </h1>

                        <p className="text-richblack-300 text-[18px] " >our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>

                    </div>

                </div>
            </section>


            {/* section 4th */}
            <section className="w-full  mx-auto py-[90px] px-[120px] flex justify-evenly bg-richblack-800">
                <div className="text-center flex flex-col gap-3">

                    <h1 className="text-4xl font-bold  text-white">5K</h1>
                    <p className="text-[15px] font-bold text-richblack-300">Active Students</p>
                </div>
                <div className="text-center flex flex-col gap-3" >
                    <h1 className="text-4xl font-bold text-white">10+</h1>
                    <p className="text-[15px] font-bold text-richblack-300">Mentors</p>
                </div>
                <div className="text-center flex flex-col gap-3">
                    <h1 className="text-4xl font-bold text-white" >200+</h1>
                    <p className="text-[15px] font-bold text-richblack-300">Courses</p>
                </div>
                <div className="text-center flex flex-col gap-3">
                    <h1 className="text-4xl font-bold text-white">50+</h1>
                    <p className="text-[15px] font-bold text-richblack-300">Awards</p>
                </div>
            </section>

            <section className="text-white">
                <LearningGrid></LearningGrid>
                <ContactUsForm></ContactUsForm>
            </section>
            {/* slider */}
            
            <section className="w-full  mx-auto">
                <Footer></Footer>
            </section>
        </div>
    )
}