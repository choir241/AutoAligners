import api from "../api/api"

export interface Estimate{
    $id: string;
    service: string;
    carMake: string;
    carModel: string;
    carYear: string;
    stayLeave: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    zipCode: string;
    contact: string;
    comment: string;
}

export async function GetEstimates(setEstimates : (e:Estimate[])=>void){
    try{
        const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_ESTIMATES_COLLECTION_ID);
        setEstimates(data.documents);
    }catch(err){
        console.error(err)
    }
}

export function RenderEstimates(estimates: Estimate[]){

    const renderDisplay = estimates.map((item: Estimate)=>{
        return(
            <section className = "estimate clearButton">
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

            </section>
        )
    })

    return(
        <section className = "flex alignCenter flex-col">
            {renderDisplay}
        </section>
    )
}