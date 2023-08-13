import React, {useState, useEffect} from "react"
import {GetInventory, InventoryItem} from "../../hooks/InventoryHooks"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import {RenderCart, GetCart, CartItem} from "../../hooks/CartHooks"
import EmployeeNav from "../../components/EmployeeNav"

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
            
            <EmployeeNav/>

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