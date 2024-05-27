import {  configureStore } from '@reduxjs/toolkit';
import userSlice from './featuers/user/userSlice';
import cartReducer from './featuers/cart/cartSlice';
const store = configureStore({
  reducer: {
    user: userSlice,
    cart:cartReducer,
  },
});
export default store;
