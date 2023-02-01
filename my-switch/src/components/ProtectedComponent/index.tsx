import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext"


export const ProtectedComponent = (props: { children: any; }) => {
    const {children} = props
    const { user } = useContext(AuthContext);
if(user){
    return children
}

   return  <Navigate to="/login" replace={true}/>
}

