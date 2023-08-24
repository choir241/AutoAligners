import api from "../api/api"
import axios from "axios"

export interface Estimate{
    $id?: string;
    service: string;
    carMake: string;
    carModel: string;
    carYear: string;
    stayLeave?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    zipCode?: string;
    contact?: string;
    comment?: string;
}

async function NotifyClient(props: Estimate, price: string){
    try{

        const formData = new URLSearchParams();
        formData.append("email", props.email)
        formData.append("firstName", props.firstName)
        formData.append("lastName", props.lastName)
        formData.append("service", props.service)
        formData.append("carYear", props.carYear)
        formData.append("carModel", props.carModel)
        formData.append("carMake", props.carMake)
        formData.append("price", price);

        const data = await axios.post("https://car-app-backend-0ejb.onrender.com/sendEmail", formData, {})
        
        if(data){
            window.location.reload();
        }

    }catch(err){
        console.error(err);
    }
}

export function RenderEstimateForm(props: Estimate, price: string, setPrice: (e:string)=>void){
    return(
        <form className = "flex flex-col alignCenter">
            <input key = "email" defaultValue = {props.email} disabled></input>
            <input key = "totalPrice" onChange = {(e)=>setPrice(e.target.value)}></input>
            <button className = "submitEstimateButton" onClick = {(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
                e.preventDefault(); 
                NotifyClient({email: props.email, carYear: props.carYear, carModel: props.carModel, carMake: props.carMake, service: props.service, firstName: props.firstName, lastName: props.lastName}, price)}}>Send Client Estimate</button>
        </form>
    )
}

export async function GetEstimates(setEstimates : (e:Estimate[])=>void){
    try{
        const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_ESTIMATES_COLLECTION_ID);
        setEstimates(data.documents);
    }catch(err){
        console.error(err)
    }
}

export function RenderEstimates(estimates: Estimate[], setEstimateFormDisplay: (e:boolean)=>void, estimateFormDisplay: boolean, price: string, setPrice: (e:string)=>void){

    const renderDisplay = estimates.map((item: Estimate)=>{
        return(
            <section key = {item.$id} className = "estimate clearButton">
                <h2>{item.service}</h2>           
                <h2>{item.firstName} {item.lastName}</h2>    

                <div className="flex justifyBetween">
                    <h2>{item.carMake}</h2>
                    <h2>{item.carModel}</h2>
                    <h2>{item.carYear}</h2>
                </div>
                <div className="flex justifyBetween">
       
                    <h2>{item.email}</h2>
                    <h2>{item.phone}</h2>
                    <h2>{item.contact}</h2>
                </div>

                <button onClick = {()=>setEstimateFormDisplay(!estimateFormDisplay)} className = "button">Show Estimate Form</button>

                {estimateFormDisplay ? RenderEstimateForm({email: item.email, carYear: item.carYear, carModel: item.carModel, carMake: item.carMake, firstName: item.firstName, lastName: item.lastName, service: item.service}, price, (e:string)=>setPrice(e)) : ""}

            </section>
        )
    })

    return(
        <section className = "flex alignCenter flex-col">
            {renderDisplay}

        </section>
    )
}