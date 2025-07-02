import { PurchasedItem } from "../../middleware/Interfaces/Purchases";
import { cacheEmail } from "../../middleware/Cache";

export function RenderEmployeeAppointments(
  purchases: PurchasedItem[],
  startIndex: number,
  endIndex: number,
) {
  return purchases
    .map((cart: PurchasedItem, i: number) => {
      let cartTotal = 0;

      for (let i = 0; i < cart.cartItems.length; i++) {
        const cartItem: PurchasedItem = JSON.parse(cart.cartItems[i]);
        if (cartItem.email === cacheEmail) {
          const itemTotal =
            Number(cartItem.price) * parseInt(cartItem.quantity);

          cartTotal += itemTotal;
        }

      if(cartItem.email === cacheEmail){
      return (
        <section
         key={`${cart.$createdAt}-${i}`}
          className="flex justify-between w-full mb-4"
        >
          <h2>Items: {cart.cartItems.length}</h2>
          <h2>Total: ${cartTotal.toFixed(2)}</h2>
        </section>
      );
      }
    }

    }).filter((value)=>value ? value : '')
    .slice(startIndex, endIndex);
}
