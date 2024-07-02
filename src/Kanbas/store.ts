import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Dashboard/Courses/Modules/reducer";
import assignmentsReducer from "./Dashboard/Courses/Assignments/reducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer
  },
});
export default store;