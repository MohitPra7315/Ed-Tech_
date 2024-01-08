
import React from "react"

import { setLoading, setToken } from "../../Slices/authSlice"
import { apiConnector } from "../apiConnection"
import { AuthEndPoint } from "../apis"
import toast from "react-hot-toast"
import { settingsEndpoints } from "../apis"
import axios from "axios"
import { setUser } from "../../Slices/profileSlice"
const { RESETPASSWORDTOKEN_API, RESETPASSWORD_API, SENDOTP_API, SIGNUP_API, LOGIN_API } = AuthEndPoint
const { UPDATE_DISPLAY_PICTUTRE_API, UPDATE_PERSONAL_DETAIL } = settingsEndpoints


export const sendOtp = (email, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            // const response = await apiConnector("POST", SENDOTP_API, { email })
            const response = await axios.post("http://localhost:5000/api/v1/auth/sendOtp", { email })
            console.log("sendotp is got in response", response.data)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("otp sended succesfully")
            navigate("/verify-email")
        } catch (error) {
            console.error("fatt rha h code otp send m ", error)
            toast.error("fatt rha h code otp send m ")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}



export const getpasswordTokenReset = (email, setEmailSent) => {



    return (async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", RESETPASSWORDTOKEN_API, { email })

            console.log("Reset password token  response.......", response)
            // there is problem 
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            console.log("response aa gya h ab check karna h toast", response.data.success)
            toast.success("succesfully ")
            setEmailSent(true)
        } catch (error) {
            console.error("error aa gya  RESET Password Token", error)
            toast.error("Failed to Reset Password Token ")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
    )
}





export const getUpdatePassword = (password, confirmPassword, token) => {

    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token })
            // const response = await axios.post('http://localhost:5000/api/v1/auth/reset-password', { password, confirmPassword, token });

            console.log("Reset password   response....... 11", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("succesfully Reset password")


        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle AxiosError
                console.error('AxiosError:', error.response?.data || 'No response data');
            } else {
                // Handle other errors
                console.error('Error:', error.message);
            }
            toast.error("Failed to Reset Password ")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export const SignupA = (firstName, lastName, email, password, confirmPassword, accountType, otp, navigate) => {



    return async (dispatch) => {
        dispatch(setLoading(true))

        try {

            const response = await apiConnector("POST", SIGNUP_API, { firstName, lastName, email, password, confirmPassword, accountType, otp })
            // const response = await axios.post('http://localhost:5000/api/v1/auth/signup', { firstName, lastName, email, password, confirmPassword, accountType, otp });

            console.log("signup ho gya h  ....... ", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signup succesfully ")
            navigate("/login")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle AxiosError
                console.error('AxiosError:', error.response?.data || 'No response data');
            } else {
                // Handle other errors
                console.error('Error:', error.message);
            }
            toast.error("Failed to SignUp  ")
        }
        dispatch(setLoading(false))

    }
}


export const getLogin = (email, password, navigate) => {
    return async (dispatch) => {
        const toastID = toast.loading("Loading...")
        try {
            const response = await apiConnector("POST", LOGIN_API, { email, password })

            console.log("Login Response....", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("LOGIN SUCCESFULL")
            dispatch(setToken(response.data.User.token))
            dispatch(setUser(response.data.User))
            localStorage.setItem("token", JSON.stringify(response?.data?.User?.token))
            localStorage.setItem("user", JSON.stringify(response?.data?.User))

            navigate("/dashboard/my-profile")

        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle AxiosError
                const reserror = error.response.data
                console.error('AxiosError:', error.response?.data || 'No response data');
            } else {
                // Handle other errors
                console.error('Error:', error.message);

            }
            toast.error("Failed to Login")

        }

        toast.dismiss(toastID)
    }

}

export const logout = (navigate) => {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")

        navigate("/")

    }
}




// ******************************************************************************
//                                      Setting API__
// ******************************************************************************

