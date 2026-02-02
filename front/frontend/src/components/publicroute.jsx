import { useContext } from "react"
import { AuthContext } from "../authcontext"
import { Navigate } from "react-router-dom"

function PublicRoute({children}){

    const {accessToken}=useContext(AuthContext)
    
    if (accessToken) return <Navigate to='/userdashboard'/>
    return children
    
}

export default PublicRoute