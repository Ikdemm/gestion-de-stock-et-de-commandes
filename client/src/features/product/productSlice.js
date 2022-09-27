import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {CreateProduct,UpdateProduct,  GetProducts , GetProductById, DeleteProduct  } from './productAPI';

const initialState={
    tabproduits:[],
    createProduit:"",
    updateProduit:"",
    getAllProduits:"",
    getProduitById:"",
    deleteProduit:""
}
export const CreateProduit = createAsyncThunk(
    'produits/createProduit',
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
export const GetProduitById = createAsyncThunk(
    'produits/getProduitById',
    async (id)=>{
        const response = await GetProductById(id);
        return response.data
    }
)
export const DeleteProduit = createAsyncThunk(
    'produits/deleteProduit',
    async (id)=>{
        const response = await DeleteProduct(id);
        return response
    }
)
export const GetAllProduits = createAsyncThunk(
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
            .addCase(CreateProduit.pending, (state)=>{
                state.createProduit='loading'
            })
            .addCase(CreateProduit.fulfilled, (state, action)=>{
               state.createProduit='success'
               console.log(action.payload)
            })
            .addCase(CreateProduit.rejected, (state) => {
                state.createProduit='failed'
            })

        //get all produits
            .addCase(GetAllProduits.pending, (state)=>{
                state.getAllCategories='loading'
            })
            .addCase(GetAllProduits.fulfilled, (state, action)=>{
                state.getAllProduits= 'success'
                console.log('payload', action.payload)
                state.tabproduits= action.payload
            })
            .addCase(GetAllProduits.rejected, (state)=>{
                state.getAllCategories='failed'

            })
        //delete one produit
            .addCase(DeleteProduit.pending, (state)=>{

            })
            .addCase(DeleteProduit.fulfilled, (state, action)=>{
                console.log('payload', action)
                state.tabproduits = state.tabproduits.filter(p=> p._id !== action.payload)
            })
            .addCase(DeleteProduit.rejected, (state, action)=>{

            })
        //get produit by ID
            .addCase(GetProduitById.pending, (state)=>{

            })
            .addCase(GetProduitById.fulfilled, (state, action)=>{
                console.log(action.payload);
                state.getProduitById= action.payload.data
            })
            .addCase(GetProduitById.rejected, (state, action)=>{

            })
        //update produit
            .addCase(updateProduit.pending, (state)=>{
                state.updateProduit= 'loading'
            })
            .addCase(updateProduit.fulfilled, (state, action)=>{

                console.log("update produit payload",action.payload)
                state.updateProduit='success'
            
                    
              
                })
            .addCase(updateProduit.rejected, (state, action)=>{
                state.updateProduit = 'failure'
            })

    }
})

// eslint-disable-next-line no-empty-pattern
export const { } = produitSlice.actions;
export const selectProduit = (state) => state.produits.tabproduits ;
export default produitSlice.reducer;
