import {configureStore} from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import categoryReducer from '../features/category/categorySlice';
import fournisseurSlice from '../features/supplier/fournisseurSlice';
import clientSlice from '../features/customer/customerSlice';
import userSlice from '../features/user/userSlice';
import ligneAchatOrdinaireSlice from '../features/factures_ordinaires/achat/lines/ligneAchatOrdinaireSlice';
import  factureAchatSlice  from '../features/factures_ordinaires/achat/factures/factAchatSlice';
export const store = configureStore({
    reducer:{
        produits: productReducer,
        categories: categoryReducer,
        fournisseurs: fournisseurSlice,
        clients: clientSlice,
        users:userSlice,
        lines_achat_fact:ligneAchatOrdinaireSlice,
        facturesAchat: factureAchatSlice
    }
})