import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const userLogin=createAsyncThunk('loginuser',async(userCredintialsObject,thunkApi)=>{
    let response= await axios.post('/user-api/login',userCredintialsObject)
    let data=response.data;
    if(data.message==="login success"){
        localStorage.setItem("token",data.payload);
        return data.userObj; 
    }
    if(data.message==="invalid user"||data.message==="invalid password"){
        return thunkApi.rejectWithValue(data);
    }
})

let userSlice=createSlice({
    name:'user',
    initialState:{
        userObj:{},
        isError:false,
        isSuccess:false,
        isLoading:false,
        errMsg:''
    },
    reducers:{},
    extraReducers:{
        [userLogin.pending]:(state,action)=>{
            state.isLoading=true;
        },
        [userLogin.fulfilled]:(state,action)=>{
            state.userObj=action.payload;
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.errMsg='';
        },
        [userLogin.rejected]:(state,action)=>{
            state.iserror=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.errMsg=action.payload.message;
        }
    }
})

export const {}=userSlice.actions;

export default userSlice.reducer;
