import React from 'react';
import './QuizDetails.css';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

  return (
    <div className="quiz-preview-container">
      <div className="d-flex justify-content-end mb-3">
        <button 
          className="btn btn-light me-2"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview`)}
        >
          Preview
        </button>
        <button 
          className="btn btn-light"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)}
        >
          Edit
        </button>
      </div>

      <hr />

      <h2 className="text-start">Q1 - {quiz?.title}</h2>

      <div className="quiz-details mt-4">
        <div><b>Quiz Type</b>: {quiz?.quizType}</div>
        <div><b>Points</b>: {quiz?.points}</div>
        <div><b>Assignment Group</b>: {quiz?.assignmentGroup}</div>
        <div><b>Shuffle Answers</b>: {quiz?.shuffleAnswers ? "Yes" : "No"}</div>
        <div><b>Time Limit</b>: {quiz?.timeLimit > 0 ? `${quiz.timeLimit} Minutes` : "No"}</div>
        <div><b>Multiple Attempts</b>: {quiz?.multipleAttempts ? "Yes" : "No"}</div>
        <div><b>View Responses</b>: {quiz?.showCorrectAnswers}</div>
        <div><b>Show Correct Answers</b>: {quiz?.showCorrectAnswers ? "Immediately" : "Later"}</div>
        <div><b>One Question at a Time</b>: {quiz?.oneQuestionAtATime ? "Yes" : "No"}</div>
        <div><b>Require Respondus LockDown Browser</b>: {quiz?.requireLockDownBrowser ? "Yes" : "No"}</div>
        <div><b>Required to View Quiz Results</b>: {quiz?.requiredToViewQuizResults ? "Yes" : "No"}</div>
        <div><b>Webcam Required</b>: {quiz?.webcamRequired ? "Yes" : "No"}</div>
        <div><b>Lock Questions After Answering</b>: {quiz?.lockQuestionsAfterAnswering ? "Yes" : "No"}</div>
      </div>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{quiz?.dueDate}</td>
            <td>Everyone</td>
            <td>{quiz?.availableFrom}</td>
            <td>{quiz?.availableUntil}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
