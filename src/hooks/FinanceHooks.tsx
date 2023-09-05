import {Button} from "../components/Button"
import { RenderPaymentForm, CardInfo } from "./CartHooks"

export function toggleDisplay(setDisplay: (e:boolean)=>void, display: boolean){
    setDisplay(!display)
}

function handlePayment(){
    console.log("test")
}

export function renderFinanceDisplay(text:string, display: boolean, setDisplay: (e:boolean) => void, cardInfo: CardInfo | undefined, setCardInfo: (e:CardInfo)=>void){

    let financePlanText = ""
    let financeTotal = ""

    if(text === "gold"){
        financePlanText = "$199/month includes 12 services/year (Gold + Air Conditioning Service, Wheel Alignment)"
        financeTotal = "199"
    }else if(text === "silver"){
        financePlanText = "$120/month includes 6 services per year (Silver Subscription + Brake Check, Engine Diagnostic)."
        financeTotal = "120"
    }else if(text === "bronze"){
        financePlanText=  "$75/month includes 3 services per year (Oil Change, Tire Rotation, and 20-point Inspection)."
        financeTotal = "75"
    }

    return( 
        <section className = "flex flex-col alignCenter purchase">

            {Button({text: "Go Back", handleButtonClick: ()=>toggleDisplay((e:boolean)=>setDisplay(e), display)})}

            <h1>{text} Finance Payment Form</h1>
            
            <p>{financePlanText}</p>

            {RenderPaymentForm(cardInfo, (e:CardInfo)=>setCardInfo(e))}

            <input type="text" disabled defaultValue = {`$${financeTotal}`}/>

            <div className="flex justifyBetween">
                {Button({text: "Make Payment", handleButtonClick: ()=>handlePayment()})}
                {Button({text: "Go Back", handleButtonClick: ()=>toggleDisplay((e:boolean)=>setDisplay(e), display)})}

            </div>

         
        </section>
    )
}