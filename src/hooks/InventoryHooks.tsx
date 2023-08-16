import api from "../api/api"
import React from "react"
import {Permission, Role} from "appwrite"
import {items} from "../api/inventory"
import {Button} from "../components/Button"
import {CartItem, handleAddToCart} from "./CartHooks"

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

interface InventoryQuantity{
    itemName: string, 
    cart: CartItem[], 
    setItemQuantity:(e:number)=>void, 
    quantity: number
}

interface DisplayCurrentInventory{
    cart: CartItem[], 
    inventory: InventoryItem[], 
    setItemQuantity: (e:number)=>void, 
    quantity: number | undefined
}

//get inventory database
export async function GetInventory(setInventory: (e:InventoryItem[])=>void){
    try{
        const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_INVENTORY_COLLECTION_ID)
        setInventory(data.documents);
    }catch(err){
        console.error(err)
    }
}

//render quantites of items in inventory
function renderInventoryQuantityOptions(props: InventoryQuantity){
    const options = []

    //find inventory item in cart
    const findItemInCart = props.cart.filter((item: CartItem)=>item.name === props.itemName);

    //if a duplicate item exists, change display of item quantity in inventory by subtracting the itme quantity in the cart
    if(findItemInCart.length){
        const cartItemQuantity = parseInt(findItemInCart[0].quantity)
        props.quantity -= cartItemQuantity
    }

    //render quantity numbers, accounting for undefined/zero values
    for(let i = 1; i <= props.quantity; i++){
        if(!props.quantity){
            options.push(<option key = {`option-0`} value={0}>{0}</option>)
        }else{
            options.push(<option key = {`option-${i}`} value={i}>{i}</option>)
        }
    }

    return(
        <select onChange = {(e)=>props.setItemQuantity(parseInt(e.target.value))}>
            {options}
        </select>
    )
}

//Render the current inventory avaiable, checking for duplicates in the cart
export function CurrentInventory(props: DisplayCurrentInventory){    
    return props.inventory.map((inventoryItems:InventoryItem,i:number)=>{

        const findItemInCart = props.cart.filter((item: CartItem)=>item.name === inventoryItems.name);
        const cartItemQuantity = parseInt(findItemInCart[0]?.quantity);

        return(
            <section key = {inventoryItems.$id} className = {"flex flex-col item borderSeperation"}>
                    <h2>{inventoryItems.name}</h2>
                    <h2>Quantity: {findItemInCart.length ? inventoryItems.quantity - cartItemQuantity : inventoryItems.quantity}</h2>
                    <h2>${inventoryItems.price}</h2>
                    <p>{inventoryItems.description}</p>
                    {renderInventoryQuantityOptions({itemName: inventoryItems.name, cart: props.cart, setItemQuantity: (e)=>props.setItemQuantity(e), quantity: inventoryItems.quantity})}
                    {Button({classNames: "clearButton", text: "Add To Cart", handleButtonClick: ()=> {handleAddToCart({cart: props.cart, $id: inventoryItems.$id,inventory: props.inventory, quantity: props.quantity})}})}
            </section>
        )
    })
}

//when the user adds an item from the store to add to the inventory
export async function HandlePurchaseItem(props: Item){
    try{
        const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_INVENTORY_COLLECTION_ID)

        const checkForDuplicates = await data.documents.filter((inventory:InventoryItem)=>inventory.name === props.inventory.name);

        //check for duplicates in the inventory database
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

            //create a new inventory object if no duplicate exists
            await api.createDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_INVENTORY_COLLECTION_ID, item, [Permission.read(Role.any())])

            window.location.reload();
        }else{

            let quantity = 0

            //checks if user changes the quantity of the item using the select input
            if(props.itemQuantity){
                //adds the selected value from the select input to the current existing quantity in the inventory
                quantity = checkForDuplicates[0].quantity+=props.itemQuantity
            }else{
                //adds 1 to the current existing quantity in the inventory
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

            //updates the quantity of the item in the inventory
            await api.updateDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_INVENTORY_COLLECTION_ID, checkForDuplicates[0].$id,item)

            window.location.reload();
        }

       
    }catch(err){
        console.error(err);
    }
}

//render quantites of items in store
function renderQuantityOptions(setItemQuantity:(e:number)=>void){
      const options = [];

      for(let i = 1; i <= 50; i++){
          options.push(<option key = {`option-${i}`} value={i}>{i}</option>)
      }
      
      return(
          <select onChange = {(e)=>setItemQuantity(parseInt(e.target.value))}>
              {options}
          </select>
      )
}

//Render the store for purchase to add items to inventory
export function DefaultInventory(props: DefaultInventoryDisplay){

    //iterate through static data in api/inventory
    return items.map((inventoryItem,i)=>{

        //find item in static data currently in inventory database
        const findItem: InventoryItem[] = props.inventory.filter((value:InventoryItem) => value.name === inventoryItem.itemName);
        
        let price = inventoryItem.pricePerUnit.toString()

        //modify format of price in static database so it resembles a dollar value
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

