import { useSelector } from "react-redux"
import { useState } from "react"
import toast from "react-hot-toast"

import { courseEndpoints } from "../../services/apis"
import { apiConnector } from "../apiConnection"

const { COURSE_CATEGORIES_API } = courseEndpoints
const FetchAllCourseCategory = async () => {

    let result = [];

    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API, null)
        console.log("ALL categories Response.....", response?.data?.Alldata)


        if (!response.data.success) {
            throw new Error(response.message)
        }
        result = response?.data?.Alldata

    } catch (error) {
        console.error("error While Fetiching the Categories data", error.message)
        toast.error("Couldn't fetched Categories")
    }
    return result


}

export default FetchAllCourseCategory