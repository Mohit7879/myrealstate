import { createSlice } from "@reduxjs/toolkit";

const initialState={
  
    search:"hello"
    
}


const userSlice = createSlice(
    {
        name:'search',
        initialState,
        reducers:{
            setsearch:(state,action)=>{
                state.search=action.payload
             },

         }
    }
)

export const {setsearch
    }=userSlice.actions;
export default userSlice.reducer