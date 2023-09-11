import React, {useState, useEffect} from "react"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import {checkDate, GetClientFinance, ClientFinance, RenderClientFinance, renderEditFinanceDisplay} from "../../hooks/FinanceHooks"
import PaginatedButtons from "../../components/Graphs/PaginatedButtons"

export default function DisplayClientFinance(){

    const [displayFinance, setDisplayFinance] = useState<boolean>(false);
    const [clientFinance, setClientFinance] = useState<ClientFinance[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [client, setClient] = useState<string>("");
    const [financeTotal, setFinanceTotal] = useState<string>("")
    const [email, setEmail] = useState<string>("");

    const rowsPerPage = 5;

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;  

    useEffect(()=>{
        GetClientFinance((e:ClientFinance[])=>setClientFinance(e))
    },[])

    useEffect(()=>{
        checkDate(clientFinance)
    })

    return (
        <main>
            <Nav pageHeading = {"Client Finances"}/>

            {
            displayFinance ?
            <section>
                {renderEditFinanceDisplay({display: displayFinance, setDisplay: (e:boolean)=>setDisplayFinance(e), client: client, clientFinance: clientFinance, financeTotal, setFinanceTotal: (e:string)=>setFinanceTotal(e), email, setEmail: (e:string)=>setEmail(e)})}
            </section>
            :
            <section>
                <PaginatedButtons currentPage = {currentPage} cartLength = {clientFinance.length} setCurrentPage = {(e:number)=>setCurrentPage(e)} rowsPerPage={rowsPerPage}/>

                {RenderClientFinance({clientFinance: clientFinance, startIndex: startIndex, endIndex: endIndex, displayFinance: displayFinance, setDisplayFinance: (e:boolean)=>setDisplayFinance(e), client: client, setClient: (e:string)=>setClient(e), financeTotal, setFinanceTotal: (e:string)=>setFinanceTotal(e), email, setEmail: (e:string)=> setEmail(e)})}
            </section>
            }
            <Footer/>
        </main>
    )
}