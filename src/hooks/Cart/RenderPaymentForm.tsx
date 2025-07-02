import Assets from "../../components/Assets";
import { CardInfo } from "../../middleware/Interfaces/Cart";
import { PurchaseButton } from "./PurchaseButton";
import {Cart} from "../../middleware/Interfaces/Cart"

export function RenderPaymentForm(
  {cardInfo, setCardInfo, cart}:
  {
  cardInfo: CardInfo | undefined,
  setCardInfo: (e: CardInfo) => void,
  cart: Cart
  }
) {
  return (
    <section className="px-2 flex items-start flex-col w-40">
      <form className="flex flex-col items-start justify-between">
        <label className="my-1">Card Number</label>
        <input
          className="mb-2 w-full"
          type="text"
          defaultValue={cardInfo?.cardNumber}
          disabled
        />
        <label className="my-1">Expiration Date</label>
        <input
          className="mb-2 w-full"
          type="text"
          defaultValue={cardInfo?.expirationDate}
          disabled
        />
        <label className="my-1">Security Number</label>
        <input
          className="mb-2 w-full"
          type="text"
          defaultValue={cardInfo?.securityNumber}
          maxLength={4}
          disabled
        />
      </form>

      <section className="flex justify-between items-start w-full">
        <div
          className="imageContainer"
          onClick={() =>
            setCardInfo({
              type: "Visa",
              cardNumber: 4716108999716531,
              securityNumber: "257",
              expirationDate: "01/32",
            })
          }
        >
          <img
            src={Assets.visa}
            alt="The logo for VISA, with a purple border on top, gold border on the bottom, the text visa in all capitals in purple text in the center, and a white background."
          />
        </div>
        <div
          className="imageContainer"
          onClick={() =>
            setCardInfo({
              type: "Master Card",
              cardNumber: 5281037048916168,
              securityNumber: "043",
              expirationDate: "12/84",
            })
          }
        >
          <img
            src={Assets.mastercard}
            alt="The logo for MasterCard, with a purple background, and a ven diagram where the left circle is red, the right circle is gold, and the text mastercard has the m and c capitalized and in the center of the venn diagram."
          />
        </div>
        <div
          className="imageContainer"
          onClick={() =>
            setCardInfo({
              type: "American Express",
              cardNumber: 342498818630298,
              securityNumber: "3156",
              expirationDate: "05/99",
            })
          }
        >
          <img
            src={Assets.amex}
            alt="The logo for American Expresss, with a sky blue background, white border encasing the text amex, which is all upper cased and in the center."
          />
        </div>
      </section>

      {PurchaseButton({props: cart})}
    </section>
  );
}
