import React from "react"
import {Button} from "../components/Button"
import api from "../api/api"
import {InventoryItem} from "./InventoryHooks"
import {Permission, Role} from "appwrite"
import {toast} from "react-toastify"
import Assets from "../components/Assets"

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

export interface CardInfo{
    cardNumber: number,
    securityNumber: string,
    expirationDate: string,
    type: string,
}

interface renderCartQuantity{
    name:string, 
    quantity: string, 
    inventory: InventoryItem[],
    cartItemQuantity: string | undefined,
    setCartItemQuantity: (e:string) => void
}

export function RenderPaymentForm(cardInfo: CardInfo | undefined, setCardInfo: (e:CardInfo)=>void){
    return(
        <section className = "flex payment">
            <form className = "flex flex-col alignCenter">
                <input type = "text" defaultValue = {cardInfo?.cardNumber} disabled/>
                <input type = "text" defaultValue = {cardInfo?.expirationDate} disabled/>
                <input type = "text" defaultValue = {cardInfo?.securityNumber} maxLength={4} disabled/>
            </form>
    
            <section className = "flex justifyBetween">
                <div className="imageContainer" 
                onClick = {()=>
                    setCardInfo({
                        "type": "Visa",
                        "cardNumber": 4716108999716531,
                        "securityNumber": "257",
                        "expirationDate": "01/32"})}>
                    <img src = {Assets.visa} alt = "The logo for VISA, with a purple border on top, gold border on the bottom, the text visa in all capitals in purple text in the center, and a white background."/>
                </div>
                <div className="imageContainer" 
                    onClick = {()=>
                        setCardInfo({
                        "type": "Master Card",
                        "cardNumber": 5281037048916168,
                        "securityNumber": "043",
                        "expirationDate": "12/84"})}>
                    <img src = {Assets.mastercard} alt = "The logo for MasterCard, with a purple background, and a ven diagram where the left circle is red, the right circle is gold, and the text mastercard has the m and c capitalized and in the center of the venn diagram."/>
                </div>
                <div className="imageContainer" 
                    onClick = {()=>
                        setCardInfo({
                        "type": "American Express",
                        "cardNumber": 342498818630298,
                        "securityNumber": "3156",
                        "expirationDate": "05/99"
                        })
                    }>
                    <img src = {Assets.amex} alt = "The logo for American Expresss, with a sky blue background, white border encasing the text amex, which is all upper cased and in the center."/>
                </div>
            </section> 
    </section>
    )
}

export async function GetCart(setCart: (e:CartItem[])=>void){
    try{    
        const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_CART_COLLECTION_ID);
        setCart(data.documents)
    }catch(err){
        console.error(err)
    }
}

export async function handleAddToCart(cart: CartItem[], $id: string | undefined, inventory: InventoryItem[], quantity: number | undefined){
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

export async function EditCart(item: CartItem){
    try{
        const cartItem = {  
            "itemID": item.$id,
            "category": item.category,
            "description": item.description,
            "manufacturer": item.manufacturer,
            "name": item.name,
            "price": item.price,
            "email": localStorage.getItem("email"),
            "quantity": item.quantity
        }
       
        await api.updateDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_CART_COLLECTION_ID, item.$id, cartItem)

        window.location.reload();
    }catch(err){
        console.error(err)
    }
}

export function RenderCartQuantity(props: renderCartQuantity){

    const cartQuantity = []

    const findItem = props?.inventory.filter((item:InventoryItem)=>item.name === props.name)

    for(let i = 1;i <= findItem[0]?.quantity; i++){
            cartQuantity.push(<option key = {`k-${i}`}>{i}</option>)
    }
    
    return(
        <select name="" id="" defaultValue = {props.cartItemQuantity ? props.cartItemQuantity : props?.quantity}onChange = {(e)=>props.setCartItemQuantity(e.target.value)}>
            {cartQuantity}
        </select>
    )
}

async function handleDeleteCartItem(cartID: string){
    try{
        const data = await api.deleteDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_CART_COLLECTION_ID, cartID);

        console.log(data);

        if(data){
            window.location.reload();
        }

    }catch(err){
        console.error(err);
    }
}

