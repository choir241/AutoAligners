import api from "../api/api"


export interface PurchasedItem{
    $createdAt: string,
    $id: string,
    name: string,
    price: string,
    quantity: string,
    cartItems: string
}


export async function GetPurchases(setPurchases:(e:PurchasedItem[])=>void){
    try{
        const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_PURCHASES_COLLECTION_ID);

        setPurchases(data.documents);
    }catch(err){
        console.error(err);

    }
 }


 export function GetPurchasedQuantities(purchases: PurchasedItem[]){
    return purchases.map((item:PurchasedItem)=>{
            let quantityTotal = 0
            for(let i = 0; i < item.cartItems.length;i++){
                const cartItem:PurchasedItem = JSON.parse(item.cartItems[i]);
                quantityTotal += Number(cartItem.quantity)
            }
            return quantityTotal
        })  
 }


 export function GetPurchasedProfit(purchases: PurchasedItem[]){
  
    return purchases.map((item:PurchasedItem)=>{
        let total = ""
        let cartTotal:number = 0
        let decimalTotal:number = 0

            for(let i = 0; i < item.cartItems.length;i++){
                const cartItem:PurchasedItem = JSON.parse(item.cartItems[i]);

                let itemPriceTotal = 0
                itemPriceTotal = Number(cartItem.price) * parseInt(cartItem.quantity)

                cartTotal += parseInt(itemPriceTotal.toString().split(".")[0])

                if(itemPriceTotal.toString().includes(".")){
                    decimalTotal += parseInt(itemPriceTotal.toFixed(2).toString().split(".")[1]) 
                }

                if(i === item.cartItems.length-1){

                    let decimalNumbers = decimalTotal.toString().split("")
    
                    if(decimalNumbers.length > 2){
                        const remainder:string = decimalNumbers.shift() as string
                        cartTotal += parseInt(remainder)
                    }
    
                    const decimals = decimalNumbers.join("")
                    total = cartTotal.toString()
                    total += "." + decimals
                }


                const totalProfit = parseInt(total) 

                if(totalProfit){
                  return totalProfit

                }
            }
        })  
 }