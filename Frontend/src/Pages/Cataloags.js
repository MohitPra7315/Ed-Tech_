import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { apiConnector } from "../services/apiConnection"
import { catalogData, categories } from "../services/apis"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
import { Error } from "../Pages/ErrorPage";
import Footer from "../Components/Common/Footer"
import { GetCatalogPageData } from "../services/operations/pageAndComponentData"
import { CourseSlider } from "../Components/Cores/Catalog/CourseSlider"
import { Course_Card } from "../Components/Cores/Catalog/Course_Card"
export const CataloagsDataPage = () => {

    const { catalogName } = useParams()

    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [catalogPageData, setCatalogPageData] = useState("")
    const [catagoryId, setCatagoryId] = useState("65bb44447cae281381f56934")
    const [categoryData, setCategoryData] = useState("")
    const [active, setActive] = useState(1)
    console.log("chech id of Category",categoryData)

    useEffect(() => {
        const fetchCatagoryNameData = async () => {

            const toastId = toast.loading("Loading...")
            try {
                const res = await apiConnector("GET", categories.ALL_CATEGORIES_API)
                console.log("chech id of Category",res.data.data)
                const category = res.data.data.find((ct) => ct.name.split("-").join(" ").toLowerCase() === catalogName)[0]._id;
                setCategoryData(category)
                
                console.log(category)
                const categoryID = '65bb44447cae281381f56934'
                setCatagoryId(categoryID)
            } catch (error) {
                console.error(error.message)
            }
            toast.dismiss(toastId)
        }
        fetchCatagoryNameData()
    }, [catalogName])



    useEffect(() => {
        const fetchAllCatalogPageDetailsData = async () => {

            setLoading(true)
            try {

                const result = await GetCatalogPageData(catagoryId)
                console.log("Catalog page details :", result)

                setCatalogPageData(result)

            } catch (error) {
                console.error(error.message)

            }
            setLoading(false)

        }
        if (catagoryId) {
            fetchAllCatalogPageDetailsData()
        }


    }, [catalogName])

    if (loading || !catalogPageData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }
    if (!loading && !catalogPageData.success) {
        return <Error />
    }
    return (
        <div >
            <div className=" bg-richblack-800 px-4">
                <div className="box-content  mx-auto min-h-[240px] flex flex-col justify-center gap-4 max-w-maxContentTab lg:max-w-maxContent ">
                    <p className="text-sm text-white">{`Home / Course /`}  <span className="text-2xl text-yellow-50">{catalogPageData.data.selectedCategory.name}</span></p>
                    <p className="text-3xl text-richblack-5">{catalogPageData.data.selectedCategory.name}</p>
                    <p className="max-w-[870px] text-richblack-200">{catalogPageData.data.selectedCategory.description}</p>
                </div>
            </div>
            <div className="mx-auto box-content flex flex-col w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent text-white">
                {/* Section-1 */}
                <h1 className=" text-2xl font-bold text-richblack-5 lg:text-4xl">Courses to get You Started</h1>
                <div className="flex gap-x-3 w-full">
                    <p
                        onClick={() => setActive(1)}
                        className={``}

                    >Most Popular</p>
                    <p
                        onClick={() => setActive(2)}
                        className={``}
                    >NEw</p>

                </div>
                <div className="py-8">
                    <CourseSlider Course={catalogPageData?.data?.selectedCategory?.courses} />

                </div>
            </div>

            {/* Section-2 */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent text-white">
                <p className=" text-2xl font-bold text-richblack-5 lg:text-4xl">Top Courses in Cloud Computing</p>
                <div className="py-8">
                    <CourseSlider Course={catalogPageData?.data?.differentCategory?.courses} />

                </div>
            </div>
            {/* Section-3 */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <p className=" text-2xl font-bold text-richblack-5 lg:text-4xl">Frequent Brought</p>
                <div className="py-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0, 4)
                                .map((course, index) => (
                                    <Course_Card key={index} Course={course} Height={"h-[400px]"} />
                                ))
                        }
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