async function handleMakeCartPurchase(item: CartItem[], cardInfo: CardInfo | undefined, total: string){
    try{
        if(item && cardInfo?.cardNumber){

        const itemsAsString = item.map((item:CartItem)=>JSON.stringify(item))

        const cartItems = {
            "cartItems": itemsAsString
        }

        const inventoryData = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_INVENTORY_COLLECTION_ID)

        if(item){

        inventoryData.documents.forEach(async(inventoryItem:InventoryItem)=>{
            for(let i = 0; i < item.length; i++){
                if(item[i].name === inventoryItem.name){
                    const quantity = Number(inventoryItem.quantity) - Number(item[i].quantity)
                    const inventoryID = inventoryItem.$id

                    const cartItem = {
                        name: inventoryItem.name,
                        price: inventoryItem.price,
                        manufacturer: inventoryItem.manufacturer,
                        description: inventoryItem.description,
                        category: inventoryItem.category,
                        quantity: quantity
                    } 

                    await api.updateDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_INVENTORY_COLLECTION_ID, inventoryID, cartItem)


                    if(inventoryItem.reOrderLV >= quantity){

                        const updateCartItem = {
                            name: inventoryItem.name,
                            price: inventoryItem.price,
                            manufacturer: inventoryItem.manufacturer,
                            description: inventoryItem.description,
                            category: inventoryItem.category,
                            quantity: quantity + inventoryItem.reOrderLV
                        } 
    

                        await api.updateDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_INVENTORY_COLLECTION_ID, inventoryID, updateCartItem)
                    }
                }
            }
        })

        const data = await api.createDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_PURCHASES_COLLECTION_ID, cartItems, [Permission.read(Role.any())])

        for(let i = 0; i<item.length;i++){
            await api.deleteDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_CART_COLLECTION_ID, item[i].$id);
        }

        const cardNumber = cardInfo?.cardNumber
        const cardExpiration = cardInfo?.expirationDate
        const cardSecurity = cardInfo?.securityNumber
        const cardType = cardInfo?.type

        const paymentObj ={
            cardNumber,
            cardExpiration,
            cardSecurity,
            cardType,
            total
        }

        const response = await api.createDocument(process.env.REACT_APP_CART_DATABASE_ID, process.env.REACT_APP_PAYMENTS_COLLECTION_ID, paymentObj, [Permission.read(Role.any())])

        if(data && response){
            window.location.reload();
        }

        }


        }else{
            toast.error("Error Occured, please ensure all items are filled out before trying again");
        }

    }catch(err){
        console.error(err)
    }
} 

