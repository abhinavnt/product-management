import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";
import axiosInstance from "@/utils/axiosInstance";

interface ProductsState {
  products: Product[];
  totalCount: number;
  currentPage: number;
  perPage: number;
  selectedSubcategories: string[];
  searchTerm: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  totalCount: 0,
  currentPage: 1,
  perPage: 10,
  selectedSubcategories: [],
  searchTerm: '',
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState }) => {
    const state = getState() as { products: ProductsState };
    const { currentPage, perPage, selectedSubcategories, searchTerm } = state.products;
    const response = await axiosInstance.get(`/api/product/products`, {
      params: {
        page: currentPage,
        perPage: perPage,
        subcategories: selectedSubcategories.join(','),
        search: searchTerm,
      },
    });
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
      state.currentPage = 1;
    },
    setSelectedSubcategories: (state, action: PayloadAction<string[]>) => {
      state.selectedSubcategories = action.payload;
      state.currentPage = 1; // Reset to page 1 on filter change
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to page 1 on search change
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products.map((p: any) => ({
          id: p._id,
          title: p.title,
          image: p.images[0] || "/placeholder.svg",
          price: p.variants[0]?.price || 0,
        }));
        state.totalCount = action.payload.totalCount;
        state.currentPage = action.payload.page;
        state.perPage = action.payload.perPage;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setPage, setPerPage, setSelectedSubcategories, setSearchTerm } = productsSlice.actions;
export default productsSlice.reducer;