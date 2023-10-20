import {createContext} from "react"
import {ClientFinance, Profile, PTO, User, InventoryItem, CartItem, Appointment, PurchasedItem, Estimate} from "./Interfaces";

type T = {
inventory: InventoryItem[],
cart: CartItem[],
appointments: Appointment[],
setAppointments: (e:Appointment[])=>void,
purchases: PurchasedItem[],
estimates: Estimate[],
user: User,
PTORequests: PTO[],
employee: Profile,
clientFinance: ClientFinance[],
setClientFinance: (e:ClientFinance[])=>void
}

export const APIContext = createContext<T>({
    inventory: [],
    cart: [],
    appointments: [],
    setAppointments: (e:Appointment[]) => e,
    purchases: [],
    estimates: [],
    user: {
        $createdAt: "",
        $updatedAt: "",
        email: "",
        $id: "",
        name: "",
        phone: "",
        phoneVerification: true,
        emailVerification: true,
        passwordUpdate: "",
        status: true,
        prefs: [],
        registration: ""
    },
    PTORequests: [],
    employee: {
        $id: "",
        fileName: "",
        image: "",
        position: "",
        PTO: "",
        salary: "",
        requestedPTO: "",
        requests: []
    },
    clientFinance: [], 
    setClientFinance: (e: ClientFinance[])=>e 
});