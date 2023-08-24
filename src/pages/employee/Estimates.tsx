import React,{useState, useEffect} from "react"
import Nav from "../../components/Nav"
import EmployeeNav from "../../components/EmployeeNav"
import Footer from "../../components/Footer"
import {Estimate, GetEstimates, RenderEstimates} from "../../hooks/EstimatesHooks"

export default function Estimates(){

    const [estimates, setEstimates] = useState<Estimate[]>([]);
    const [estimateFormDisplay, setEstimateFormDisplay] = useState<boolean>(false)

    useEffect(()=>{
        GetEstimates((e:Estimate[])=>setEstimates(e));
    },[])

 

    return(
        <main id = "estimate">
            <Nav pageHeading = {"Estimates"}/>
            <EmployeeNav/>
            <section>
                {RenderEstimates(estimates, (e:boolean)=>setEstimateFormDisplay(e), estimateFormDisplay)}

            </section>
            <Footer/>
        </main>
    )
}
