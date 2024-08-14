import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: <any>[], //initialize assignments from json file(database)
  };
const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            console.log("successful setquiz")
            state.quizzes = action.payload;
            console.log("successful setquiz 2")
          },
      
        addQuiz: (state, {payload: quizzes}) => {
            console.log("successful add quiz")
            const newQuizzes: any = {
                _id: new Date().getTime().toString(),
                title: "New title",
                course: quizzes.course
            }
            state.quizzes = [...state.quizzes, newQuizzes]
        },
        deleteQuiz: (state, {payload: quizId}) => {
            console.log("successful delete quiz")

            state.quizzes = state.quizzes.filter(
                (q: any) => q._id !== quizId
            );
        },
        updateQuiz: (state, { payload: quiz }) => {
            console.log("successful update quiz")

            state.quizzes = state.quizzes.map((q: any) =>
              q._id === quiz._id ? quiz : q
            ) as any;
          },
        editQuiz: (state, { payload: assignmentId }) => {
            console.log("successful edit quiz")

        state.quizzes = state.quizzes.map((q: any) =>
            q._id === assignmentId ? { ...q, editing: true } : q
        ) as any;
        },
    }
})
export const {setQuizzes, addQuiz, deleteQuiz, editQuiz, updateQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer