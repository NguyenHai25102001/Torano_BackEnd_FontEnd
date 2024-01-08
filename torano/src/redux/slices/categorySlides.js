

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {urlWebCategoryList} from "../../Admin/components/dataApi";

export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
 try {
     const response = await axios.get(urlWebCategoryList());
     return response.data;
 }catch (e) {

 }
});

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
