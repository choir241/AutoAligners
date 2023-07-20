import {BrowserRouter} from "react-router-dom"
import {Route, Routes} from "react-router"
import PrivateRoutes from "./middleware/PrivateRoutes"
import {lazy, Suspense} from "react"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {

    const Home = lazy(()=>import("./pages/Home.tsx"));
    const Reservation = lazy(()=>import("./pages/Reservation.tsx"));
    const Login = lazy(()=>import("./pages/Login.tsx"));
    const ServiceEstimate = lazy(()=>import("./pages/ServiceEstimate.tsx"));
    const ManageAppointments = lazy(()=>import("./pages/ManageAppointments.tsx"));
    const EditAppointment = lazy(()=>import("./pages/EditAppointment.tsx"));

    return(
        <Suspense fallback = {<h1>Loading...</h1>}>
            <BrowserRouter>
                <Routes>
                  <Route exact path = "/" element = {<Home/>}/>
                  <Route path = "/login" element = {<Login/>}/>
                  <Route path = "/reservation" element = {<Reservation/>}/>
                    <Route element = {<PrivateRoutes/>}>
                        <Route path = "/estimate" element = {<ServiceEstimate/>}/>
                        <Route path = "/manageAppointments" element = {<ManageAppointments/>}/>
                        <Route path = "/editAppointment" element = {<EditAppointment/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </Suspense>
    )
}

export default App;