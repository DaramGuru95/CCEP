import { createSlice } from "@reduxjs/toolkit"

interface userDetails {
    isLoading:boolean
    status:string,
     statusMessage:string,
     userDetails:{
        agent_details:{
            branch:  string|null,
            department:  string|null,
            designation:  string|null,
            employee_id: number| null,
            joining_date: string|null,
            language: string|null,
            region: string|null,
            reporting_to: string|null,
            shift: string|null
        },
        profile_details:{
            email: string|null,
            first_name: string|null,
            job_title:string|null,
            last_name: string|null,
            middle_name: string|null,
            mobile_number: string|null
        }|null
     }

}

const initialState ={
    isLoading:false,
    status:"",
     statusMessage:"",
     userDetails:{
        agent_details:{
            branch:  "",
            department:  "",
            designation:  "",
            employee_id: "",
            joining_date: "",
            language: "",
            region: "",
            reporting_to: "",
            shift: ""
        },
        profile_details:{
            email:"",
            first_name:"",
            job_title:"",
            last_name:"",
            middle_name:"",
            mobile_number:""
        }
     }  
}

const userDetailsReducer = createSlice({
    name:'settings/userDetails',
    initialState,
     reducers:{
        setUserDetailsStart:(state)=>{
            state.isLoading=true;
            state.status="";
            
        },
        setuserDetailsSuccess:(state,action)=>{
            state.isLoading=false;
            state.userDetails=action.payload
        } ,
        setuserDetailsFailed:(state,action)=>{
            state.isLoading=false;
            state.status='failed';
            state.statusMessage=action.payload
        }  
     },

})


export const {setUserDetailsStart,setuserDetailsSuccess,setuserDetailsFailed} = userDetailsReducer.actions

export default userDetailsReducer