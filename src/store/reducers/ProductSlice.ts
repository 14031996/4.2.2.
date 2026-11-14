import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/Product";
import { fetchProducts } from "../thunks/ProductThunks";

type ProductState = {
  products: Product[];
  loading: boolean;
  error: string;
  quantities: Record<number, number>;
};

type ChangeProductQuantityPayload = {
  id: number;
  quantity: number;
};

const initialState: ProductState = {
  products: [],
  loading: false,
  error: "",
  quantities: {},
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeProductQuantity: (
      state,
      action: PayloadAction<ChangeProductQuantityPayload>,
    ) => {
      state.quantities[action.payload.id] = action.payload.quantity;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? "Не удалось загрузить товары. Обновите страницу.";
      });
  },
});

export const { changeProductQuantity } = productSlice.actions;

export default productSlice.reducer;
