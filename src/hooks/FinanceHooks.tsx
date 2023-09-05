import {Button} from "../components/Button"
import { RenderPaymentForm, CardInfo } from "./CartHooks"
import api from "../api/api"
import {Permission, Role} from "appwrite"

interface financeDisplay{
    text:string, 
    display: boolean, 
    setDisplay: (e:boolean) => void, 
    cardInfo: CardInfo | undefined, 
    setCardInfo: (e:CardInfo)=>void,
    email: string,
    setEmail: (e:string) => void
}

export function toggleDisplay(setDisplay: (e:boolean)=>void, display: boolean){
    setDisplay(!display)
}

async function handlePayment(financeTotal: string, email: string, cardInfo: CardInfo | undefined){
    try{
    const cardAmount = 1000 + Math.ceil(Math.random() * 100000)

    const purchase = {
        cardAmount,
        email,
        financeTotal,
        type: cardInfo?.type,
        cardNumber: cardInfo?.cardNumber,
        securityNumber: cardInfo?.securityNumber,
        expirationDate: cardInfo?.expirationDate
    }

       await api.createDocument(process.env.REACT_APP_CART_DATABASE_ID, process.env.REACT_APP_FINANCE_PAYMENTS_COLLECTION_ID, purchase, [Permission.read(Role.any())])

       window.location.reload();
    }catch(err){
        console.error(err);
    }
}

export function renderFinanceDisplay(props: financeDisplay){

    let financePlanText = ""
    let financeTotal = ""

    if(props.text === "gold"){
        financePlanText = "$199/month includes 12 services/year (Gold + Air Conditioning Service, Wheel Alignment)"
        financeTotal = "199"
    }else if(props.text === "silver"){
        financePlanText = "$120/month includes 6 services per year (Silver Subscription + Brake Check, Engine Diagnostic)."
        financeTotal = "120"
    }else if(props.text === "bronze"){
        financePlanText=  "$75/month includes 3 services per year (Oil Change, Tire Rotation, and 20-point Inspection)."
        financeTotal = "75"
    }

    return( 
        <section className = "flex flex-col alignCenter purchase">

            {Button({text: "Go Back", handleButtonClick: ()=>toggleDisplay((e:boolean)=>props.setDisplay(e), props.display)})}

            <h1>{props.text} Finance Payment Form</h1>
            
            <p>{financePlanText}</p>

            {RenderPaymentForm(props.cardInfo, (e:CardInfo)=>props.setCardInfo(e))}

            <input type="text" disabled defaultValue = {`$${financeTotal}`}/>
            <input type="email" placeholder="Enter Your Email Here!" onChange = {(e)=>props.setEmail(e.target.value)}/>

            <div className="flex justifyBetween">
                {Button({text: "Make Payment", handleButtonClick: ()=>handlePayment(financeTotal, props.email, props.cardInfo)})}
                {Button({text: "Go Back", handleButtonClick: ()=>toggleDisplay((e:boolean)=>props.setDisplay(e), props.display)})}

            </div>

         
        </section>
    )
}