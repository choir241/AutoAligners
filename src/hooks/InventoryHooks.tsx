import api from "../api/api"
import React from "react"
import {Permission, Role} from "appwrite"
import {items} from "../api/inventory"
import {Button} from "../components/Button"

export interface InventoryItem{
    $id?: string,
    name: string,
    category: string,
    quantity: number,
    manufacturer: string,
    reOrderLV: number,
    price: string,
    description: string
}

interface Item{
    inventory: InventoryItem,
    itemQuantity: number | undefined
}

interface DefaultInventoryDisplay{
    setItemQuantity: (e:number) => void,
    inventory: InventoryItem[],
    itemQuantity: number | undefined
}

export async function GetInventory(setInventory: (e:InventoryItem[])=>void){
    try{
        const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_INVENTORY_COLLECTION_ID)
        setInventory(data.documents);
    }catch(err){
        console.error(err)
    }
}

export function CurrentInventory(inventory: InventoryItem[]){
    //iterate through inventory
    //find if there are any duplicates
    //if there are, don't add them to the array, but instead add 1 to quantity amount      

    return inventory.map((inventoryItems:InventoryItem,i:number)=>{
        return(
            <section key = {inventoryItems.$id} className = {"flex flex-col item borderSeperation"}>
                    <h2>{inventoryItems.name}</h2>
                    <h2>Quantity: {inventoryItems.quantity}</h2>
                    <h3>{inventoryItems.manufacturer}</h3>
                    <p>{inventoryItems.description}</p>
            </section>
        )
    })
}


export async function HandlePurchaseItem(props: Item){
    try{
        const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_INVENTORY_COLLECTION_ID)

        const checkForDuplicates = await data.documents.filter((inventory:InventoryItem)=>inventory.name === props.inventory.name);

        if(!checkForDuplicates.length){
            const item = {
                "name": props.inventory.name,
                "price": props.inventory.price,
                "manufacturer": props.inventory.manufacturer,
                "description": props.inventory.description,
                "reOrderLV": props.inventory.reOrderLV,
                "category": props.inventory.category,
                "quantity": props.itemQuantity ? props.itemQuantity : props.inventory.quantity
            }

            await api.createDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_INVENTORY_COLLECTION_ID, item, [Permission.read(Role.any())])

            window.location.reload();
        }else{
            let quantity = 0
            if(props.itemQuantity){
                quantity = checkForDuplicates[0].quantity+=props.itemQuantity
            }else{
                quantity = checkForDuplicates[0].quantity+=1
            }

            const item = {
                "name": props.inventory.name,
                "price": props.inventory.price,
                "manufacturer": props.inventory.manufacturer,
                "description": props.inventory.description,
                "reOrderLV": props.inventory.reOrderLV,
                "category": props.inventory.category,
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

export function DefaultInventory(props: DefaultInventoryDisplay){
    function renderQuantityOptions(){
        const options = []
        for(let i = 1; i < 51; i++){
            options.push(<option key = {`option-${i}`} value={i}>{i}</option>)
        }
        return(
            <select onChange = {(e)=>props.setItemQuantity(parseInt(e.target.value))}>
                {options}
            </select>
        )
    }

    return items.map((inventoryItem,i)=>{

     const findItem: InventoryItem[] = props.inventory.filter((value:InventoryItem) => value.name === inventoryItem.itemName);

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
                <h3>Quantity: {findItem[0]?.quantity ? findItem[0]?.quantity: 0}</h3>
                <p>{itemDescription}</p>
                {renderQuantityOptions()}
             {Button({text:"Purchase Item", handleButtonClick: ()=>{HandlePurchaseItem({itemQuantity: props.itemQuantity, inventory: {name: itemName, category: itemCategory, quantity: quantity, manufacturer: itemManufacturer, reOrderLV: itemReorderLV, price: price, description: itemDescription}})}})}
         </section>
     )  
     })
}
