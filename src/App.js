import {BrowserRouter} from "react-router-dom"
import {Route, Routes} from "react-router"
import {PrivateRoutes, PublicRoutes, PurchaseRoutes} from "./middleware/Routes"
import {lazy, Suspense} from "react"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {EmployeeHub} from "./pages/employee/Employee.tsx"


const App = () => {

    const Home = lazy(()=>import("./pages/Home.tsx"));
    const Reservation = lazy(()=>import("./pages/guest/Reservation.tsx"));
    const Demo = lazy(()=>import("./pages/guest/Demo"));
    const ServiceEstimate = lazy(()=>import("./pages/guest/ServiceEstimate.tsx"));
    const ManageAppointments = lazy(()=>import("./pages/employee/ManageAppointments.tsx"));
    const EditAppointment = lazy(()=>import("./pages/employee/EditAppointment.tsx"));
    const Employee = lazy(()=>import("./pages/employee/Employee.tsx"));
    const Finance = lazy(()=>import("./pages/guest/Finance.tsx"));
    const EmployeeSettings = lazy(()=>import("./pages/employee/EmployeeSettings.tsx"));
    const Inventory = lazy(()=>import("./pages/employee/Inventory.tsx"));
    const InventoryShop = lazy(()=>import("./pages/employee/InventoryShop.tsx"));
    const Cart = lazy(()=>import("./pages/employee/Cart"));
    const Purchases = lazy(()=>import("./pages/employee/Purchases"));
    const Estimates = lazy(()=>import("./pages/employee/Estimates"));

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
                        <Route path = "/cart" element = {<Cart/>}/>
                        <Route path = "/inventory" element = {<Inventory/>}/>
                        <Route path = "/inventoryShop" element = {<InventoryShop/>}/>
                        <Route path = "/settings" element = {<EmployeeSettings/>}/>
                        <Route path = "/manageAppointments" element = {<ManageAppointments/>}/>
                        <Route path = "/editAppointment" element = {<EditAppointment/>}/>
                        <Route path = "/estimates" element = {<Estimates/>}/>
                        <Route element = {<PurchaseRoutes/>}>
                            <Route path = "/purchases" element = {<Purchases/>}/>
                        </Route>

                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </Suspense>
    )
}

export default App;