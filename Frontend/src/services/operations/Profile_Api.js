import { apiConnector } from "../apiConnection";
import { ProfileEndPoint } from "../apis";
import { toast } from "react-hot-toast"


export const GetUserEnrolledCourseDetails = async (token) => {
    const { GET_USER_ENROLLED_COURES } = ProfileEndPoint
    const toastId = toast.loading("loading...")
    let result = []
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
        console.log("Enrooleed Courses data from backend....", Response.data.data
        )
        result = Response.data.data
    } catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)

    return result
}


// export const GetUserEnrolledCourseDetails = async (token) => {
//     const toastId = toast.loading("Loading....")
//     let result;
//     try {
//         const response = await apiConnector("POST", GET_USER_ENROLLED_COURES,
//             null,
//             {
//                 Authorization: `Bearer ${token}`
//             })

//         if (!response.success) {
//             throw new Error("Code is Not working")
//         }
//         result=response.data
//     } catch (error) {
//         console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
//         toast.error("Could Not Get Enrolled Courses")
//     }
// }
