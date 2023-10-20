import {create} from "zustand"
import {produce} from "immer"
import {State} from "./Types"
import {ClientFinance, Profile, PTO, InventoryItem, CartItem, Appointment, PurchasedItem, Estimate, User} from "./Interfaces.tsx"

export const useStore = create<State>(
    (set)=>({
     
    })
);