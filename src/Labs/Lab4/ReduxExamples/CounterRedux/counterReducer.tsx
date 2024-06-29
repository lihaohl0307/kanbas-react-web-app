import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    count: 0,
};
const counterSlice = createSlice({
    name: "counter",
    initialState,
    // Each reducer function defined within a slice only receives the state of that slice, 
    // not the entire Redux store state. 
    // This is because each slice manages its own portion of the state. 
    // The slice's reducer function is only concerned with updating its own slice of the state.
    reducers: {
        increment: (state) => {
            state.count = state.count + 1;
        },
        decrement: (state) => {
            state.count = state.count - 1;
        }
    },      
});
export const {increment, decrement} = counterSlice.actions;
export default counterSlice.reducer;