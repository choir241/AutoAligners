import {Outlet, Navigate} from "react-router-dom"

export function PrivateRoutes(){
    return(
        localStorage.getItem("email") ? <Outlet/> : <Navigate to = "/"/>
    )
}

export function PublicRoutes(){
    return(
        localStorage.getItem("email") ? <Navigate to = "/"/> : <Outlet/>
    )
}