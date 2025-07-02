import api from "../../api/api";
import { Permission, Role } from "appwrite";
import { toast } from "react-toastify";
import { CartItem, CartPurchase } from "../../middleware/Interfaces/Cart";
import { InventoryItem } from "../../middleware/Interfaces/Inventory";

async function updateInventory(props: CartPurchase) {
  // Create a cart lookup map by name for faster access
  const cartMap = new Map();
  props.cart.forEach((cartItem) => {
    cartMap.set(cartItem.name, cartItem);
  });

  // Prepare an array of update promises for concurrent execution
  const updatePromises = props.inventory.map(async (inventoryItem) => {
    const cartItem = cartMap.get(inventoryItem.name);
    if (!cartItem) return; // Skip if no matching item in cart

    const quantity = Number(inventoryItem.quantity) - Number(cartItem.quantity);
    const inventoryID = inventoryItem.$id;

    // Update inventory quantity
    const cartUpdate = { quantity: quantity };
    await api.updateDocument(
      import.meta.env.VITE_REACT_APP_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_INVENTORY_COLLECTION_ID,
      inventoryID,
      cartUpdate,
    );

    // If quantity reaches or is below reorder level, update cart item quantity
    if (Number(inventoryItem.reOrderLV) >= quantity) {
      const updateCartItem = {
        name: inventoryItem.name,
        price: inventoryItem.price,
        manufacturer: inventoryItem.manufacturer,
        description: inventoryItem.description,
        category: inventoryItem.category,
        quantity: quantity + Number(inventoryItem.reOrderLV),
      };

      await api.updateDocument(
        import.meta.env.VITE_REACT_APP_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_INVENTORY_COLLECTION_ID,
        inventoryID,
        updateCartItem,
      );
    }
  });

  // Wait for all inventory updates to complete
  await Promise.all(updatePromises);
}

//When the user sells the items in the cart
export async function handleMakeCartPurchase(props: CartPurchase) {
  try {
    if (props.cart) {
      //returns an array that converts all objects within the cart as a string
      const cartItems = {
        cartItems: props.cart.map((item: CartItem) => JSON.stringify(item)),
      };

      //go through each item in cart and each item in the inventory, and if they match names (because there are no duplicate items in the inventory), update that inventory items' quantity based on the purchase made from the cart
      updateInventory(props);

      // remove all currently purchased items from the cart database
      for (let i = 0; i < props.cart.length; i++) {
        await api.deleteDocument(
          import.meta.env.VITE_REACT_APP_DATABASE_ID,
          import.meta.env.VITE_REACT_APP_CART_COLLECTION_ID,
          props.cart[i].$id,
        );
      }

      const data = await api.createDocument(
        import.meta.env.VITE_REACT_APP_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_PURCHASES_COLLECTION_ID,
        cartItems,
        [Permission.read(Role.any())],
      );

      if (data) {
        window.location.reload();
      }
    } else {
      toast.error(
        "An error has occured, please ensure that all fields are filled out before continuing.",
      );
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
