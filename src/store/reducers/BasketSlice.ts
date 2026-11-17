import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product, BasketProduct } from "../../types/Product";

type BasketState = {
  products: BasketProduct[];
};

type AddProductPayload = {
  product: Product;
  quantity: number;
};

type ChangeQuantityPayload = {
  id: number;
  quantity: number;
};

const initialState: BasketState = {
  products: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<AddProductPayload>) => {
      const { product, quantity } = action.payload;

      const existingProduct = state.products.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.products.push({ ...product, quantity });
      }
    },

    changeQuantity: (state, action: PayloadAction<ChangeQuantityPayload>) => {
      const { id, quantity } = action.payload;

      if (quantity === 0) {
        state.products = state.products.filter((item) => item.id !== id);

        return;
      }

      const product = state.products.find((item) => item.id === id);

      if (product) {
        product.quantity = quantity;
      }
    },
  },
});

export const { addProduct, changeQuantity } = basketSlice.actions;

export default basketSlice.reducer;
