import React, {useState, useEffect} from "react"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import {ButtonLink} from "../components/Button"
import {GetInventory, InventoryItem, CurrentInventory} from "../hooks/InventoryHooks"

export default function Inventory(){

    const [inventory, setInventory] = useState<InventoryItem[]>([])
    
    useEffect(()=>{
        GetInventory((e:InventoryItem[])=>setInventory(e))
    },[])

    return(
        <main id = "inventory">
            <Nav pageHeading = {"Inventory"}/>
                <div className="flex justifyCenter">
                {ButtonLink({classNames: "goBack", text: "Go Back", domain: "/employee"})}
                </div>
                <section className = "itemContainer flex">
                    {CurrentInventory(inventory)}
                </section>
            <Footer/>
        </main>
    )
}