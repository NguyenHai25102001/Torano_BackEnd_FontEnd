import { configureStore } from '@reduxjs/toolkit';
import CategorySlides from "./slices/categorySlides";
import productSlices from "./slices/productSlices";
import productQuickViewSlice from "./slices/productQuickViewSlice";
const store=configureStore({
    reducer:{
        category:CategorySlides,

        products:productSlices,

        productQuickView:productQuickViewSlice,


    }
})

export  default store;