import React, {useState, useEffect} from "react"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import {DefaultInventory, InventoryItem, GetInventory} from "../../hooks/InventoryHooks"

export default function InventoryShop(){

    const [itemQuantity, setItemQuantity]= useState<number>();
    const [inventory, setInventory] = useState<InventoryItem[]>([])
    
    useEffect(()=>{
        GetInventory((e:InventoryItem[])=>setInventory(e))
    },[])


    return(
        <main id = "inventory">
            <Nav pageHeading = {"Inventory Shop"}/>

            <div className="flex justifyCenter">
            </div>

                <section className = "itemContainer flex">
                    {DefaultInventory({itemQuantity: itemQuantity, setItemQuantity: (e:number)=>setItemQuantity(e), inventory: inventory})}
                </section>
            <Footer/>
        </main>
    )
}