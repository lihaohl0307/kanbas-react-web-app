import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: <any>[], // Array to hold questions
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, { payload: { quizId, question } }) => {
      console.log("successful add question");
      const newQuestions: any = {
        _id: new Date().getTime().toString(),
        title: question.title,
        quizId: quizId,
        points: question.points,
        type: question.type
      }
      console.log(quizId);
      console.log(question);

      if (question.quiz === quizId) {
        state.questions = [...state.questions, newQuestions];
      }
      console.log(state.questions);

    },
    updateQuestion: (state, { payload: updatedQuestion }) => {
      console.log("successful update question")
      state.questions = state.questions.map((q: any) =>
        q._id === updatedQuestion._id ? updatedQuestion : q
      );
    },
    deleteQuestion: (state, { payload: questionId }) => {
      console.log("successful delete question")
      state.questions = state.questions.filter((q: any) => q._id !== questionId);
    },
  },
});

export const { setQuestions, addQuestion, updateQuestion, deleteQuestion } =
  questionsSlice.actions;
export default questionsSlice.reducer;
