import {PurchasedItem} from "./PurchasesHooks" 

export function RenderEmployeeAppointments(purchases: PurchasedItem[], startIndex: number, endIndex: number){

    return purchases.map((cart: PurchasedItem,i: number)=>{
        let cartTotal = 0;

        for(let i = 0; i < cart.cartItems.length; i++){
            const cartItem:PurchasedItem = JSON.parse(cart.cartItems[i]);
        
            const itemTotal = Number(cartItem.price) * parseInt(cartItem.quantity)
            
            cartTotal += itemTotal
        }

        return(
            <section key = {`${cart.$createdAt}-${i}`} className = "flex justifyEvenly cartItem">
                <h2>Items Sold: {cart.cartItems.length}</h2>
                <h2>Total: ${cartTotal.toFixed(2)}</h2>
            </section>
        )

    }).slice(startIndex,endIndex)  
}