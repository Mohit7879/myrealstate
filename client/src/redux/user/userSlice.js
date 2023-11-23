import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false,
    
}


const userSlice = createSlice(
    {
        name:'user',
        initialState,
        reducers:{
            signinStart:(state)=>{
                state.loading=true;
                state.error=null;

            },

            signInSuccess:(state,action)=>{
                console.log(action.payload);
                state.currentUser=action.payload;
                state.loading=false;
                state.error=null;
                
            },

            signInFailure:(state,action)=>{
                console.log(action.payload);
                state.error=action.payload;
                state.loading=false;
            },

            updateUserStart:(state)=>{
                state.loading=true;
                state.error=null;

            },

            updateUserSuccess:(state,action)=>{
                console.log(action.payload);
                state.currentUser=action.payload;
                state.loading=false;
                state.error=null;
                
            },

            updateUserFailure:(state,action)=>{
                console.log(action.payload);
                state.error=action.payload;
                state.loading=false;
            },


          
        }
    }
)

export const {signinStart,signInSuccess,signInFailure,updateUserStart,updateUserSuccess,updateUserFailure}=userSlice.actions;
export default userSlice.reducer