
import React from "react"

import { setLoading, setToken } from "../../Slices/authSlice"
import { apiConnector } from "../apiConnection"
import { AuthEndPoint } from "../apis"
import toast from "react-hot-toast"
import { settingsEndpoints } from "../apis"
import axios from "axios"

const { UPDATE_DISPLAY_PICTUTRE_API, UPDATE_PERSONAL_DETAIL } = settingsEndpoints


export const UpdateImage = (token, formData) => {
    const displayPicture=formData
    console.log("converted indto ",displayPicture)
    return async (dispatch) => {
      
        const toastId = toast.loading("Loading....")
        try {
            const response = await apiConnector(
                "PUT",
                UPDATE_DISPLAY_PICTUTRE_API,
                displayPicture,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            )
            console.log("response....", response.data)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Succesfully Updated")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle AxiosError
                console.error('AxiosError:', error.response?.data || 'No response data');
            } else {
                // Handle other errors
                console.error('Error:', error.message);
            }
            toast.error("Failed to Update image  ")
        }
        toast.dismiss(toastId)

    }
}