export function RenderCart(cart: CartItem[], inventory: InventoryItem[], cartItemQuantity: string | undefined, setCartItemQuantity: (e:string)=>void, cardInfo: CardInfo | undefined, setCardInfo: (e:CardInfo)=>void){

    if(cart?.length){
        const findUsersCart = cart.filter((item: CartItem, i: number)=>item.email === localStorage.getItem("email"));

        let total = ""
        let cartTotal:number = 0
        let decimalTotal:number = 0
        return findUsersCart.map((item: CartItem,i: number)=>{

            let itemPriceTotal = 0
            itemPriceTotal = Number(item.price) * parseInt(item.quantity)

            cartTotal += parseInt(itemPriceTotal.toString().split(".")[0])

            if(itemPriceTotal.toString().includes(".")){
                decimalTotal += parseInt(itemPriceTotal.toFixed(2).toString().split(".")[1]) 
            }

            if(i === cart.length-1){

                let decimalNumbers = decimalTotal.toString().split("")

                if(decimalNumbers.length > 2){
                    const remainder:string = decimalNumbers.shift() as string
                    cartTotal += parseInt(remainder)
                }

                const decimals = decimalNumbers.join("")

                total = cartTotal.toString()
                total += "." + decimals
            }

            const checkCartQuantity = cartItemQuantity ? cartItemQuantity : item.quantity
            total = Number(total).toFixed(2)

            if(cart.length === 1){

            return(
                    <section className = "flex flex-col" key = {i}>

                        <div className="flex justifyBetween">
                            <div className="flex justifyBetween alignCenter">
                                <h2>{item.name}</h2><i className = "fa-solid fa-xmark button" onClick = {()=>handleDeleteCartItem(item.$id)}></i>
                            </div>
                                <h2>Quantity: {RenderCartQuantity({name: item.name, quantity: item.quantity, inventory: inventory, cartItemQuantity: cartItemQuantity, setCartItemQuantity: (e:string)=>setCartItemQuantity(e)})} {Button({text: "Update", handleButtonClick: ()=>EditCart({name: item.name, price: item.price, email: item.email, quantity: checkCartQuantity, manufacturer: item.manufacturer, description: item.description, category: item.category, $id: item.$id, itemID: item.itemID})})}</h2>
                        <h2>${parseInt(item?.quantity) > 1 ? itemPriceTotal.toFixed(2)  : item.price}</h2>
                        </div>
                        <div className = "flex cartTotal justifyBetween" key = {total}><h2>Total: </h2> <h2>${total}</h2></div>

                        {RenderPaymentForm(cardInfo, (e:CardInfo)=>setCardInfo(e))}
                
                        {Button({text: "Purchase Items", handleButtonClick: ()=>handleMakeCartPurchase(cart, cardInfo, total)})}
                    </section>
                )

            }else if(cart.length > 1 && i !== cart.length-1){
                return(
                    <section className = "flex flex-col" key = {i}>

                    <div className="flex justifyBetween">
                    <h2>{item.name} <i className = "fa-solid fa-xmark button" onClick = {()=>handleDeleteCartItem(item.$id)}></i></h2>
                    <h2>${item.price}</h2>
                    <h2>Quantity: {RenderCartQuantity({name: item.name, quantity: item.quantity, inventory: inventory, cartItemQuantity: cartItemQuantity, setCartItemQuantity: (e:string)=>setCartItemQuantity(e)})} {Button({text: "Update", handleButtonClick: ()=>EditCart({name: item.name, price: item.price, email: item.email, quantity: checkCartQuantity, manufacturer: item.manufacturer, description: item.description, category: item.category, $id: item.$id, itemID: item.itemID})})}</h2>
                    <h2>${parseInt(item?.quantity) > 1 ? itemPriceTotal.toFixed(2)   : item.price}</h2>
                    </div>

                </section>
                )

            }else if(i === cart.length-1){
                return(
                    <section className = "flex flex-col" key = {i}>

                    <div className="flex justifyBetween">
                    <h2>{item.name} <i className = "fa-solid fa-xmark button" onClick = {()=>handleDeleteCartItem(item.$id)}></i></h2>
                    <h2>${item.price}</h2>
                    <h2>Quantity: {RenderCartQuantity({name: item.name, quantity: item.quantity, inventory: inventory, cartItemQuantity: cartItemQuantity, setCartItemQuantity: (e:string)=>setCartItemQuantity(e)})} {Button({text: "Update", handleButtonClick: ()=>EditCart({name: item.name, price: item.price, email: item.email, quantity: checkCartQuantity, manufacturer: item.manufacturer, description: item.description, category: item.category, $id: item.$id, itemID: item.itemID})})}</h2>
                    <h2>${parseInt(item?.quantity) > 1 ? itemPriceTotal.toFixed(2)   : item.price}</h2>

                    </div>

                    <div className = "flex cartTotal justifyBetween" key = {total}><h2>Total: </h2><h2>${total}</h2></div>

                    {RenderPaymentForm(cardInfo, (e:CardInfo)=>setCardInfo(e))}

                    {Button({text: "Purchase Items", handleButtonClick: ()=>handleMakeCartPurchase(cart, cardInfo, total)})}

                </section>
                )
            }



        })
    }else{
            return(
                <section className = "flex flex-col">
                    <h2>No items in the cart currently</h2>
                </section>
            )

    }
}

