import React, {useState, useEffect} from "react"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import {GetInventory, CurrentInventory} from "../../hooks/InventoryHooks"
import { GetCart} from "../../hooks/CartHooks"
import {CartItem, InventoryItem} from "../../middleware/Interfaces"

export default function Inventory(){

    const [inventory, setInventory] = useState<InventoryItem[]>([])
    const [itemQuantity, setItemQuantity] = useState<number>(0);
    const [cart, setCart] = useState<CartItem[]>([]);


    useEffect(()=>{
        GetInventory((e:InventoryItem[])=>setInventory(e))
    },[])

    useEffect(()=>{
        GetCart((e:CartItem[])=>setCart(e));
    },[])

    return(
        <main id = "inventory">
            <Nav pageHeading = {"Current Inventory"}/>
                <div className="flex justifyCenter">
                </div>
                <section className = "itemContainer flex">
                    {CurrentInventory({cart: cart, inventory: inventory, setItemQuantity: (e:number)=>setItemQuantity(e), quantity: itemQuantity})}
                </section>
            <Footer/>
        </main>
    )
}