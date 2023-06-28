import React from "react"
import {ButtonLink} from "../components/Button"

export default function Home(){

    return(
        <div>
            <h1>Car App</h1>
            <ButtonLink
            text = "Make Reservation"
            domain = "reservation"
            />
        </div>
    )   
}