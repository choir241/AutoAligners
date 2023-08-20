import React, {useState} from "react"
import {ButtonLink} from "./Button"

export default function EmployeeNav(){

    const [hidden, setHidden] = useState(false)

    return(
        <section>

            <div className="flex alignCenter arrow" onClick = {()=>setHidden(!hidden)}>
            <h3>Employee Hub</h3>
            <i className = {`${hidden ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"}`}></i>

            </div>

                    <div className={`flex-col alignStart employeeNav ${hidden ? "flex" : "displayNone"}`}>
                    {ButtonLink({classNames: "goBack", text: "Inventory", domain: "/inventory"})}
                    {ButtonLink({classNames: "goBack", text: "Employee Shop", domain: "/inventoryShop"})}
                    {ButtonLink({classNames: "goBack", text: "Estimates", domain: "/estimates"})}
                    {localStorage.getItem("email") === "richardchoi54@gmail.com" ? ButtonLink({classNames: "goBack", text: "Purchase History", domain: "/purchases"}) : ""}
                    {ButtonLink({classNames: "goBack", text: "Settings", domain: "/settings"})}
                    </div>
        </section>

    )
}