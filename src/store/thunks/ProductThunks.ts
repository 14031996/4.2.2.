import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../../types/Product";

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(
      "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json",
    );

    if (!response.ok) {
      throw new Error("Не удалось загрузить товары");
    }

    const data: Product[] = await response.json();

    return data;
  } catch {
    return rejectWithValue("Не удалось загрузить товары. Обновите страницу.");
  }
});
