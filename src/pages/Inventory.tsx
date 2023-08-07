import React, {useState} from "react"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import api from "../api/api"
import {items} from "../api/inventory"
import {Button} from "../components/Button"

interface InventoryItem{
    itemID: string,
    itemName: string,
    category: string,
    manufacturer: string,
    reorderLevel: number,
    pricePerUnit: number,
    description: string
}

export default function Inventory(){

    const [inventory, setInventory] = useState([])

    function handlePurchaseItem(itemName: string, price: string, itemManufacturer: string, itemDescription: string){
        console.log(itemName)
        console.log(price)
        console.log(itemManufacturer)
        console.log(itemDescription)
    }

    async function getInventory(){
        try{
            const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_INVENTORY_COLLECTION_ID)
            setInventory(data);
        }catch(err){
            console.error(err)
        }
    }

    function defaultInventory(){
        if(!inventory.length){
           return items.map((inventoryItem,i)=>{

            let price = inventoryItem.pricePerUnit.toString()
            if(inventoryItem.pricePerUnit.toString().includes(".")){
                const cents = inventoryItem.pricePerUnit.toString().split(".")[1]
                if(parseInt(cents)<10){
                    price += "0"
                }
            }else{
                price += ".00"
            }

            const itemName = inventoryItem.itemName
            const itemManufacturer = inventoryItem.manufacturer
            const itemDescription = inventoryItem.description


            return(
                <section key = {i} className = "flex flex-col item">
                    <div className="flex justifyBetween itemHeading">
                        <h2>{itemName}</h2>
                        <h3>${price}</h3>
                    </div>
                        <h3>{itemManufacturer}</h3>
                        <p>{itemDescription}</p>
                    {Button({text:"Purchase Item", handleButtonClick: ()=>{handlePurchaseItem(itemName, price, itemManufacturer, itemDescription)}})}
                </section>
            )  
            })
        }
    }



    return(
        <main id = "inventory">
            <Nav pageHeading = {"Inventory"}/>
                <section className = "itemContainer flex">
                    {defaultInventory()}
                </section>
            <Footer/>
        </main>
    )
}