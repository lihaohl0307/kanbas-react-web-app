import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  message: "Hello World",
};
const helloSlice = createSlice({
  name: "hello",
  initialState,
  reducers: {},
});
export default helloSlice.reducer;

// In the context of Redux Toolkit, a "slice" is a concept that represents a single unit of state and the logic that manipulates that state. 
// A slice typically includes:
// Initial State: The initial state of this unit.
// Reducers: Functions that determine how the state should change in response to actions.
// Actions: The action creators that dispatch these actions.