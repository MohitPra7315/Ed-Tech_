import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { apiConnector } from "../services/apiConnection"
import { categories } from "../services/apis"
import { toast } from "react-hot-toast"
 export const CataloagsDataPage = () => {

    // const CatagoryName = useParams()
    const [catagoryName, setCatagoryName] = useState("")
    const [catalogPageData, setCatalogPageData] = useState("")
    const [catagoryId, setCatagoryId] = useState("")

    useEffect(() => {
        const fetchCatagoryNameData = async () => {

            const toastId = toast.loading("Loading...")
            try {

                const res = await apiConnector("GET", categories.ALL_CATEGORIES_API)
                console.log("CATEGORY DATA :", res)
                // if (res?.data?.data){

                // }

            } catch (error) {
                console.error(error.message)
            }
            toast.dismiss(toastId)
        }

    }, [])
    return (
        <div className="text-3xl text-white">
            <p>This is Catalog data for Show Data details</p>
        </div>
    )
}

