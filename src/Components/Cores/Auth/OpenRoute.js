import { useSelector } from "react-redux"
import {  useNavigate } from "react-router-dom"

export const OpenRoute = ({ children }) => {
    const navigate = useNavigate()

    const { token } = useSelector((state) => state.auth)
    if (token === null) {
        return children
    } else {
        return <navigate to="/dashboard/My-profile"></navigate>
    }
}