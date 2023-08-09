import React, {useState, useEffect} from "react"
import {GetCart, CartItem} from "../../hooks/InventoryHooks"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"

export default function Cart(){

    const [cart, setCart] = useState<CartItem[]>([])
    
    useEffect(()=>{
        GetCart((e:CartItem[])=>setCart(e))
    },[])

    function RenderCart(){
        if(cart?.length){
            const findUsersCart = cart.filter((item: CartItem)=>item.email === localStorage.getItem("email"));
            return findUsersCart.map((item: CartItem)=>{
                return(
                    <section>
                        <h2>{item.name}</h2>
                        <h2>{item.price}</h2>
                    </section>
                )
            })
        }
    }

    return(
        <main>
            <Nav pageHeading = {"Cart"}/>
            <section>
                {RenderCart()}
            </section>
            <Footer/>
        </main>
    )
}