import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const updateQuestion = async (courseId: string, quizId: string, question: any) => {
  const response = await axios.put(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions/${question._id}`, question);
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await axios.delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

export const createQuestion = async (courseId: string, quizId: string, question: any) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions/new`, question);
  return response.data;
};


export const findQuestionsForQuiz = async (courseId: string, quizId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions`);
  return response.data;
};

export const findQuestionForQuiz = async (courseId: string, quizId: string, questionId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions/${questionId}`);
  return response.data;
};

