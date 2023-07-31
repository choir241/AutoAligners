import React from "react"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import {ButtonLink} from "../components/Button"
import Assets from "../components/Assets"

export default function Home(){

    return(
        <main className = "flex flex-col justifyBetween" id = "home">
            <Nav/>
                <section className = "flex hero">
                    <section className = "flex flex-col justifyCenter alignStart">
                        <h1>Say Goodbye to Car Repair Hassles</h1>
    
                        <p>For over a century, dating back to 1892, we have been steadfast in providing exceptional service. Our commitment to delivering the finest quality service has been instrumental in establishing a strong reputation. We are determined to continue building on this legacy with your support.</p>                

                        {ButtonLink({domain: "/reservation", text: "Make Reservation"})}
                    </section>

                    <div className = "imageContainer">
                        <img src = {Assets.whiteCar} alt = "white car"/>
                    </div>
            
                </section>
            <Footer/>
        </main>
    )   
}