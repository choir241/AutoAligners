import {BrowserRouter} from "react-router-dom"
import {Route, Routes} from "react-router"
import {PrivateRoutes, PublicRoutes, PurchaseRoutes} from "./middleware/Routes.jsx"
import {Suspense, useEffect, useState} from "react"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {EmployeeHub} from "./pages/employee/Employee.tsx"
import {APIContext} from "./middleware/Context.tsx"
import {cacheEmail} from "./middleware/Cache.tsx"
import {ClientFinance, Profile, PTO, InventoryItem, CartItem, Appointment, PurchasedItem, Estimate, User} from "./middleware/Interfaces.tsx"
import {GetClientFinance, GetEmployee, GetPTORequests, GetInventory, GetCart, GetAppointmentData, GetPurchases, GetEstimates, GetAccount } from "./hooks/ApiCalls.tsx"
import {defaultEmployee, defaultUser, Home, Employee, Finance, ServiceEstimate, Demo, AdminDemo, Reservation, Cart, Inventory, InventoryShop, EmployeeSettings, ManageAppointments, EditAppointment, Estimates, Purchases, Client} from "./Pages"

export default function App(){

    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [purchases, setPurchases] = useState<PurchasedItem[]>([]);
    const [estimates, setEstimates] = useState<Estimate[]>([]);
    const [user, setUser] = useState<User>(defaultUser);
    const [PTORequests, setPTORequests] = useState<PTO[]>([]);
    const [employee, setEmployee] = useState<Profile>(defaultEmployee);
    const [clientFinance, setClientFinance] = useState<ClientFinance[]>([]);


    useEffect(()=>{
        if(cacheEmail){
            GetInventory((e:InventoryItem[])=>setInventory(e));
            GetCart((e:CartItem[])=>setCart(e));
            GetAppointmentData((e:Appointment[])=>setAppointments(e));
            GetPurchases((e:PurchasedItem[])=>setPurchases(e));
            GetEstimates((e:Estimate[])=>setEstimates(e));
            GetAccount((e:User)=>setUser(e));
            GetPTORequests((e:PTO[])=>setPTORequests(e));
            GetEmployee((e:Profile)=>setEmployee(e));
            GetClientFinance((e:ClientFinance[])=>setClientFinance(e));
        }

    },[])

    return(
        <APIContext.Provider 
        value = {{inventory, cart, appointments, 
        setAppointments, purchases, estimates, 
        user, PTORequests, employee, clientFinance, setClientFinance
        }}>
            <Suspense fallback = {<h1>Loading...</h1>}>
                <BrowserRouter>
                    <Routes>
                      <Route path = "/" element = {<Home/>}/>
                        <Route element = {<PublicRoutes/>}>
                            <Route path = "/employee" element = {<Employee/>}/>
                            <Route path = "/finance" element = {<Finance/>}/>
                            <Route path = "/login" element = {<EmployeeHub/>}/>
                            <Route path = "/estimate" element = {<ServiceEstimate/>}/>
                            <Route path = "/demo" element = {<Demo/>}/>
                            <Route path = "/adminDemo" element = {<AdminDemo/>}/>
                            <Route path = "/reservation" element = {<Reservation/>}/>
                        </Route>
                        <Route element = {<PrivateRoutes/>}>
                            <Route path = "/clientFinance" element = {<Client/>}/>
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
        </APIContext.Provider>
    )
}
