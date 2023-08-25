import React,{useState, useEffect} from "react"
import Nav from "../../components/Nav"
import EmployeeNav from "../../components/EmployeeNav"
import Footer from "../../components/Footer"
import {Estimate, GetEstimates, RenderEstimates} from "../../hooks/EstimatesHooks"

export default function Estimates(){

    const [estimates, setEstimates] = useState<Estimate[]>([]);
    const [price, setPrice] = useState<string>("");
    const [estimateFormDisplay, setEstimateFormDisplay] = useState<boolean>()

    useEffect(()=>{
        GetEstimates((e:Estimate[])=>setEstimates(e));
    },[])


    return(
        <main id = "estimate">
            <Nav pageHeading = {"Estimates"}/>
            <EmployeeNav/>
            <section>
                {RenderEstimates(estimates, price, (e:string)=>setPrice(e),estimateFormDisplay, (e:boolean)=>setEstimateFormDisplay(e))}

            </section>
            <Footer/>
        </main>
    )
}
