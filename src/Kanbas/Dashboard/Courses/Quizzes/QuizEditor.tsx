import { useLocation, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addQuiz, updateQuiz } from "./reducer";
import * as client from "./client";
import { BsThreeDotsVertical, BsCheckCircle, BsXCircle } from "react-icons/bs";
import ReactQuill from 'react-quill'; // Import ReactQuill
import { Link } from "react-router-dom";
import Questions from "./Questions";
import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`; 

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const [questions, setQuestions] = useState<any[]>([]); // Local state for questions

  const existingQuiz = quizzes.find((quiz: any) => quiz._id === qid);
  const [activeTab, setActiveTab] = useState("details");
  const [title, setTitle] = useState(existingQuiz?.title || "");
  const [description, setDescription] = useState(existingQuiz?.description || "");
  const [quizType, setQuizType] = useState(existingQuiz?.quizType || "Graded Quiz");
  // const [points, setPoints] = useState(existingQuiz?.points || 100);
  const [assignmentGroup, setAssignmentGroup] = useState(existingQuiz?.assignmentGroup || "Quizzes");
  const [shuffleAnswers, setShuffleAnswers] = useState(existingQuiz?.shuffleAnswers || true);
  const [timeLimit, setTimeLimit] = useState(existingQuiz?.timeLimit || 20);
  const [multipleAttempts, setMultipleAttempts] = useState(existingQuiz?.multipleAttempts || 1); // Initialize as number
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(existingQuiz?.showCorrectAnswers || "Immediately");
  const [accessCode, setAccessCode] = useState(existingQuiz?.accessCode || "");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(existingQuiz?.oneQuestionAtATime || true);
  const [webcamRequired, setWebcamRequired] = useState(existingQuiz?.webcamRequired || false);
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(existingQuiz?.lockQuestionsAfterAnswering || false);
  const [dueDate, setDueDate] = useState(existingQuiz?.dueDate || "");
  const [availableFrom, setAvailableFrom] = useState(existingQuiz?.availableFrom || "");
  const [availableUntil, setAvailableUntil] = useState(existingQuiz?.availableUntil || "");

  const isPublished = existingQuiz?.isPublished || false;

  const [totalPoints, setTotalPoints] = useState(0); // State to store total points

   // Directly use the findQuestionsForQuiz function here
   const findQuestionsForQuiz = async (courseId: string, quizId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions`);
    return response.data;
  };

  useEffect(() => {
    const fetchQuestionsAndCalculatePoints = async () => {
      const fetchedQuestions = await findQuestionsForQuiz(cid as string, qid as string);
      setQuestions(fetchedQuestions); // Set the questions in local state
      const total = fetchedQuestions.reduce((sum: number, question: any) => sum + question.points, 0);
      setTotalPoints(total);
    };

    fetchQuestionsAndCalculatePoints();
  }, [cid, qid]);

  const saveQuiz = async (publish: boolean = false) => {
    const quiz = {
      _id: existingQuiz?._id,
      title,
      description,
      quizType,
      points: totalPoints,
      assignmentGroup,
      shuffleAnswers,
      timeLimit,
      multipleAttempts,
      showCorrectAnswers,
      accessCode,
      oneQuestionAtATime,
      webcamRequired,
      lockQuestionsAfterAnswering,
      dueDate,
      availableFrom,
      availableUntil,
      isPublished: publish ? true : existingQuiz?.isPublished || false,
    };

    if (existingQuiz) {
      await client.updateQuiz(cid as string, quiz);
      dispatch(updateQuiz(quiz));
    } else {
      const newQuiz = await client.createQuiz(cid as string, quiz);
      dispatch(addQuiz(newQuiz));
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  useEffect(() => {
    // Check if the current route is the Questions tab
    if (location.pathname.endsWith("/Questions")) {
      setActiveTab("questions");
    } else {
      setActiveTab("details");
    }
  }, [location.pathname]);


const renderDetailsTab = () => (
  <div className="quiz-details-container">
    <div className="form-group mb-3">
      <label htmlFor="wd-name" className="form-label"><b>Quiz Name: </b></label>
      <input
        id="wd-name"
        className="form-control"
        placeholder="Unnamed Quiz"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>

    <div className="form-group mb-3">
      <label htmlFor="wd-description" className="form-label">
        <b>Quiz Instructions:</b>
      </label>
      {/* <textarea 
      id="wd-description" 
      className="form-control" 
      rows={8}
      value={description ? description: "Enter assignment description..."}
      onChange={(e) => setDescription(e.target.value)}>
      </textarea> */}
      <ReactQuill 
        id="wd-description" 
        value={description ? description: "Enter assignment description..."}
        onChange={setDescription} 
      />
    </div>

    

    <div className="row">
      <div className="col-md-6">
        <div className="form-group mb-3">
          <label htmlFor="wd-quiz-type" className="form-label"><b>Quiz Type</b></label>
          <select
            id="wd-quiz-type"
            className="form-select"
            value={quizType}
            onChange={(e) => setQuizType(e.target.value)}
          >
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
        </div>
      </div>

      <div className="col-md-6">
        <div className="form-group mb-3">
          <label htmlFor="wd-assignment-group" className="form-label"><b>Assignment Group</b></label>
          <select
            id="wd-assignment-group"
            className="form-select"
            value={assignmentGroup}
            onChange={(e) => setAssignmentGroup(e.target.value)}
          >
            <option value="Quizzes">Quizzes</option>
            <option value="Exams">Exams</option>
            <option value="Assignments">Assignments</option>
            <option value="Project">Project</option>
          </select>
        </div>
      </div>
    </div>

    <div className="form-group mb-3">
      <label className="form-label"><b>Options</b></label>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-shuffle-answers"
          checked={shuffleAnswers}
          onChange={(e) => setShuffleAnswers(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="wd-shuffle-answers">Shuffle Answers</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-time-limit-check"
          checked={!!timeLimit}
          onChange={(e) => setTimeLimit(e.target.checked ? 20 : 0)}
        />
        <label className="form-check-label" htmlFor="wd-time-limit-check">Time Limit</label>
        {timeLimit > 0 && (
          <div className="input-group mt-2">
            <input
              id="wd-time-limit"
              className="form-control"
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
            />
            <span className="input-group-text">Minutes</span>
          </div>
        )}
        </div>
        <div className="form-check mb-3">
          <label className="form-label"><b>Allow Multiple Attempts</b></label>
          <input
            className="form-control"
            type="number"
            id="wd-multiple-attempts"
            value={multipleAttempts}
            min="1"
            onChange={(e) => setMultipleAttempts(Number(e.target.value))}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="wd-show-correct-answers" className="form-label"><b>Show Correct Answers</b></label>
          <select
            id="wd-show-correct-answers"
            className="form-select"
            value={showCorrectAnswers}
            onChange={(e) => setShowCorrectAnswers(e.target.value)}
          >
            <option value="Immediately">Immediately</option>
            <option value="After First Attempt">After First Attempt</option>
            <option value="After Quiz Ends">After Quiz Ends</option>
            <option value="Never">Never</option>
          </select>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="wd-one-question-at-a-time"
            checked={oneQuestionAtATime}
            onChange={(e) => setOneQuestionAtATime(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="wd-one-question-at-a-time">One Question at a Time</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="wd-webcam-required"
            checked={webcamRequired}
            onChange={(e) => setWebcamRequired(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="wd-webcam-required">Webcam Required</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="wd-lock-questions"
            checked={lockQuestionsAfterAnswering}
            onChange={(e) => setLockQuestionsAfterAnswering(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="wd-lock-questions">Lock Questions After Answering</label>
        </div>
    </div>

    <div className="form-group mb-3">
      <label htmlFor="wd-access-code" className="form-label"><b>Access Code</b></label>
      <input
        id="wd-access-code"
        className="form-control"
        type="text"
        placeholder="Enter access code"
        value={accessCode}
        onChange={(e) => setAccessCode(e.target.value)}
      />
    </div>

    <div className="form-group mb-3">
      <label className="form-label"><b>Assign</b></label>
      <div className="card p-3">
        <div className="form-group mb-2">
          <label htmlFor="wd-assign-to"><b>Assign to</b></label>
          <input
            id="wd-assign-to"
            className="form-control"
            value="Everyone"
            readOnly
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="wd-due-date"><b>Due</b></label>
          <input
            id="wd-due-date"
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="row">
          <div className="form-group col mb-2">
            <label htmlFor="wd-available-from"><b>Available From</b></label>
            <input
              id="wd-available-from"
              type="date"
              className="form-control"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
          </div>
          <div className="form-group col mb-2">
            <label htmlFor="wd-available-until"><b>Until</b></label>
            <input
              id="wd-available-until"
              type="date"
              className="form-control"
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>

    <hr />
    <button
      className="btn btn-secondary float-end me-2"
      onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
    >
      Cancel
    </button>
    <button className="btn btn-danger float-end" onClick={() => saveQuiz()}>
      Save
    </button>
  </div>
);


const renderQuestionsTab = () => {
  // console.log("renderQuestionsTab is called");

return (
  <div>
    <button 
      className="btn btn-success mb-3"
      onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/new`)}
    >
      New Question
    </button>

    <Questions />

    <hr />
    <button className="btn btn-secondary float-end me-1" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}>
      Cancel
    </button>
    <button className="btn btn-danger float-end" onClick={() => saveQuiz()}>
      Save
    </button>
  </div>
);
};

  return (
    <div id="wd-quizzes-editor">
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <span className="fw-bold">Points: {totalPoints}</span>
        </div>
        <div className="d-flex align-items-center">
          <span className={`me-2 ${isPublished ? "text-success" : "text-muted"}`}>
            {isPublished ? (
              <>
                <BsCheckCircle className="me-1" /> Published
              </>
            ) : (
              <>
                <BsXCircle className="me-1" /> Not Published
              </>
            )}
          </span>
          <button className="btn btn-secondary float-end me-2">
            <BsThreeDotsVertical /></button>
        </div>
      </div><hr />

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a 
            className={`nav-link ${activeTab === "details" ? "active" : ""}`} 
            onClick={() => setActiveTab("details")}
          >
            Details
          </a>
        </li>
        <li className="nav-item">
          <a 
            className={`nav-link ${activeTab === "questions" ? "active" : ""}`} 
            onClick={() => setActiveTab("questions")}
          >
            Questions
          </a>
        </li>
      </ul>

      <div className="tab-content mt-3">
        {activeTab === "details" ? renderDetailsTab() : renderQuestionsTab()}
      </div>
    </div>
  );
}
