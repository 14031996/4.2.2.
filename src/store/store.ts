import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/ProductSlice";
import basketReducer from "./reducers/BasketSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    basket: basketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
