import React, {useState, useEffect} from "react"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import {GetClientFinance, ClientFinance, RenderClientFinance} from "../../hooks/FinanceHooks"
import PaginatedButtons from "../../components/Graphs/PaginatedButtons"

export default function DisplayClientFinance(){

    const [clientFinance, setClientFinance] = useState<ClientFinance[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;  

    useEffect(()=>{
        GetClientFinance((e:ClientFinance[])=>setClientFinance(e))
    },[])

    return (
        <main>
            <Nav pageHeading = {"Client Finances"}/>

            <section>
            <PaginatedButtons currentPage = {currentPage} cartLength = {clientFinance.length} setCurrentPage = {(e:number)=>setCurrentPage(e)} rowsPerPage={rowsPerPage}/>

                {RenderClientFinance(clientFinance, startIndex, endIndex)}
            </section>

            <Footer/>
        </main>
    )
}