import api from "../api/api.jsx"
import {CartItem, Appointment, Profile, PTO, Estimate, ClientFinance, InventoryItem, PurchasedItem} from "../middleware/Interfaces"
import {toast} from "react-toastify"
import {cacheEmail, SetCacheEdit, cacheAppointmentID} from "../middleware/Cache.js"
import {Query} from "appwrite"

//Get Cart data
export async function GetCart(setCart: (e:CartItem[])=>void){
    try{
        const data = await api.listDocuments(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_CART_COLLECTION_ID);

        if(data.documents.length){
            setCart(data.documents.filter((item: CartItem)=>item.email === cacheEmail));
        }
        
    }catch(err){
        console.error(err);
        toast.error(`${err}`);
    }
}

//Get data for apppointment we want to edit
export async function GetEditAppointmentData(){
    try{
        const data = await api.listDocuments(import.meta.env.VITE_REACT_APP_DATABASE_ID,import.meta.env.VITE_REACT_APP_COLLECTION_ID);

        if(data.documents.length){
            const findAppointment = data.documents.filter((appointment: Appointment)=>appointment.$id === cacheAppointmentID);

            SetCacheEdit(JSON.stringify(findAppointment[0]));
        }

    }catch(err){
        console.error(err);
        toast.error(`${err}`);
    }
}

//Get Employee profiles database data
export async function GetEmployee(setEmployee: (e:Profile)=>void){
    try{
        const data = await api.listDocuments(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_PROFILE_COLLECTION_ID);

        if(data.documents.length){
            const findUser = data.documents.filter((user:Profile)=>cacheEmail === user.email)[0];
        
            setEmployee(findUser);
        }

    }catch(err){
        console.error(err);
        toast.error(`${err}`);
    }
}

//Get Employee PTO database data
export async function GetPTORequests(setPTORequests: (e:PTO[])=>void){
    try{
        const data = await api.listDocuments(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_PTO_COLLECTION_ID);
        
        if(data.documents.length){
            setPTORequests(data.documents);
        }

    }catch(err){
        console.error(err);
        toast.error(`${err}`);
    }
}

//Get Submitted Estimates database data
export async function GetEstimates(setEstimates : (e:Estimate[])=>void){
    try{
        const data = await api.listDocuments(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_ESTIMATES_COLLECTION_ID);

        if(data.documents.length){
            setEstimates(data.documents);
        }

    }catch(err){
        console.error(err);
        toast.error(`${err}`);
    }
}

//Get current clients with finance plans
export async function GetClientFinance(setClientFinance: (e:ClientFinance[])=>void){
    try{
        const data = await api.listDocuments(import.meta.env.VITE_REACT_APP_CART_DATABASE_ID, import.meta.env.VITE_REACT_APP_FINANCE_PAYMENTS_COLLECTION_ID);

        if(data.documents.length){
            setClientFinance(data.documents);
        }

    }catch(err){
        console.error(err);
        toast.error(`${err}`);
    }
}

//Get inventory data
export async function GetInventory(setInventory: (e:InventoryItem[])=>void){
    try{
        const data = await api.listDocuments(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_INVENTORY_COLLECTION_ID);

        if(data.documents.length){
            setInventory(data.documents);
        }
    }catch(err){
        console.error(err);
        toast.error(`${err}`);
    }
}

//Get purchase data
export async function GetPurchases(setPurchases:(e:PurchasedItem[])=>void, limit?: number){
    try{
        const data = await api.listDocuments(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_PURCHASES_COLLECTION_ID, [Query.limit(100)]);

        if(limit){

                const response = await api.listDocuments(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_PURCHASES_COLLECTION_ID, [Query.limit(limit), Query.offset(limit-25)]);

                const array = response.documents;
                setPurchases(array);

        }else if(data.documents.length){
            setPurchases(data.documents);
        }

    }catch(err){
        console.error(err);
        toast.error(`${err}`);
    }
 }

//Get appointment data
export async function GetAppointmentData(setAppointments: (e:Appointment[])=>void){
    try{
        const data = await api.listDocuments(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_COLLECTION_ID);

        if(data.documents.length){
            setAppointments(data.documents);
        }
    }catch(err){
        console.error(err);
        toast.error(`${err}`);
    }
}