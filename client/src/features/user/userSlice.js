import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {login , register , getUsers} from "./userAPI";
const initialState={
    tabUsers:[],
    register:"",
    login:"",
    getUsers:"",
}
export const Login = createAsyncThunk(
    'users/login',
    async (values)=>{
        const response = await login(values);
        return response
    }
)
export const Register = createAsyncThunk(
    'users/register',
    async (values)=>{
        const response = await register(values);
        return response
    }
)
export const GetUsers = createAsyncThunk(
    'users/getUsers',
    async ()=>{
        const response = await getUsers();
        return response.data
    }
)

export const userSlice = createSlice({
name:"users",
initialState,
reducers:{

},
extraReducers: (builder)=>{
    builder
    //create new user
    .addCase(Register.pending, (state)=>{
        state.register='loading'

    })
    .addCase(Register.fulfilled, (state, action)=>{
        state.register='success'
        console.log(action.payload)
    })
    .addCase(Register.rejected, (state)=>{
        state.register='failed'

    })
    //login
    .addCase(Login.pending, (state)=>{
        state.login='loading'

    })
    .addCase(Login.fulfilled, (state, action)=>{
        state.login='success'
        console.log(action.payload)
    })
    .addCase(Login.rejected, (state)=>{
        state.login='failed'

    })
     //get all users
     .addCase(GetUsers.pending, (state)=>{
        state.getUsers='loading'
    })
    .addCase(GetUsers.fulfilled, (state, action)=>{
        state.getUsers= 'success'
        console.log('payload', action.payload)
        state.tabUsers= action.payload
    })
    .addCase(GetUsers.rejected, (state)=>{
        state.getUsers='failed'

    })
}
})
// eslint-disable-next-line no-empty-pattern
export const { }= userSlice.actions ;  
export const selectUser = (state) => state.users.tabUsers ;
export default userSlice.reducer;