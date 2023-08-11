import React, {useState, useEffect} from "react"
import {GetCart, CartItem, GetInventory, InventoryItem} from "../../hooks/InventoryHooks"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import {ButtonLink} from "../../components/Button"
import {RenderCart} from "../../hooks/CartHooks"

export default function Cart(){

    const [cart, setCart] = useState<CartItem[]>([])
    const [inventory, setInventory] = useState<InventoryItem[]>([])
    const [cartItemQuantity, setCartItemQuantity] = useState<string>()

    useEffect(()=>{
        GetCart((e:CartItem[])=>setCart(e))
    },[])

    useEffect(()=>{
        GetInventory((e:InventoryItem[])=>setInventory(e))
    },[])


    return(
        <main id = "cart">
            <Nav pageHeading = {"Cart"}/>
            
            <div className="flex flex-col alignStart">
            {ButtonLink({classNames: "goBack", text: "Inventory", domain: "/inventory"})}
            {ButtonLink({classNames: "goBack", text: "Employee Shop", domain: "/inventoryShop"})}
            {ButtonLink({classNames: "goBack", text: "Settings", domain: "/settings"})}

            </div>

            <section className = "flex justifyBetween cart">

                <section className = "flex flex-col cartContainer">
                    <div>
                    {RenderCart(cart, inventory, cartItemQuantity, (e:string)=>setCartItemQuantity(e))}

                    </div>

                </section>

            </section>
            <Footer/>
        </main>
    )
}