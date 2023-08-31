import React,{useState, useEffect} from "react"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import {Estimate, GetEstimates, RenderEstimates} from "../../hooks/EstimatesHooks"
import PaginatedButtons from "../../components/Graphs/PaginatedButtons"

export default function Estimates(){

    const [estimates, setEstimates] = useState<Estimate[]>([]);
    const [price, setPrice] = useState<string>("");
    const [estimateFormDisplay, setEstimateFormDisplay] = useState<boolean>()
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 4;
  
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    useEffect(()=>{
        GetEstimates((e:Estimate[])=>setEstimates(e));
    },[])


    return(
        <main id = "estimate">
            <Nav pageHeading = {"Estimates"}/>
            <section>
            <PaginatedButtons currentPage = {currentPage} setCurrentPage = {(e:number)=>setCurrentPage(e)} rowsPerPage={rowsPerPage} cartLength={estimates.length}/>
                {RenderEstimates(estimates, price, (e:string)=>setPrice(e),estimateFormDisplay, (e:boolean)=>setEstimateFormDisplay(e), startIndex, endIndex)}

            </section>
            <Footer/>
        </main>
    )
}
