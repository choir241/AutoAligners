import {useState, useEffect, useContext} from "react"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import {CurrentInventory} from "../../hooks/InventoryHooks"
import {CartItem, InventoryItem} from "../../middleware/Interfaces"
import {APIContext} from "../../middleware/Context"
import {GetInventory, GetCart} from "../../hooks/ApiCalls"

export default function Inventory(){

    const [inventory, setInventory] = useState<InventoryItem[]>([])
    const [itemQuantity, setItemQuantity] = useState<number>(0);
    const [cart, setCart] = useState<CartItem[]>([]);

    // const inventory = useContext(APIContext);

    useEffect(()=>{
        GetInventory((e:InventoryItem[])=>setInventory(e))
    },[])

    useEffect(()=>{
        GetCart((e:CartItem[])=>setCart(e));
    },[])

    console.log(inventory);

    return(
        <main id = "inventory">
            <Nav pageHeading = {"Current Inventory"}/>
                <section className = "itemContainer flex">
                    {CurrentInventory({cart: cart, inventory: inventory, setItemQuantity: (e:number)=>setItemQuantity(e), quantity: itemQuantity})}
                </section>
            <Footer/>
        </main>
    )
}