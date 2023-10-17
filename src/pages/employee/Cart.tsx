import {useState, useEffect} from "react"
import {GetInventory} from "../../hooks/InventoryHooks"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import {RenderCart, GetCart, RenderPaymentForm} from "../../hooks/CartHooks"
import PaginatedButtons from "../../components/Graphs/PaginatedButtons"
import {CartItem, CardInfo, InventoryItem} from "../../middleware/Interfaces"

export default function Cart(){

    const [cart, setCart] = useState<CartItem[]>([])
    const [inventory, setInventory] = useState<InventoryItem[]>([])
    const [cartItemQuantity, setCartItemQuantity] = useState<string>()
    const [cardInfo, setCardInfo] = useState<CardInfo>()
    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 2;

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;  

    useEffect(()=>{
        GetCart((e:CartItem[])=>setCart(e))
    },[])

    useEffect(()=>{
        GetInventory((e:InventoryItem[])=>setInventory(e))
    },[])


    return(
        <main id = "cart">
            <Nav pageHeading = {"Cart"}/>
            
                <section className = "cartContainer flex justifyBetween">

                    <PaginatedButtons className = {`flex flex-col alignCenter`} currentPage = {currentPage} cartLength = {cart.length} setCurrentPage = {(e:number)=>setCurrentPage(e)} rowsPerPage={rowsPerPage}/>

                    <section className = {`flex flex-col justifyCenter`}>
                        {RenderCart({cart: cart, inventory: inventory, cartItemQuantity: cartItemQuantity, setCartItemQuantity: (e:string)=>setCartItemQuantity(e), cardInfo: cardInfo, setCardInfo: (e:CardInfo)=>setCardInfo(e), startIndex: startIndex, endIndex: endIndex})}
                    </section>

                    {RenderPaymentForm(cardInfo, (e:CardInfo)=>setCardInfo(e))}
                </section>


            <Footer/>
        </main>
    )
}