import { toast } from "react-hot-toast"
import { catalogData } from "../apis"
import { apiConnector } from "../apiConnection"

export const GetCatalogPageData = async (categoryId) => {
    console.log("Id:--",categoryId)
    let result = []
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API,
            { categoryId: categoryId }

        )
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Catagory page data.")

        }
        result = response?.data

    }
    catch (error) {
        console.log("CATALOGPAGEDATA_API API ERROR............", error)
        toast.error(error.message)
        result = error.response?.data
    }
    toast.dismiss(toastId)
    return result


}