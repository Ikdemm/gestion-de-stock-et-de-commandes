import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {CreateProduct, UpdateProduct ,  GetProducts , GetProductById, DeleteProduct  } from './productAPI';

const initialState={
    allProduits:[],
    CreateProduct:"",
    UpdateProduct:"",
    GetProducts:"",
    GetProductById:"",
    DeleteProduct:""
}
export const createProduit = createAsyncThunk(
    'produits/CreateProduct',
    async (values)=>{
        const response = await CreateProduct(values);
        return response
    }
)
export const updateProduit = createAsyncThunk(
    'produits/updateProduit',
    async (data)=>{
        const response = await UpdateProduct(data);
        return response.data
    }
)
export const getProduitById = createAsyncThunk(
    'produits/getProduitById',
    async (id)=>{
        const response = await GetProductById(id);
        return response.data
    }
)
export const deleteProduit = createAsyncThunk(
    'produits/deleteProduit',
    async (id)=>{
        const response = await DeleteProduct(id);
        return response
    }
)
export const getAllProduits = createAsyncThunk(
    'produits/GetProducts',
    async ()=>{
        const response = await GetProducts();
        return response.data
    }
)
export const produitSlice = createSlice({
    name:'produits',
    initialState,
    reducers :{

    },
    extraReducers: (builder)=>{
        builder
        //add new produit
            .addCase(createProduit.pending, (state)=>{
                state.CreateProduct='loading'
            })
            .addCase(createProduit.fulfilled, (state, action)=>{
               state.CreateProduct='success'
               console.log(action.payload)
            })
            .addCase(createProduit.rejected, (state) => {
                state.CreateProduct='failed'
            })

        //get all produits
            .addCase(getAllProduits.pending, (state)=>{
                state.GetProducts='loading'
            })
            .addCase(getAllProduits.fulfilled, (state, action)=>{
                state.GetProducts= 'success'
                console.log('payload', action.payload)
                state.allProduits= action.payload
            })
            .addCase(getAllProduits.rejected, (state)=>{
                state.GetProducts='failed'

            })
        //delete one produit
            .addCase(deleteProduit.pending, (state)=>{

            })
            .addCase(deleteProduit.fulfilled, (state, action)=>{
                console.log('payload', action)
                state.allProduits = state.allProduits.filter(p=> p._id !== action.payload)
            })
            .addCase(deleteProduit.rejected, (state, action)=>{

            })
        //get produit by ID
            .addCase(getProduitById.pending, (state)=>{

            })
            .addCase(getProduitById.fulfilled, (state, action)=>{
                console.log(action.payload);
                state.GetProductById= action.payload.data
            })
            .addCase(getProduitById.rejected, (state, action)=>{

            })
        //update produit
            .addCase(updateProduit.pending, (state)=>{
                state.UpdateProduct= 'loading'
            })
            .addCase(updateProduit.fulfilled, (state, action)=>{

                console.log("update produit payload",action.payload)
                state.UpdateProduct='success'
            
                    
              
                })
            .addCase(updateProduit.rejected, (state, action)=>{
                state.UpdateProduct = 'failure'
            })

    }
})

// eslint-disable-next-line no-empty-pattern
export const { } = produitSlice.actions;
export const selectProduit = (state) => state.produits.allProduits ;
export default produitSlice.reducer;
