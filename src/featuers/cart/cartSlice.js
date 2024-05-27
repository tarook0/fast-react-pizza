import { createSlice } from '@reduxjs/toolkit';

const initaialState = {
  cart: [],
  //   cart: [
  //     {
  //       pizzaId: 12,
  //       name: 'Mediterean',
  //       quantity: 2,
  //       unitPrice: 16,
  //       totalPrice: 32,
  //     },
  //   ],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState: initaialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemquantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemquantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      if(item.quantity===0){
        cartSlice.caseReducers.deleteItem(state, action);
      }
      
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});
export const {
  addItem,
  deleteItem,
  decreaseItemquantity,
  increaseItemquantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
export const getTotlaCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getTotlaCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
