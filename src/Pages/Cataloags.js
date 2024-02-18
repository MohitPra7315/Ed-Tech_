import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { apiConnector } from "../services/apiConnection"
import { categories } from "../services/apis"
import { toast } from "react-hot-toast"
export const CataloagsDataPage = () => {

    const catalogName = useParams()
    console.log("CatalogName :", catalogName.split("-").join(" ").toUppperCase())

    const [catagoryName, setCatagoryName] = useState("")
    const [catalogPageData, setCatalogPageData] = useState("")
    const [catagoryId, setCatagoryId] = useState("")
    const [categoryData, setCategoryData] = useState("")

    useEffect(() => {
        const fetchCatagoryNameData = async () => {

            const toastId = toast.loading("Loading...")
            try {

                const res = await apiConnector("GET", categories.ALL_CATEGORIES_API)


                setCategoryData(res.data.data)



                const category = categoryData.find(
                    (ct) => ct.name.toLowerCase() === catalogName.toLowerCase()
                );

                const categoryId = category ? category._id : undefined;


                console.log("CATEGORY DATA :", categoryId)


            } catch (error) {
                console.error(error.message)
            }
            toast.dismiss(toastId)
        }
        fetchCatagoryNameData()
    }, [catalogName])
    return (
        <div className="text-3xl text-white">
            <p>This is Catalog data for Show Data details</p>
        </div>
    )
}

