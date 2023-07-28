import React from "react"
import Nav from "../components/Nav"
import Footer from "../components/Footer"

export default function Home(){

    return(
        <main className = "flex flex-col justifyBetween">
            <Nav/>
                <section>
                    <h1>Home</h1>
                </section>
            <Footer/>
        </main>
    )   
}