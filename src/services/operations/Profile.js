import { apiConnector } from "../apiConnection";
import { ProfileEndPoint } from "../apis";
import { toast } from "react-hot-toast"


export const showAllCategories = async (token) => {
    const { GET_USER_ENROLLED_COURES } = ProfileEndPoint
    const toastId = toast.loading("loading...")
    const result = []
    try {
        const Response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURES,
            null,
            {
                Authorization: `Bearer ${token}`
            }
        )
        if (!Response.data.success) {
            throw new Error("code")
        }
        result = Response.data
    } catch (error) {
        console.error(error.message)
        toast.error("fatt gya code")
    }
    toast.dismiss(toastId)
    toast.success("fetched")
    return result
}

