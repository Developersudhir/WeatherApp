import { wheatherSlice } from "./WheatherSlice";
import { configureStore } from "@reduxjs/toolkit";
    

const store= configureStore({
    reducer:{
        // here we giving name to slice 
        wheather:wheatherSlice.reducer
    }
});
export default store;
