import { useContext } from "react"
import { AuthContext } from "../authcontext"
import { useNavigate,Navigate } from "react-router-dom"

function PrivateRoute({children}){
   
    const {loading,accessToken}=useContext(AuthContext)
    
   
    if (!accessToken) return <Navigate to='/login'/>
    return children
    
}

export default PrivateRoute