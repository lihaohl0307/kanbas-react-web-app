import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Dashboard/Courses/Modules/reducer";
import assignmentsReducer from "./Dashboard/Courses/Assignments/reducer";
import accountReducer from "./Account/reducer";
import quizzesReducer from "./Dashboard/Courses/Quizzes/reducer"
import questionsReducer from "./Dashboard/Courses/Quizzes/Questions/reducer"


const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    accountReducer,
    quizzesReducer,
    questionsReducer
  },
});
export default store;