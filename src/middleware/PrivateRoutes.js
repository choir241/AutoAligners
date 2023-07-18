import {Outlet, Navigate} from "react-router-dom"

export default function PrivateRoutes(){
    return(
        localStorage.getItem("email") ? <Outlet/> : <Navigate to = "/"/>
    )
}