
import React from "react"

import { setLoading, setToken } from "../../Slices/authSlice"
import { apiConnector } from "../apiConnection"
import { AuthEndPoint } from "../apis"
import toast from "react-hot-toast"
import { settingsEndpoints } from "../apis"
import axios from "axios"
import { setUser } from "../../Slices/profileSlice"
import { logout } from "./authAPI"

const { UPDATE_DISPLAY_PICTUTRE_API, UPDATE_PERSONAL_DETAIL,CHANGE_PASSWORD_API,DELETE_PROFILE_API } = settingsEndpoints


export const UpdateImage = (token, formData) => {
    const displayPicture = formData
    console.log("converted indto ", displayPicture)
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


const UpdateProfile = (token, formdata) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {

            const response = await apiConnector("PUT", UPDATE_PERSONAL_DETAIL, formdata,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,

                })
            console.log("Updated_Profile_data...", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setUser({ ...response.data.UpdateProfile }))
            toast.success("Succesfully  Updated Profile")
        } catch (error) {
            console.error("UPDATE_PROFILE_API API ERROR...........", error)
            toast.error("could not Update Profile")
        }
        toast.dismiss(toastId)
    }


}
export default UpdateProfile



export async function changePassword(token, formData) {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Changed Successfully")
    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
  }


  export function deleteProfile(token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
          Authorization: `Bearer ${token}`,
        })
        console.log("DELETE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Profile Deleted Successfully")
        dispatch(logout(navigate))
      } catch (error) {
        console.log("DELETE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Delete Profile")
      }
      toast.dismiss(toastId)
    }
  }