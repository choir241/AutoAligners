import React, {useState, useEffect} from "react"
import {DisplayByMonth, DisplayByWeek, DisplayByYear, PurchasedItem, GetPurchases} from "../../hooks/PurchasesHooks"
import {Button} from "../../components/Button"

interface ListLabels{
    currentPage: number,
    setCurrentPage: (e:number) => void,
    rowsPerPage: number,
    startIndex: number,
    endIndex: number
}

export default function List(props: ListLabels){

    const [purchases,setPurchases]= useState<PurchasedItem[]>([]);
    const [display, setDisplay] = useState<string>("week");

    useEffect(()=>{
        GetPurchases((e:PurchasedItem[])=>setPurchases(e));
    },[])

    return(
        <section>
            <div className="flex buttons justifyBetween">
                {Button({text: "Week", handleButtonClick: ()=>setDisplay("week")})}
                {Button({text: "Month", handleButtonClick: ()=>setDisplay("month")})}
                {Button({text: "Year", handleButtonClick: ()=>setDisplay("year")})}
            </div>


                {display === "week" ? DisplayByWeek({purchases: purchases, startIndex: props.startIndex, endIndex: props.endIndex, currentPage: props.currentPage, rowsPerPage: props.rowsPerPage, setCurrentPage: (e:number)=>props.setCurrentPage(e)}) : ""}
                {display === "month" ? DisplayByMonth({purchases: purchases, startIndex: props.startIndex, endIndex: props.endIndex, currentPage: props.currentPage, rowsPerPage: props.rowsPerPage, setCurrentPage: (e:number)=>props.setCurrentPage(e)}) : ""}
                {display === "year" ? DisplayByYear({purchases: purchases, startIndex: props.startIndex, endIndex: props.endIndex, currentPage: props.currentPage, rowsPerPage: props.rowsPerPage, setCurrentPage: (e:number)=>props.setCurrentPage(e)}) : ""}

            
        </section>
    )
}