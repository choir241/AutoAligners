import {Outlet, Navigate} from "react-router-dom"
import {cacheEmail} from "./Cache"

export function PrivateRoutes(){
    return(
        cacheEmail ? <Outlet/> : <Navigate to = "/"/>
    )
}

export function PublicRoutes(){
    return(
        cacheEmail ? <Navigate to = "/"/> : <Outlet/>
    )
}

export function PurchaseRoutes(){
    return(
        cacheEmail.toLowerCase() === "bobthebuilder@gmail.com" ? <Outlet/> : <Navigate to = "/"/>
    )
}
