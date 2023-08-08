import {BrowserRouter} from "react-router-dom"
import {Route, Routes} from "react-router"
import {PrivateRoutes, PublicRoutes} from "./middleware/Routes"
import {lazy, Suspense} from "react"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {EmployeeHub} from "./pages/Employee.tsx"

const App = () => {

    const Home = lazy(()=>import("./pages/Home.tsx"));
    const Reservation = lazy(()=>import("./pages/Reservation.tsx"));
    const Demo = lazy(()=>import("./pages/Demo.tsx"));
    const ServiceEstimate = lazy(()=>import("./pages/ServiceEstimate.tsx"));
    const ManageAppointments = lazy(()=>import("./pages/ManageAppointments.tsx"));
    const EditAppointment = lazy(()=>import("./pages/EditAppointment.tsx"));
    const Employee = lazy(()=>import("./pages/Employee.tsx"));
    const Finance = lazy(()=>import("./pages/Finance.tsx"));
    const EmployeeSettings = lazy(()=>import("./pages/EmployeeSettings.tsx"));
    const Inventory = lazy(()=>import("./pages/Inventory.tsx"));
    const InventoryShop = lazy(()=>import("./pages/InventoryShop.tsx"));

    return(
        <Suspense fallback = {<h1>Loading...</h1>}>
            <BrowserRouter>
                <Routes>
                  <Route exact path = "/" element = {<Home/>}/>
                  <Route path = "/employee" element = {<Employee/>}/>

                    <Route element = {<PublicRoutes/>}>
                        <Route path = "/finance" element = {<Finance/>}/>
                        <Route path = "/login" element = {<EmployeeHub/>}/>
                        <Route path = "/estimate" element = {<ServiceEstimate/>}/>
                        <Route path = "/demo" element = {<Demo/>}/>
                        <Route path = "/reservation" element = {<Reservation/>}/>
                    </Route>
                    <Route element = {<PrivateRoutes/>}>
                        <Route path = "/inventory" element = {<Inventory/>}/>
                        <Route path = "/inventoryShop" element = {<InventoryShop/>}/>
                        <Route path = "/settings" element = {<EmployeeSettings/>}/>
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