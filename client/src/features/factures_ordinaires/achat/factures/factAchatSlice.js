import { createAsyncThunk , createSlice } from '@reduxjs/toolkit';
import { CreateFactureAchat ,  GetFactureAchats , GetFactureAchatById , UpdateFactureAchat } from './factAchatAPI';

const initialState={
    tabFacturesAchat:[],
    CreateFactureAchat:"",
    GetFactureAchats:"",
    GetFactureAchatById:"",
    UpdateFactureAchat:""
}
export const createFactureAchat = createAsyncThunk(
    'facturesAchat/CreateFactureAchat',
    async (values)=>{
        const response = await CreateFactureAchat(values);
        return response
    }
)

export const getFactureAchatById = createAsyncThunk(
    'facturesAchat/getFactureAchatById',
    async (id)=>{
        const response = await GetFactureAchatById(id);
        return response.data
    }
)

export const getFactureAchats = createAsyncThunk(
    'facturesAchat/GetFactureAchats',
    async ()=>{
        const response = await GetFactureAchats();
        return response.data
    }
)
export const updateFactureAchat = createAsyncThunk(
  'facturesAchat/UpdateFactureAchat',
  async (data)=>{
      const response = await UpdateFactureAchat(data);
      return response.data
  }
)
export const factureAchatSlice = createSlice({
    name:'facturesAchat',
    initialState,
    reducers :{

    },
    extraReducers: (builder)=>{
        builder
        //add new invoice
            .addCase(createFactureAchat.pending, (state)=>{
                state.CreateFactureAchat='loading'
            })
            .addCase(createFactureAchat.fulfilled, (state, action)=>{
               state.CreateFactureAchat='success'
               console.log(action.payload)
            })
            .addCase(createFactureAchat.rejected, (state) => {
                state.CreateFactureAchat='failed'
            })

        //get all facturesAchat
            .addCase(getFactureAchats.pending, (state)=>{
                state.GetFactureAchats='loading'
            })
            .addCase(getFactureAchats.fulfilled, (state, action)=>{
                state.GetFactureAchats= 'success'
                console.log('payload', action.payload)
                state.tabFacturesAchat= action.payload
            })
            .addCase(getFactureAchats.rejected, (state)=>{
                state.GetFactureAchats='failed'

            })
 
        //get invoice by ID
            .addCase(getFactureAchatById.pending, (state)=>{

            })
            .addCase(getFactureAchatById.fulfilled, (state, action)=>{
                console.log(action.payload);
                state.GetFactureAchatById= action.payload.data
            })
            .addCase(getFactureAchatById.rejected, (state, action)=>{

            })

       //update invoice
       .addCase(updateFactureAchat.pending, (state)=>{
        state.UpdateFactureAchat= 'loading'
    })
    .addCase(updateFactureAchat.fulfilled, (state, action)=>{

    console.log("update invoice payload",action.payload)
        state.UpdateFactureAchat='success'
            
      
        })
    .addCase(updateFactureAchat.rejected, (state, action)=>{
        state.UpdateFactureAchat = 'failure'
    })
    }
})

// eslint-disable-next-line no-empty-pattern
export const { } = factureAchatSlice.actions;
export const selectTabFacturesAchat = (state) => state.facturesAchat.tabFacturesAchat ;
export default factureAchatSlice.reducer;
