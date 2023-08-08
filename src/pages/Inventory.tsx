import React, {useState, useEffect} from "react"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import api from "../api/api"
import {ButtonLink} from "../components/Button"

interface InventoryItem{
    $id: string,
    name: string,
    category: string,
    quantity: number,
    manufacturer: string,
    reOrderLV: number,
    price: number,
    description: string
}

export default function Inventory(){

    const [inventory, setInventory] = useState([])
    
    useEffect(()=>{
        async function getInventory(){
            try{
                const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_INVENTORY_COLLECTION_ID)
                setInventory(data.documents);
            }catch(err){
                console.error(err)
            }
        }

        getInventory()
    },[])




    function currentInventory(){
            //iterate through inventory
            //find if there are any duplicates
            //if there are, don't add them to the array, but instead add 1 to quantity amount      

            return inventory.map((inventoryItems:InventoryItem)=>{
                return(
                    <section key = {inventoryItems.$id} className = "flex flex-col item">
                            <h2>{inventoryItems.name}</h2>
                            <h2>Quantity: {inventoryItems.quantity}</h2>
                            <h3>{inventoryItems.manufacturer}</h3>
                            <p>{inventoryItems.description}</p>

                    </section>
                )
            })
    }



    return(
        <main id = "inventory">
            <Nav pageHeading = {"Inventory"}/>
            <div className="flex justifyCenter">
            {ButtonLink({classNames: "goBack", text: "Go Back", domain: "/employee"})}

            </div>

                <section className = "itemContainer flex">

                    {currentInventory()}
                </section>
            <Footer/>
        </main>
    )
}