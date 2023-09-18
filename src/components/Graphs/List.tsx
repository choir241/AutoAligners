import React, {useState, useEffect} from "react"
import {DisplayByMonth, DisplayByWeek, DisplayByYear, PurchasedItem, GetPurchases} from "../../hooks/PurchasesHooks"
import {Button} from "../../components/Button"

export default function List(){

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

                {display === "week" ? DisplayByWeek(purchases) : ""}
                {display === "month" ? DisplayByMonth(purchases) : ""}
                {display === "year" ? DisplayByYear(purchases) : ""}

            
        </section>
    )
}