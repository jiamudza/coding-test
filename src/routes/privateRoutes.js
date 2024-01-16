import { Navigate } from "react-router-dom";

const PrivateRoutes = (props) => {
    if(!localStorage.getItem("@Login")) {
        return <Navigate to='/'/>
    } 
    else return props.children
}

export default PrivateRoutes