import React, {useState} from "react"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import {ButtonLink, Button} from "../components/Button"
import api from "../api/api"
import {items} from "../api/inventory"
import {Permission, Role} from "appwrite"

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


export default function InventoryShop(){

    const [itemQuantity, setItemQuantity] = useState(1)

    async function handlePurchaseItem(quantity: number, itemCategory: string, itemReorderLV: number, itemName: string, price: string, itemManufacturer: string, itemDescription: string){
        try{
            const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_INVENTORY_COLLECTION_ID)

            const checkForDuplicates = await data.documents.filter((inventory:InventoryItem)=>inventory.name === itemName);

            if(!checkForDuplicates.length){
                const item = {
                    "name": itemName,
                    "price": price,
                    "manufacturer": itemManufacturer,
                    "description": itemDescription,
                    "reOrderLV": itemReorderLV,
                    "category": itemCategory,
                    "quantity": quantity
                }
    
                await api.createDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_INVENTORY_COLLECTION_ID, item, [Permission.read(Role.any())])
    
                window.location.reload();
            }else{
                let quantity = checkForDuplicates[0].quantity+=1
                const item = {
                    "name": itemName,
                    "price": price,
                    "manufacturer": itemManufacturer,
                    "description": itemDescription,
                    "reOrderLV": itemReorderLV,
                    "category": itemCategory,
                    "quantity": quantity
                }
    
                console.log(item)

                await api.updateDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_INVENTORY_COLLECTION_ID, checkForDuplicates[0].$id,item)

                window.location.reload();
            }

           
        }catch(err){
            console.error(err);
        }
    }


    function defaultInventory(){
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
         const itemReorderLV = inventoryItem.reorderLevel
         const itemCategory = inventoryItem.category
         const quantity = 1        

         return(
             <section key = {i} className = "flex flex-col item">
                 <div className="flex justifyBetween itemHeading">
                     <h2>{itemName}</h2>
                     <h3>${price}</h3>
                 </div>
                     <h3>{itemManufacturer}</h3>
                     <p>{itemDescription}</p>
                 {Button({text:"Purchase Item", handleButtonClick: ()=>{handlePurchaseItem(quantity, itemCategory, itemReorderLV, itemName, price, itemManufacturer, itemDescription)}})}
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


                    {defaultInventory()}
                </section>
            <Footer/>
        </main>
    )
}