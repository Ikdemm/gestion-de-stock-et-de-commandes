import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {CreateSupplier,UpdateSupplier,  GetSuppliers , GetSupplierById, DeleteSupplier  } from './fournisseursAPI';

const initialState={
    tabfournisseurs:[],
    createFournisseur:"",
    updateFournisseur:"",
    getAllFournisseurs:"",
    getFournisseurById:"",
    deleteFournisseur:""
}
export const CreateFournisseur = createAsyncThunk(
    'fournisseurs/createFournisseur',
    async (values)=>{
        const response = await CreateSupplier(values);
        return response
    }
)
export const updateFournisseur = createAsyncThunk(
    'fournisseurs/updateFournisseur',
    async (data)=>{
        const response = await UpdateSupplier(data);
        return response.data
    }
)
export const GetFournisseurById = createAsyncThunk(
    'fournisseurs/getFournisseurById',
    async (id)=>{
        const response = await GetSupplierById(id);
        return response.data
    }
)
export const DeleteFournisseur = createAsyncThunk(
    'fournisseurs/deleteFournisseur',
    async (id)=>{
        const response = await DeleteSupplier(id);
        return response
    }
)
export const GetAllFournisseurs = createAsyncThunk(
    'fournisseurs/GetSuppliers',
    async ()=>{
        const response = await GetSuppliers();
        return response.data
    }
)
export const fournisseurSlice = createSlice({
    name:'fournisseurs',
    initialState,
    reducers :{

    },
    extraReducers: (builder)=>{
        builder
        //add new fournisseur
            .addCase(CreateFournisseur.pending, (state)=>{
                state.createFournisseur='loading'
            })
            .addCase(CreateFournisseur.fulfilled, (state, action)=>{
               state.createFournisseur='success'
               console.log(action.payload)
            })
            .addCase(CreateFournisseur.rejected, (state) => {
                state.createFournisseur='failed'
            })

        //get all fournisseurs
            .addCase(GetAllFournisseurs.pending, (state)=>{
                state.getAllCategories='loading'
            })
            .addCase(GetAllFournisseurs.fulfilled, (state, action)=>{
                state.getAllFournisseurs= 'success'
                console.log('payload', action.payload)
                state.tabfournisseurs= action.payload
            })
            .addCase(GetAllFournisseurs.rejected, (state)=>{
                state.getAllCategories='failed'

            })
        //delete one fournisseur
            .addCase(DeleteFournisseur.pending, (state)=>{

            })
            .addCase(DeleteFournisseur.fulfilled, (state, action)=>{
                console.log('payload', action)
                state.tabfournisseurs = state.tabfournisseurs.filter(p=> p._id !== action.payload)
            })
            .addCase(DeleteFournisseur.rejected, (state, action)=>{

            })
        //get fournisseur by ID
            .addCase(GetFournisseurById.pending, (state)=>{

            })
            .addCase(GetFournisseurById.fulfilled, (state, action)=>{
                console.log(action.payload);
                state.getFournisseurById= action.payload.data
            })
            .addCase(GetFournisseurById.rejected, (state, action)=>{

            })
        //update fournisseur
            .addCase(updateFournisseur.pending, (state)=>{
                state.updateFournisseur= 'loading'
            })
            .addCase(updateFournisseur.fulfilled, (state, action)=>{

                console.log("update fournisseur payload",action.payload)
                state.updateFournisseur='success'
            
                    
              
                })
            .addCase(updateFournisseur.rejected, (state, action)=>{
                state.updateFournisseur = 'failure'
            })

    }
})

// eslint-disable-next-line no-empty-pattern
export const { } = fournisseurSlice.actions;
export const selectFournisseur = (state) => state.fournisseurs.tabfournisseurs ;
export default fournisseurSlice.reducer;
