import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { urlCodeByProducts } from "../../Admin/components/dataApi";

export const fetchProduct = createAsyncThunk('products/fetchProducts', async ({ code, filter, page }) => {
    const response = await axios.get(urlCodeByProducts(code), {
        params: {
            filter: filter,
            page: page,
        },
    });

    return response.data;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        listProduct: [],
        status: 'idle',
        error: null,
        code: null,
        filter: null,
        page:1
    },
    reducers: {
        setCode: (state, action) => {
            state.code = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.status = 'success';
                state.listProduct = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            });
    }
});


export const { setCode, setFilter,setPage } = productSlice.actions;
export default productSlice.reducer;

