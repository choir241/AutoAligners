import React, {useState, useEffect} from "react"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import EmployeeNav from "../../components/EmployeeNav"
import api from "../../api/api"

interface purchasedItem{
    cartItems: PurchasedCartItem[],
    $createdAt: string,
    $id: string
}

interface PurchasedCartItem{
    $createdAt: string,
    name: string,
    price: string
}

export default function Purchases(){

    const [purchases,setPurchases] = useState([]);

    useEffect(()=>{
       
        async function GetPurchases(){
           const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_PURCHASES_COLLECTION_ID);

           setPurchases(data.documents);
        }

        GetPurchases();
    },[])

    function RenderPurchases(){
        if(purchases.length){
            return purchases.map((purchase:purchasedItem)=>{
                const items = purchase.cartItems

                let total = ""
                let cartTotal:number = 0
                let decimalTotal:number = 0
            
            const itemsPurchased = items.map((item: any,i:number)=>{
                    item = JSON.parse(item)

                    let itemPriceTotal = 0
                    itemPriceTotal = Number(item.price) * parseInt(item.quantity)

            cartTotal += parseInt(itemPriceTotal.toString().split(".")[0])


            if(itemPriceTotal.toString().includes(".")){
                decimalTotal += parseInt(itemPriceTotal.toFixed(2).toString().split(".")[1]) 
            }

            if(i === items.length-1){

                let decimalNumbers = decimalTotal.toString().split("")

                if(decimalNumbers.length > 2){
                    const remainder:string = decimalNumbers.shift() as string
                    cartTotal += parseInt(remainder)
                }

                const decimals = decimalNumbers.join("")

                total = cartTotal.toString()
                total += "." + decimals
            }

            total = Number(total).toFixed(2)


                if(i !== items.length-1){
                    return(
                        <section className = "purchaseItem" key = {`${purchase.$createdAt}-${item.$createdAt}`}>
                        <div className = "flex flex-col">
                            <h2>{item.name}</h2><h2>Quantity:{item.quantity}</h2><h2>${itemPriceTotal.toFixed(2)}</h2>

                        </div>
    
                    </section>
                    )

                }else{
                    return(
                        <section className = "purchaseItem" key = {`${purchase.$createdAt}-${item.$createdAt}`}>
                            <div className = "flex flex-col">
                            <h2>{item.name}</h2>
                            <h2>Quantity: {item.quantity}</h2>
                            <h2>${itemPriceTotal.toFixed(2)}</h2>
                            <h2>Total: ${total}</h2>
                            </div>
                        </section>
                    )
                }
                    
                })

            return (
                <section className = "flex" key = {purchase.$id}>
                    {itemsPurchased}
                </section>
            )
          
            })
        }
    }



    return(
        <main id = "purchase">
            <Nav pageHeading = {"Purchase History"}/>
            <EmployeeNav/>
                <section>
                    {RenderPurchases()}
                </section>
            <Footer/>
        </main>
    )
}