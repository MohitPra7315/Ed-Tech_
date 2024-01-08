import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
export const Protected = ({ children }) => {
    const Navigate=useNavigate()

    const { token } = useSelector((state) => state.auth)
    if (token !== null) {
        return children
    }
    else {
        return <Navigate to="/"></Navigate>
    }
}