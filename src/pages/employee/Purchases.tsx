import React, {useState, useEffect} from "react"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import EmployeeNav from "../../components/EmployeeNav"
import BarGraph from "../../components/Graphs/BarGraph"
import LineGraph from "../../components/Graphs/LineGraph"
import HorizontalBarGraph from "../../components/Graphs/HorizontalBarGraph"

import {GetPurchasedProfit, GetPurchases, PurchasedItem, GetPurchasedQuantities} from "../../hooks/PurchasesHooks"
import {Button} from "../../components/Button"

export default function Purchases(){

    const [purchases,setPurchases]= useState<PurchasedItem[]>([]);
    const [display, setDisplay] = useState<string>("bar");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
  
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

    useEffect(()=>{
        GetPurchases((e:PurchasedItem[])=>setPurchases(e));
    },[])


    return(
        <main id = "purchase">
            <Nav pageHeading = {"Purchase History"}/>

            <EmployeeNav/>

                <section className = "flex flex-col alignCenter justifyBetween">

                    <section className = "flex justifyBetween buttons">
                        {Button({text:"", handleButtonClick: ()=>setDisplay("bar"), classNames: "fa-solid fa-chart-column"})}
                        {Button({text:"", handleButtonClick: ()=>setDisplay("line"), classNames: "fa-solid fa-chart-line"})}
                        {Button({text:"", handleButtonClick: ()=>setDisplay("horizontalBar"), classNames: "fa-solid fa-chart-bar"})}

                    </section>

                    <section className = "graph">
                        {display === "bar" ? <BarGraph cartLength = {purchases.length} profits = {GetPurchasedProfit(purchases)} quantities ={GetPurchasedQuantities(purchases)} currentPage = {currentPage} setCurrentPage={(e:number)=>setCurrentPage(e)} rowsPerPage = {rowsPerPage} startIndex = {startIndex} endIndex = {endIndex}/> : ""}
                    </section>

                    <section className = "graph">
                        {display === "line" ? <LineGraph cartLength = {purchases.length} profits = {GetPurchasedProfit(purchases)} quantities ={GetPurchasedQuantities(purchases)} currentPage = {currentPage} setCurrentPage={(e:number)=>setCurrentPage(e)} rowsPerPage = {rowsPerPage} startIndex = {startIndex} endIndex = {endIndex}/> : ""}
                    </section>

                    <section className ="graph">
                        {display === "horizontalBar" ? <HorizontalBarGraph quantities = {GetPurchasedQuantities(purchases)} cartLength = {purchases.length} profits = {GetPurchasedProfit(purchases)} currentPage = {currentPage} setCurrentPage = {(e:number)=>setCurrentPage(e)} rowsPerPage={rowsPerPage} startIndex = {startIndex} endIndex={endIndex}/> : ""}
                    </section>

                        

                </section>
            <Footer/>
        </main>
    )
}