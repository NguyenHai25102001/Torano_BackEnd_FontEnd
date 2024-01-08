import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {urlProductDetails} from "../../Admin/components/dataApi";
export const fetchProductQuickView=createAsyncThunk('productQuickView',async({productId})=>{
    try {
        const response=await axios.get(urlProductDetails(productId));
        return response.data?.product;

    }catch (error){
        console.log(error.response.data)
    }
} );

const productQuickViewSlice = createSlice({
    name: 'productQuickView',
    initialState:{
        product:[],
        status:'idle',
        isProductQuickViewOpen: false,
        productId:null
    },
    reducers: {
        openProductQuickView: (state) => {
            state.isProductQuickViewOpen = true;
        },
        closeProductQuickView: (state) => {
            state.isProductQuickViewOpen = false;
        },
        setProductId:(state,action)=>{
            state.productId=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchProductQuickView.pending,(state)=>{
            state.ststus='loading';
        })
            .addCase(fetchProductQuickView.fulfilled, (state, action) => {
                state.status = 'success';
                state.product = action.payload;
            })
            .addCase(fetchProductQuickView.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            });
    }
});

export const { setProductId}=productQuickViewSlice.actions
export const { openProductQuickView, closeProductQuickView } = productQuickViewSlice.actions;
export default productQuickViewSlice.reducer;
