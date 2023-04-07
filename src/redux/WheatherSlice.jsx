import { createSlice } from "@reduxjs/toolkit";

const wheatherSlice=createSlice({
    name:"userslice",
    initialState:[],
    reducers:{
        weatherDetailsList(state,action){
            // console.log(action.payload);
            let isFound = state.findIndex((details) => {
                return details.name.toLowerCase() === action.payload.name.toLowerCase();
              });
            // console.log(isFound);
            if(isFound===-1){
            const res=state.push(action.payload);
            }
            else{
                let res2=state.splice(isFound,action.payload);
                // console.log("Logic For replacing old element With New one");
                // console.log(" I Am res2");
            }
            // console.log("I Am From Reducer Slice And Store");
            // console.log(res);    
        }
    }
});
export {wheatherSlice}
export const {weatherDetailsList}=wheatherSlice.actions;