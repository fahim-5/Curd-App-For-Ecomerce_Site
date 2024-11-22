import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = "http://localhost:3002/products"

// Fetch products action
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
  }
);

// Delete product action
export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async (id) => {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return id; // We return the product ID to update the state
  }
);

// Create product action
export const createProducts = createAsyncThunk(
  "products/createProducts",
  async (product) => {
    const res = await axios.post(BASE_URL, product);
    return product;  
  }
);

// Update product action
export const updateProducts = createAsyncThunk(
  "products/updateProducts",
  async ({ product, id }) => {
    const res = await axios.put(`${BASE_URL}/${id}`, product); // Use PUT instead of PUSH
    return res.data;  // Return the updated product data received from the API
  }
);

const initialState = {
  products: [],
  isloading: false,
  error: null
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetchProducts pending state
      .addCase(fetchProducts.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      // Handling fetchProducts fulfilled state
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isloading = false;
        state.error = null;
      })
      // Handling fetchProducts rejected state
      .addCase(fetchProducts.rejected, (state, action) => {
        state.products = [];
        state.isloading = false;
        state.error = action.payload || "Failed to fetch data";
      })
      // Handling deleteProducts fulfilled state
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      // Handling createProducts fulfilled state
      .addCase(createProducts.fulfilled, (state, action) => {
        state.products.push(action.payload); 
      })
      // Handling updateProducts fulfilled state
      .addCase(updateProducts.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload; // Update the product in the state
        }
      });
  }
})

export default productSlice.reducer;
