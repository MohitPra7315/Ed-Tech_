import CTButton from "../HomePageCom/Buttons"
import HighlightedText from "../HomePageCom/HighlightedText"




const LearningGridDatadArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        hightlightedText: "Anyone,Anywhere",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide",
        BtnLink: "/"
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description: "The learning process uses the namely online and offline.",
    }, {
        order: 3,
        heading: "Certification",
        description: "You will get a certificate that can be used as a certification during job hunting.",
    }, {
        order: 4,
        heading: ` Rating "Auto-grading"`,
        description: "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    }, {
        order: 5,
        heading: "Ready to Work",
        description: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
    }
]



export const LearningGrid = () => {
    return (
        <section className="w-11/12 max-w-maxContent pt-20 mx-auto grid grid-cols-1 lg:grid-cols-4 h-[618px] font-inter ">
            {
                LearningGridDatadArray.map((card, index) => {
                    return (
                        <div key={index}
                            className={`${index === 0 && "lg:col-span-2 bg-transparent"}
            ${card.order % 2 == 1 ? "bg-richblack-700" : "bg-richblack-800"}
            ${index === 3 && "col-start-2"}
            `}
                        >
                            {card.order < 0 ? (<div className="flex flex-col gap-4">
                                <div className="text-4xl font-semibold min-w-[45%] ">
                                    {card.heading}
                                    <HighlightedText text={card.hightlightedText} ></HighlightedText>
                                </div>
                                <p className="text-[16px] font-inter">{card.description}</p>

                                <div className=" w-fit">
                                    <CTButton active={true} linkWith={"/"} >
                                        Learn More
                                    </CTButton>
                                </div>
                            </div>) :
                                (<div className="flex flex-col gap-7 p-6">
                                    <h1 className="text-xl font-bold">{card.heading}</h1>
                                    <p>{card.description}</p>

                                </div>)
                            }
                        </div>
                    )
                })
            }

        </section>
    )
}