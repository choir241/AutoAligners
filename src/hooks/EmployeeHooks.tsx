import {PurchasedItem} from "./PurchasesHooks" 

export function RenderEmployeeAppointments(purchases: PurchasedItem[]){

    return purchases.map((cart: PurchasedItem,i: number)=>{

        let cartTotal = 0;
        const cartItems = []

        for(let i = 0; i < cart.cartItems.length; i++){
            const cartItem:PurchasedItem = JSON.parse(cart.cartItems[i]);
        
            const itemTotal = Number(cartItem.price) * parseInt(cartItem.quantity)
            
            cartTotal += itemTotal

            if(cartItem.email === localStorage.getItem("email")){
                cartItems.push (
                    <section key = {`${cart.$id}-${i}`} className = "flex">
                        <h2>{cartItem.name}</h2>
                        <h2>Item: ${cartItem.price}</h2>
                    </section>)
            }
        }

        return(
            <section key = {`${cart.$createdAt}-${i}`} className = "flex justifyEvenly cartItem">
                {cartItems}
                <h2>Total: ${cartTotal.toFixed(2)}</h2>
            </section>
        )

    })
}