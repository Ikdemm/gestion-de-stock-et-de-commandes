import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {CreateLigneAchatOrdinaire, UpdateLigneAchatOrdinaire ,  GetAllLignesAchatsOridinaires , GetOneLigneAchatOrdinaireById, DeleteOneLigneAchatOrdinaire  } from './ligneAchatOrdinaireAPI';

const initialState={
    AllLignesAchatsOridinaires:[],
    CreateLigneAchatOrdinaire:"",
    UpdateLigneAchatOrdinaire:"",
    GetAllLignesAchatsOridinaires:"",
    GetOneLigneAchatOrdinaireById:"",
    DeleteOneLigneAchatOrdinaire:""
}
export const createLigneAchatOrdinaire = createAsyncThunk(
    'lines_achat_fact/CreateLigneAchatOrdinaire',
    async (values)=>{
        const response = await CreateLigneAchatOrdinaire(values);
        return response
    }
)
export const updateLigneAchatOrdinaire = createAsyncThunk(
    'lines_achat_fact/updateLigneAchatOrdinaire',
    async (data)=>{
        const response = await UpdateLigneAchatOrdinaire(data);
        return response.data
    }
)
export const getOneLigneAchatOrdinaireById = createAsyncThunk(
    'lines_achat_fact/getOneLigneAchatOrdinaireById',
    async (id)=>{
        const response = await GetOneLigneAchatOrdinaireById(id);
        return response.data
    }
)
export const deleteOneLigneAchatOrdinaire = createAsyncThunk(
    'lines_achat_fact/deleteOneLigneAchatOrdinaire',
    async (id)=>{
        const response = await DeleteOneLigneAchatOrdinaire(id);
        return response
    }
)
export const getAllLignesAchatsOridinaires = createAsyncThunk(
    'lines_achat_fact/GetAllLignesAchatsOridinaires',
    async ()=>{
        const response = await GetAllLignesAchatsOridinaires();
        return response.data
    }
)
export const ligneAchatOrdinaireSlice = createSlice({
    name:'lines_achat_fact',
    initialState,
    reducers :{

    },
    extraReducers: (builder)=>{
        builder
        //add new line
            .addCase(createLigneAchatOrdinaire.pending, (state)=>{
                state.CreateLigneAchatOrdinaire='loading'
            })
            .addCase(createLigneAchatOrdinaire.fulfilled, (state, action)=>{
               state.CreateLigneAchatOrdinaire='success'
               console.log(action.payload)
            })
            .addCase(createLigneAchatOrdinaire.rejected, (state) => {
                state.CreateLigneAchatOrdinaire='failed'
            })

        //get all lines_achat_fact
            .addCase(getAllLignesAchatsOridinaires.pending, (state)=>{
                state.GetAllLignesAchatsOridinaires='loading'
            })
            .addCase(getAllLignesAchatsOridinaires.fulfilled, (state, action)=>{
                state.GetAllLignesAchatsOridinaires= 'success'
                console.log('payload', action.payload)
                state.AllLignesAchatsOridinaires= action.payload
            })
            .addCase(getAllLignesAchatsOridinaires.rejected, (state)=>{
                state.GetAllLignesAchatsOridinaires='failed'

            })
        //delete one line
            .addCase(deleteOneLigneAchatOrdinaire.pending, (state)=>{

            })
            .addCase(deleteOneLigneAchatOrdinaire.fulfilled, (state, action)=>{
                console.log('payload', action)
                state.AllLignesAchatsOridinaires = state.AllLignesAchatsOridinaires.filter(p=> p._id !== action.payload)
            })
            .addCase(deleteOneLigneAchatOrdinaire.rejected, (state, action)=>{

            })
        //get line by ID
            .addCase(getOneLigneAchatOrdinaireById.pending, (state)=>{

            })
            .addCase(getOneLigneAchatOrdinaireById.fulfilled, (state, action)=>{
                console.log(action.payload);
                state.GetOneLigneAchatOrdinaireById= action.payload.data
            })
            .addCase(getOneLigneAchatOrdinaireById.rejected, (state, action)=>{

            })
        //update line
            .addCase(updateLigneAchatOrdinaire.pending, (state)=>{
                state.UpdateLigneAchatOrdinaire= 'loading'
            })
            .addCase(updateLigneAchatOrdinaire.fulfilled, (state, action)=>{

                console.log("update line payload",action.payload)
                state.UpdateLigneAchatOrdinaire='success'
            
                    
              
                })
            .addCase(updateLigneAchatOrdinaire.rejected, (state, action)=>{
                state.UpdateLigneAchatOrdinaire = 'failure'
            })

    }
})

// eslint-disable-next-line no-empty-pattern
export const { } = ligneAchatOrdinaireSlice.actions;
export const selectTabAllLignesAchatsOridinaires = (state) => state.lines_achat_fact.AllLignesAchatsOridinaires ;
export default ligneAchatOrdinaireSlice.reducer;
