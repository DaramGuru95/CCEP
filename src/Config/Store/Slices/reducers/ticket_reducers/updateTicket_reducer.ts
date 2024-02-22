import { createSlice } from "@reduxjs/toolkit"

interface userDetails {
    isLoading:boolean
    status:string,
     statusMessage:string,
    

}

const initialState ={
    isLoading:false,
    status:"",
     statusMessage:"",
   
}

const updateTicketsReducer = createSlice({
    name:'settings/userDetails',
    initialState,
     reducers:{
        updateTicketInitialize:(state)=>{
            state.isLoading=true;
            state.status="";
            
        },
        updateTicketSuccess:(state,action)=>{
            state.isLoading=false;
            state.status="success"
            state.statusMessage=action.payload.message
        } ,
        updateTicketFailed:(state,action)=>{
            state.isLoading=false;
            state.status='failed';
            state.statusMessage=action.payload
        }  
     },

})


export const {updateTicketInitialize,updateTicketSuccess,updateTicketFailed} = updateTicketsReducer.actions

export default updateTicketsReducer