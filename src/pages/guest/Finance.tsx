import React,{useState} from "react"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import {ButtonLink} from "../../components/Button"
import Assets from "../../components/Assets"

export default function Finance(){

    const [bronzeDisplay, setBronzeDisplay] = useState<boolean>(false)
    const [goldDisplay, setGoldDisplay] = useState<boolean>(false)
    const [silverDisplay, setSilverDisplay] = useState<boolean>(false)


    function toggleBronzeDisplay(){
        setBronzeDisplay(!bronzeDisplay)
    }

    function toggleGoldDisplay(){
        setGoldDisplay(!goldDisplay)
    }

    function toggleSilverDisplay(){
        setSilverDisplay(!silverDisplay)
    }

    return(
        <main id = "finance">
            <Nav pageHeading = {"Financial Options for Car Services"}/>

            <section>

            <section className = "flex flex-col">
                <h2>Subscription Plans</h2>

        <section className="flex justifyAround alignCenter">
                 <div className = "imageContainer flex alignCenter justifyCenter flex-col">
                    <h3>Bronze Plan <i className = "fa-solid fa-circle-info button" onClick = {()=>toggleBronzeDisplay()}></i></h3>
                    <img src={Assets.blackCard} alt="generic business black credit card"  onClick = {()=>toggleBronzeDisplay()}/>

                    <p className = {`${bronzeDisplay? "" : "displayNone"} clearButton flex flex-col alignStart`}><i className = "fa-solid fa-xmark button" onClick = {()=>toggleBronzeDisplay()}></i>$75/month includes 3 services per year (Oil Change, Tire Rotation, and 20-point Inspection).</p>
                </div>
                <div className = "imageContainer blueCardContainer flex alignCenter justifyCenter flex-col">
                    <h3>Silver Plan <i className = "fa-solid fa-circle-info button" onClick = {()=>toggleSilverDisplay()}></i></h3>
                    <img src={Assets.blueCard} className = "blueCard" alt="generic blue Visa debit card with a Vivid logo centered on the card"  onClick = {()=>toggleSilverDisplay()}/>
                    <p className = {`${silverDisplay? "" : "displayNone"} clearButton flex flex-col alignStart`}><i className = "fa-solid fa-xmark button" onClick = {()=>toggleSilverDisplay()}></i>$120/month includes 6 services per year (Silver Subscription + Brake Check, Engine Diagnostic).</p>
                </div>
                <div className = "imageContainer goldCardContainer flex alignCenter justifyCenter flex-col">
                    <h3>Gold Plan <i className = "fa-solid fa-circle-info button" onClick = {()=>toggleGoldDisplay()}></i></h3>
                    <img src={Assets.goldCard} alt="generic business gold credit card" onClick = {()=>toggleGoldDisplay()}/>
                    
                    <p className = {`${goldDisplay? "": "displayNone"} clearButton flex flex-col alignStart`}><i className = "fa-solid fa-xmark button" onClick = {()=>toggleGoldDisplay()}></i>$199/month includes 12 services/year (Gold + Air Conditioning Service, Wheel Alignment)</p>
                </div>
        </section>
            

            </section>


            <section>
                <h2>Pay Later</h2>
        

                <div className="flex justifyBetween alignCenter">
                    <h3>Book now and pay later! Schedule your appointment and pay within 30 days after service completion.</h3>

                    {ButtonLink({domain: "/reservation", text: "Make Reservation"})}
                </div>

              
            </section>
         

         <section className = "textAlignRight">
            
            <h2>Deferred Payments:</h2>

            <div className = "flex justifyBetween alignCenter">

                {ButtonLink({domain: "/estimate", text: "Estimate Car Service"})}
                
                <h3>Get your car serviced today and defer payments for up to 45 days.</h3>

            </div>


         </section>


        <section>
            <h2>Interest-Free Financing:</h2>


            <div className="flex justifyBetween alignContent">
            <h3>For services above $800, enjoy 0% interest financing for up to 6 months.</h3>
            
                <div className = "buttonContainer flex justifyBetween alignCenter">
                    {ButtonLink({domain: "/reservation", text: "Make Reservation"})}
                    {ButtonLink({domain: "/estimate", text: "Estimate Car Service"})}
                </div>
 

            </div>
           
        </section>


{/* 
            <ul>
                <li><h3>Payment Plans:</h3></li>
                <li>3-month Payment Plan: $400/month for a total of $1,200.</li>
                <li>6-month Payment Plan: $210/month for a total of $1,260.</li>
            </ul> */}




{/* Bundle Discounts:

Save 15% on your total bill when you book Engine Diagnostic, Air Conditioning Service, and Wheel Alignment together.
Reward Points System:

Earn 1 point for every $10 spent on services.
Redeem 100 points for a $10 discount on your next service.
Referral Program:

Refer a friend and get a $25 credit when they complete their first service appointment.
Loyalty Program:

Silver Level (3 services booked): 5% off on your next service.
Gold Level (6 services booked): 10% off on your next service + 100 bonus points.
Platinum Level (12 services booked): 15% off on your next service + 200 bonus points.
Flexible Payment Methods:

We accept all major credit cards, debit cards, digital wallets, and bank transfers.
Fake Financial Content:

Example Service: "Comprehensive Car Tune-Up"
Service Cost: $800
Payment Plan Selected: 6-month Payment Plan
Monthly Installment: $140
Pay Later Option: Available
Deferred Payments: Payment due in 30 days
Interest-Free Financing: Applicable
Subscription Plan: Gold Subscription
Subscription Plan Cost: $120/month
Bundle Discount: Not applicable for this service
Reward Points Earned: 85 points
Referral Program Credit: $25
Loyalty Program Level: Gold Level (6 services booked)
Loyalty Program Discount: 10% off on next service
Payment Details:

You have selected the "Comprehensive Car Tune-Up" service with a total cost of $800. As you've chosen the 6-month Payment Plan, you will pay $140 per month for the next 6 months. Alternatively, you can opt for our "Pay Later" option and schedule your appointment today, with the payment due within 30 days after the service is completed.

Additionally, since you have enrolled in our Gold Subscription plan, you will receive 10% off on this service and earn 85 reward points. You are just one service away from reaching the Platinum Level and enjoying even more benefits!

Don't forget to take advantage of our referral program by inviting your friends. If they complete their first service appointment, you will receive a $25 credit to use towards future services.

At AutoAligners, we value your loyalty. Keep booking with us to unlock more exciting rewards and discounts!

Please note that the above numbers and content are entirely fictional and should not be used as financial advice. They are provided for illustrative purposes only to demonstrate how the financial options could be presented within the car appointment booking application. */}
            </section>
            <Footer/>
        </main>
    )
}