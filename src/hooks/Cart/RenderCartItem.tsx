import { useContext } from "react";
import { Button } from "../../components/Button";
import {
  RenderCartQuantity,
  EditCart,
  handleDeleteCartItem,
} from "../hooks/CartHooks";
import { CartItem, Cart } from "../../middleware/Interfaces/Cart";
import { DarkModeContext } from "../../middleware/Context";
import { FaTrashAlt } from "react-icons/fa";

export default function RenderMultipleCartItems({
  i,
  item,
  props,
  checkCartQuantity,
  itemPriceTotal,
}: {
  i: number;
  item: CartItem;
  props: Cart;
  checkCartQuantity: string;
  itemPriceTotal: number;
}) {
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <section
      className={`flex flex-col items-end mb-6 p-2 border-radius-10px w-80 ${toggleDarkMode === "dark" ? "lightBtn shadow-2xs" : "darkNav shadow-2xs"}`}
      key={i}
    >
      <div className="flex mb-4 w-full justify-between items-end">
        <h2>{item.name} </h2>

        <h2>
          $
          {parseInt(item?.quantity) > 1
            ? itemPriceTotal.toFixed(2)
            : item.price}
        </h2>
      </div>

      <div className="flex items-end justify-between w-full">
        <div className="flex items-center justify-between">
          <h2>Quantity: </h2>
          {RenderCartQuantity({
            name: item.name,
            quantity: item.quantity,
            inventory: props.inventory,
            cartItemQuantity: props.cartItemQuantity,
            setCartItemQuantity: (e: string) => props.setCartItemQuantity(e),
          })}
          {Button({
            text: "Update",
            handleButtonClick: () =>
              EditCart({
                name: item.name,
                price: item.price,
                email: item.email,
                quantity: checkCartQuantity,
                manufacturer: item.manufacturer,
                description: item.description,
                category: item.category,
                $id: item.$id,
                itemID: item.itemID,
              }),
          })}
        </div>
        <button
          onClick={() => handleDeleteCartItem(item.$id)}
          className={`${toggleDarkMode === "light" ? "lightBtn" : "darkBtn"} button`}
        >
          <FaTrashAlt />
        </button>
      </div>
    </section>
  );
}
