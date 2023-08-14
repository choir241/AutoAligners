import React, {useState, useEffect} from "react"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import EmployeeNav from "../../components/EmployeeNav"
import LineGraph from "../../components/Graph"
import {GetPurchasedProfit, GetPurchases, PurchasedItem, GetPurchasedQuantities} from "../../hooks/PurchasesHooks"

export default function Purchases(){

    const [purchases,setPurchases]= useState<PurchasedItem[]>([]);
  
    useEffect(()=>{
        GetPurchases((e:PurchasedItem[])=>setPurchases(e));
    },[])

    return(
        <main id = "purchase">
            <Nav pageHeading = {"Purchase History"}/>
            <EmployeeNav/>
                <section>
                    <LineGraph cartLength = {purchases.length} profits = {GetPurchasedProfit(purchases)} quantities ={GetPurchasedQuantities(purchases)}/>
                </section>
            <Footer/>
        </main>
    )
}