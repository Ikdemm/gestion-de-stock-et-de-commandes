import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {CreateCustomer,UpdateCustomer,  GetCustomers , GetCustomerById, DeleteCustomer  } from './customerAPI';

const initialState={
    tabclients:[],
    createClient:"",
    updateClient:"",
    getAllClients:"",
    getClientById:"",
    deleteClient:""
}
export const CreateClient = createAsyncThunk(
    'clients/createClient',
    async (values)=>{
        const response = await CreateCustomer(values);
        return response
    }
)
export const updateClient = createAsyncThunk(
    'clients/updateClient',
    async (data)=>{
        const response = await UpdateCustomer(data);
        return response.data
    }
)
export const GetClientById = createAsyncThunk(
    'clients/getClientById',
    async (id)=>{
        const response = await GetCustomerById(id);
        return response.data
    }
)
export const DeleteClient = createAsyncThunk(
    'clients/deleteClient',
    async (id)=>{
        const response = await DeleteCustomer(id);
        return response
    }
)
export const GetAllClients = createAsyncThunk(
    'clients/GetCustomers',
    async ()=>{
        const response = await GetCustomers();
        return response.data
    }
)
export const clientSlice = createSlice({
    name:'clients',
    initialState,
    reducers :{

    },
    extraReducers: (builder)=>{
        builder
        //add new client
            .addCase(CreateClient.pending, (state)=>{
                state.createClient='loading'
            })
            .addCase(CreateClient.fulfilled, (state, action)=>{
               state.createClient='success'
               console.log(action.payload)
            })
            .addCase(CreateClient.rejected, (state) => {
                state.createClient='failed'
            })

        //get all clients
            .addCase(GetAllClients.pending, (state)=>{
                state.getAllCategories='loading'
            })
            .addCase(GetAllClients.fulfilled, (state, action)=>{
                state.getAllClients= 'success'
                console.log('payload', action.payload)
                state.tabclients= action.payload
            })
            .addCase(GetAllClients.rejected, (state)=>{
                state.getAllCategories='failed'

            })
        //delete one client
            .addCase(DeleteClient.pending, (state)=>{

            })
            .addCase(DeleteClient.fulfilled, (state, action)=>{
                console.log('payload', action)
                state.tabclients = state.tabclients.filter(p=> p._id !== action.payload)
            })
            .addCase(DeleteClient.rejected, (state, action)=>{

            })
        //get client by ID
            .addCase(GetClientById.pending, (state)=>{

            })
            .addCase(GetClientById.fulfilled, (state, action)=>{
                console.log(action.payload);
                state.getClientById= action.payload.data
            })
            .addCase(GetClientById.rejected, (state, action)=>{

            })
        //update client
            .addCase(updateClient.pending, (state)=>{
                state.updateClient= 'loading'
            })
            .addCase(updateClient.fulfilled, (state, action)=>{

                console.log("update client payload",action.payload)
                state.updateClient='success'
            
                    
              
                })
            .addCase(updateClient.rejected, (state, action)=>{
                state.updateClient = 'failure'
            })

    }
})

// eslint-disable-next-line no-empty-pattern
export const { } = clientSlice.actions;
export const selectClient = (state) => state.clients.tabclients ;
export default clientSlice.reducer;
