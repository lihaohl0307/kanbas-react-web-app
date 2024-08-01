import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Dashboard/Courses/Modules/reducer";
import assignmentsReducer from "./Dashboard/Courses/Assignments/reducer";
import accountReducer from "./Account/reducer";


const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    accountReducer
  },
});
export default store;