import React, {useState, useEffect} from "react"
import {GetInventory, InventoryItem} from "../../hooks/InventoryHooks"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import {RenderCart, GetCart, CartItem, CardInfo} from "../../hooks/CartHooks"

export default function Cart(){

    const [cart, setCart] = useState<CartItem[]>([])
    const [inventory, setInventory] = useState<InventoryItem[]>([])
    const [cartItemQuantity, setCartItemQuantity] = useState<string>()
    const [cardInfo, setCardInfo] = useState<CardInfo>()

    useEffect(()=>{
        GetCart((e:CartItem[])=>setCart(e))
    },[])

    useEffect(()=>{
        GetInventory((e:InventoryItem[])=>setInventory(e))
    },[])


    return(
        <main id = "cart">
            <Nav pageHeading = {"Cart"}/>
            
            <section className = "flex justifyBetween cart">

                <section className = "flex flex-col cartContainer">
                    {RenderCart(cart, inventory, cartItemQuantity, (e:string)=>setCartItemQuantity(e), cardInfo, (e:CardInfo)=>setCardInfo(e))}
                </section>

            </section>

            <Footer/>
        </main>
    )
}