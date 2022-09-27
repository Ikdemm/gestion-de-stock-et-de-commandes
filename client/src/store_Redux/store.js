import {configureStore} from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import categoryReducer from '../features/category/categorySlice';
import fournisseurSlice from '../features/supplier/fournisseurSlice';
import clientSlice from '../features/customer/customerSlice';
import userSlice from '../features/user/userSlice';
export const store = configureStore({
    reducer:{
        produits: productReducer,
        categories: categoryReducer,
        fournisseurs: fournisseurSlice,
        clients: clientSlice,
        users:userSlice

    }
})