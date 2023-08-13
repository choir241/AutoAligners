import React, {useState, useEffect} from "react"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import {ButtonLink} from "../../components/Button"
import {GetInventory, InventoryItem, CurrentInventory} from "../../hooks/InventoryHooks"
import {CartItem, GetCart} from "../../hooks/CartHooks"
import EmployeeNav from "../../components/EmployeeNav"

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
            <Nav pageHeading = {"Inventory"}/>
            <EmployeeNav/>
                <div className="flex justifyCenter">
                {ButtonLink({classNames: "goBack", text: "Go Back", domain: "/employee"})}
                </div>
                <section className = "itemContainer flex">
                    {CurrentInventory(cart, inventory, (e:number)=>setItemQuantity(e), itemQuantity)}
                </section>
            <Footer/>
        </main>
    )
}