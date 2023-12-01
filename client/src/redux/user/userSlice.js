import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false,
    searchterm:"",

    
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


            deleteUserSuccess:(state,action)=>{
                
                state.currentUser=null;
                state.loading=false;
                state.error=null;
                
            },

            deleteUserFailure:(state,action)=>{
                
                state.error=action.payload;
                state.loading=false;
            },
              
            signoutSuccess:(state,action)=>{
                
                state.currentUser=null;
                state.loading=false;
                state.error=null;
                
            },

            signoutFailure:(state,action)=>{
                
                state.error=action.payload;
                state.loading=false;
            },

            setsearchterm:(state,action)=>{
                state.searchterm=action.payload;
            }



          
        }
    }
)

export const {signinStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
     deleteUserSuccess,
    deleteUserFailure,
     signoutSuccess,
     signoutFailure,
     setsearchterm,
    }=userSlice.actions;
export default userSlice.reducer