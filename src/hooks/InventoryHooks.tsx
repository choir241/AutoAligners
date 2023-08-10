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

export interface CartItem{
    $id: string,
    itemID: string,
    category: string,
    description: string,
    manufacturer: string,
    name: string,
    price: string,
    email: string,
    quantity: string,
}

export async function GetInventory(setInventory: (e:InventoryItem[])=>void){
    try{
        const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_INVENTORY_COLLECTION_ID)
        setInventory(data.documents);
    }catch(err){
        console.error(err)
    }
}

async function handleAddToCart(cart: CartItem[], $id: string | undefined, inventory: InventoryItem[], quantity: number | undefined){
    try{
        const findItem = inventory.filter((item:InventoryItem)=>item.$id === $id)

        const findCartItem = cart.filter((cartItem:CartItem)=>cartItem.name === findItem[0].name && localStorage.getItem("email") === cartItem.email);

        if(!findCartItem.length){
            const item = {  
                "itemID": findItem[0].$id,
                "category": findItem[0].category,
                "description": findItem[0].description,
                "manufacturer": findItem[0].manufacturer,
                "name": findItem[0].name,
                "price": findItem[0].price,
                "email": localStorage.getItem("email"),
                "quantity": quantity ? quantity: 1
            }
           
            await api.createDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_CART_COLLECTION_ID, item, [Permission.read(Role.any())])
    
            window.location.reload();
        }else{
            const item = {  
                "itemID": findItem[0].$id,
                "category": findItem[0].category,
                "description": findItem[0].description,
                "manufacturer": findItem[0].manufacturer,
                "name": findItem[0].name,
                "price": findItem[0].price,
                "email": localStorage.getItem("email"),
                "quantity": quantity ? quantity + findCartItem[0].quantity : 1 + findCartItem[0].quantity
            }
           
            await api.updateDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_CART_COLLECTION_ID, findCartItem[0].$id, item)
    
            window.location.reload();
        }
 

    }catch(err){
        console.error(err);
    }
}

function renderInventoryQuantityOptions(setItemQuantity:(e:number)=>void, quantity: number){
    const options = []
    for(let i = 1; i <= quantity; i++){
        options.push(<option key = {`option-${i}`} value={i}>{i}</option>)
    }
    return(
        <select onChange = {(e)=>setItemQuantity(parseInt(e.target.value))}>
            {options}
        </select>
    )
}


export function EditCart(quantity: number){
    console.log(quantity)
}

export function CurrentInventory(cart: CartItem[], inventory: InventoryItem[], setItemQuantity: (e:number)=>void, quantity: number | undefined){
    //iterate through inventory
    //find if there are any duplicates
    //if there are, don't add them to the array, but instead add 1 to quantity amount      

    return inventory.map((inventoryItems:InventoryItem,i:number)=>{
        return(
            <section key = {inventoryItems.$id} className = {"flex flex-col item borderSeperation"}>
                    <h2>{inventoryItems.name}</h2>
                    <h2>Quantity: {inventoryItems.quantity}</h2>
                    <h2>${inventoryItems.price}</h2>
                    <p>{inventoryItems.description}</p>
                    {renderInventoryQuantityOptions((e)=>setItemQuantity(e), inventoryItems.quantity)}
                    {Button({classNames: "clearButton", text: "Add To Cart", handleButtonClick: ()=> {handleAddToCart(cart, inventoryItems.$id,inventory, quantity)}})}
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

            // window.location.reload();
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

            // window.location.reload();
        }

       
    }catch(err){
        console.error(err);
    }
}


  function renderQuantityOptions(setItemQuantity:(e:number)=>void){
        const options = []
        for(let i = 1; i <= 50; i++){
            options.push(<option key = {`option-${i}`} value={i}>{i}</option>)
        }
        return(
            <select onChange = {(e)=>setItemQuantity(parseInt(e.target.value))}>
                {options}
            </select>
        )
    }


export function DefaultInventory(props: DefaultInventoryDisplay){

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
                {renderQuantityOptions((e:number)=>props.setItemQuantity(e))}
             {Button({text:"Purchase Item", handleButtonClick: ()=>{HandlePurchaseItem({itemQuantity: props.itemQuantity, inventory: {name: itemName, category: itemCategory, quantity: quantity, manufacturer: itemManufacturer, reOrderLV: itemReorderLV, price: price, description: itemDescription}})}})}
         </section>
     )  
     })
}

export async function GetCart(setCart: (e:CartItem[])=>void){
    try{    
        const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_CART_COLLECTION_ID);
        setCart(data.documents)
    }catch(err){
        console.error(err)
    }
}