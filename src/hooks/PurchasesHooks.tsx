import api from "../api/api"

export interface PurchasedItem{
    $createdAt: string,
    $id: string,
    name: string,
    price: string,
    quantity: string,
    cartItems: string,
    email?: string
}

//get purchase database
export async function GetPurchases(setPurchases:(e:PurchasedItem[])=>void){
    try{
        const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_PURCHASES_COLLECTION_ID);

        setPurchases(data.documents);
    }catch(err){
        console.error(err);

    }
 }

//return array that returns a list of the total quantities of items sold per purchase
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

//return array that returns a list of the total profit of items sold per purchase
 export function GetPurchasedProfit(purchases: PurchasedItem[]){
  
    return purchases.map((item:PurchasedItem)=>{
        //total is here to have a variable to return as a string value 
        let total = ""
        let cartTotal:number = 0
        let decimalTotal:number = 0

            for(let i = 0; i < item.cartItems.length;i++){
                //By changing each element of item.cartItems to an object, we can now access all the properties of the object
                const cartItem:PurchasedItem = JSON.parse(item.cartItems[i]);

                let itemPriceTotal = 0
                itemPriceTotal = Number(cartItem.price) * parseInt(cartItem.quantity)

                //add the values left of the decimal point to the current cart total
                cartTotal += parseInt(itemPriceTotal.toString().split(".")[0])

                //only if item total has a decimal point, add those decimals values to the decimal total
                if(itemPriceTotal.toString().includes(".")){
                    decimalTotal += parseInt(itemPriceTotal.toFixed(2).toString().split(".")[1]) 
                }


                //on the last item of the cart, combine the values of the decimal total and the number total as a string
                if(i === item.cartItems.length-1){

                    //Take decimal total and change it to a string
                    let decimalNumbers = decimalTotal.toString().split("")
    
                    //if the total of the decimal sum equals a value that supercedes the decimal place, add the number values left of the decimal place to the cart total
                    if(decimalNumbers.length > 2){
                        const remainder:string = decimalNumbers.shift() as string
                        cartTotal += parseInt(remainder)
                    }
    
                    //combine the decimal number remainder and the current cart total, and comine them as one string
                    const decimals = decimalNumbers.join("")
                    total = cartTotal.toString()
                    total += "." + decimals
                }

                //convert current total as string and return it as a number
                const totalProfit = parseInt(total) 

                if(totalProfit){
                  return totalProfit

                }
            }
        })  
 }