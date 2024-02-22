import { createSlice } from "@reduxjs/toolkit";

interface AlertState {
    open:boolean;
    message:string;
    severity:string
}

const initialState:AlertState ={
    open:false,
    message:"",
    severity:'',
}


const alertSlice = createSlice({
    name:"alert",
    "initialState":initialState,
    reducers:{
        showAlert:(state,action)=>{
            state.open=true;
            state.message=action.payload.message;
            state.severity=action.payload.status;
        },
        closeAlert :(state)=>{
            state.open=false;
            state.message="";
            state.severity="";
        }
    }
})


export const  {showAlert,closeAlert}  = alertSlice.actions;

export default  alertSlice 

