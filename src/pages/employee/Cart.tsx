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
            const findUsersCart = cart.filter((item: CartItem, i: number)=>item.email === localStorage.getItem("email"));
            const cartCount:{[key:string]: number} = {};
            cart.forEach((item: CartItem)=>cartCount[item.name] = 0);
            cart.forEach((item: CartItem)=>cartCount[item.name]++);            

            let total = ""
            let cartTotal:number = 0
            let decimalTotal:number = 0
            return findUsersCart.map((item: CartItem,i: number)=>{

                cartTotal += parseInt(item.price.split(".")[0])
                decimalTotal += parseInt(item.price.split(".")[1])

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

               
                cartCount[item.name] -= 1
                    

                if(i === findUsersCart.length-1){
                    return(
                        <div className = "flex cartTotal justifyBetween" key = {total}><h2>Total: </h2><h2>${total}</h2></div>
                    )
                }

                if(cartCount[item.name] === 1){
                    return(
                        <section className = "flex flex-col" key = {i}>

                            <div className="flex justifyBetween">
                            <h2>{item.name}</h2>
                            <h2>${item.price}</h2>
                            </div>
                        </section>
                    )
                }
            })
        }
    }

    return(
        <main id = "cart">
            <Nav pageHeading = {"Cart"}/>
            <section className = "flex justifyBetween cart">

                <section className = "flex flex-col cartContainer">
                    <div>
                    {RenderCart()}

                    </div>

                </section>

                <form>
                    <input></input>
                </form>
            </section>
            <Footer/>
        </main>
    )
}