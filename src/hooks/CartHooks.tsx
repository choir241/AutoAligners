import React from "react"
import {InventoryItem, CartItem, EditCart} from "./InventoryHooks"
import {Button} from "../components/Button"

interface RenderCartQuantity{
    name:string, 
    quantity: string, 
    inventory: InventoryItem[],
    cartItemQuantity: string | undefined,
    setCartItemQuantity: (e:string) => void
}

export function RenderCartQuantity(props: RenderCartQuantity){

    const cartQuantity = []

    const findItem = props?.inventory.filter((item:InventoryItem)=>item.name === props.name)

    for(let i = 1;i <= findItem[0].quantity; i++){
            cartQuantity.push(<option key = {`k-${i}`}>{i}</option>)
    }
    
    return(
        <select name="" id="" defaultValue = {props.cartItemQuantity ? props.cartItemQuantity : props?.quantity}onChange = {(e)=>props.setCartItemQuantity(e.target.value)}>
            {cartQuantity}
        </select>
    )
}

export function RenderCart(cart: CartItem[], inventory: InventoryItem[], cartItemQuantity: string | undefined, setCartItemQuantity: (e:string)=>void){

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
                decimalTotal += parseInt(itemPriceTotal.toString().split(".")[1]) 

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
                                
            if(cart.length === 1){

                
                return(
                    <section className = "flex flex-col" key = {i}>

                        <div className="flex justifyBetween">
                        <h2>{item.name} <i className = "fa-solid fa-xmark button"></i></h2>
                        <h2>Quantity: {RenderCartQuantity({name: item.name, quantity: item.quantity, inventory: inventory, cartItemQuantity: cartItemQuantity, setCartItemQuantity: (e:string)=>setCartItemQuantity(e)})} {Button({text: "Update", handleButtonClick: ()=>EditCart({name: item.name, price: item.price, email: item.email, quantity: checkCartQuantity, manufacturer: item.manufacturer, description: item.description, category: item.category, $id: item.$id, itemID: item.itemID})})}</h2>
                        <h2>${parseInt(item?.quantity) > 1 ? itemPriceTotal  : item.price}</h2>
                        </div>
                        <div className = "flex cartTotal justifyBetween" key = {total}><h2>Total: </h2> <h2>${total}</h2></div>

                    </section>
                )

            }else if(cart.length > 1 && i !== cart.length-1){
                return(
                    <section className = "flex flex-col" key = {i}>

                    <div className="flex justifyBetween">
                    <h2>{item.name} <i className = "fa-solid fa-xmark button"></i></h2>
                    <h2>${item.price}</h2>
                    <h2>Quantity: {RenderCartQuantity({name: item.name, quantity: item.quantity, inventory: inventory, cartItemQuantity: cartItemQuantity, setCartItemQuantity: (e:string)=>setCartItemQuantity(e)})} {Button({text: "Update", handleButtonClick: ()=>EditCart({name: item.name, price: item.price, email: item.email, quantity: checkCartQuantity, manufacturer: item.manufacturer, description: item.description, category: item.category, $id: item.$id, itemID: item.itemID})})}</h2>
                    <h2>${parseInt(item?.quantity) > 1 ? itemPriceTotal  : item.price}</h2>
                    </div>

                </section>
                )

            }else if(i === cart.length-1){
                return(
                    <section className = "flex flex-col" key = {i}>

                    <div className="flex justifyBetween">
                    <h2>{item.name} <i className = "fa-solid fa-xmark button"></i></h2>
                    <h2>${item.price}</h2>
                    <h2>Quantity: {RenderCartQuantity({name: item.name, quantity: item.quantity, inventory: inventory, cartItemQuantity: cartItemQuantity, setCartItemQuantity: (e:string)=>setCartItemQuantity(e)})} {Button({text: "Update", handleButtonClick: ()=>EditCart({name: item.name, price: item.price, email: item.email, quantity: checkCartQuantity, manufacturer: item.manufacturer, description: item.description, category: item.category, $id: item.$id, itemID: item.itemID})})}</h2>
                    <h2>${parseInt(item?.quantity) > 1 ? itemPriceTotal  : item.price}</h2>

                    </div>

                    <div className = "flex cartTotal justifyBetween" key = {total}><h2>Total: </h2><h2>${total}</h2></div>

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
