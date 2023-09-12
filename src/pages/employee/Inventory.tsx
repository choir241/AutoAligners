import React, {useState, useEffect} from "react"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import {GetInventory, InventoryItem, CurrentInventory} from "../../hooks/InventoryHooks"
import {CartItem, GetCart} from "../../hooks/CartHooks"

export default function Inventory(){

    const [inventory, setInventory] = useState<InventoryItem[]>([])
    const [itemQuantity, setItemQuantity] = useState<number>();
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