import {createContext} from "react"
import { InventoryItem } from "./Interfaces";

type T = {
inventory: InventoryItem[]
}

export const APIContext = createContext<T>({
    inventory: []
});