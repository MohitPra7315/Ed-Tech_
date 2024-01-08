

const BASE_URL = "http://localhost:5000/api/v1"
console.log("base url", BASE_URL)

export const categories = {
    ALL_CATEGORIES_API: BASE_URL + "/course/showAllCategories"
}


export const ProfileEndPoint = {
    GET_USER_ENROLLED_COURES: BASE_URL + "/profile/getEnrolledCourses"
}


export const AuthEndPoint = {
    SENDOTP_API: BASE_URL + "/auth/sendOtp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/Login",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password"

}
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTUTRE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PERSONAL_DETAIL: BASE_URL + "/profile/updateProfile"



}