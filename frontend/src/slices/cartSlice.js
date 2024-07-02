import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const storedCartItems = localStorage.getItem("cartItems");

const initialState = {
  cartItems: storedCartItems ? JSON.parse(storedCartItems) : [],
  cartTotalQuantity: storedCartItems
    ? JSON.parse(storedCartItems).reduce(
        (total, item) => total + item.cartTotalQuantity,
        0
      )
    : 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartTotalQuantity += 1;

        toast.info(
          `Increased "${state.cartItems[itemIndex].name}" cart quantity`,
          {
            position: "bottom-left",
          }
        );
      } else {
        const tempProduct = { ...action.payload, cartTotalQuantity: 1 };
        state.cartItems.push(tempProduct);

        toast.success(
          `"${action.payload.name}" was succesfully added to your cart`,
          {
            position: "bottom-left",
          }
        );
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      toast.error(`"${action.payload.name}" was removed from your cart`, {
        position: "bottom-left",
      });
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );

      if (state.cartItems[itemIndex].cartTotalQuantity > 1) {
        state.cartItems[itemIndex].cartTotalQuantity -= 1;

        toast.info(`Decreased "${action.payload.name}" cart quantity `, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartTotalQuantity === 1) {
        //remove from cart

        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        );
        state.cartItems = nextCartItems;

        toast.error(`"${action.payload.name}" was removed from your cart`, {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart(state, action) {
      state.cartItems = [];
      toast.error(`cart cleared`, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartTotalQuantity } = cartItem;
          const itemTotal = price * cartTotalQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartTotalQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
