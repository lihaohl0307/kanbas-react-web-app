import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./QuizPreview.css";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";

export default function QuizPreview() {
    const { cid, qid } = useParams(); // cid = Course ID, qid = Quiz ID
    const [questions, setQuestions] = useState<any[]>([]);
    const [userAnswers, setUserAnswers] = useState<{ [key: string]: any }>({});
    const [attempts, setAttempts] = useState<any[]>([]);
    const [selectedAttempt, setSelectedAttempt] = useState<any | null>(null);
    const [score, setScore] = useState<number | null>(null);

    // Get the current user from the Redux store
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const userId = currentUser?._id;

    // Get the current quiz using useSelector
    const quiz = useSelector((state: any) => 
        state.quizzesReducer.quizzes.find((quiz: any) => quiz._id === qid)
    );

    const COURSES_API = process.env.REACT_APP_REMOTE_SERVER + "/api/courses";
    const USERS_API = process.env.REACT_APP_REMOTE_SERVER + "/api/users";

    // Directly defined findQuestionsForQuiz function
    const findQuestionsForQuiz = async (courseId: string, quizId: string) => {
        const response = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions`);
        return response.data;
    };

    const findUserAttempts = async (userId: string, quizId: string): Promise<any[]> => {
        const response = await axios.get(`${USERS_API}/${userId}/quiz-attempts`);
        
        let data = response.data.quizAttempts;
        if (!Array.isArray(data)) {
            data = Object.values(data);
        }

        return data.filter((attempt: any) => attempt.quizId === quizId);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (userId && qid) {
                try {
                    const fetchedQuestions = await findQuestionsForQuiz(cid as string, qid as string);
                    setQuestions(fetchedQuestions);

                    const fetchedAttempts = await findUserAttempts(userId, qid);

                    console.log(fetchedAttempts);

                    setAttempts(fetchedAttempts);
                } catch (error: any) {
                    console.error("Error fetching data:", error);
                }
            } else {
                console.error("User ID or Quiz ID is missing.");
            }
        };

        fetchData();
    }, [qid, userId]);

    const handleAnswerChange = (questionId: string, answer: any) => {
        setUserAnswers({
            ...userAnswers,
            [questionId]: answer,
        });
    };

    const submitQuiz = async () => {
        const totalScore = questions.reduce((sum, question) => {
            const correctAnswer = question.correctOption;
            const userAnswer = userAnswers[question._id];
            return sum + (correctAnswer === userAnswer ? question.points : 0);
        }, 0);

        setScore(totalScore);

        if (currentUser.role === "STUDENT") {
            const attempt = {
                quizId: qid!,
                userId: userId!,
                answers: userAnswers,
                score: totalScore,
            };

            await axios.post(`${USERS_API}/${userId}/quiz-attempts`, attempt);
            setAttempts([...attempts, attempt]); // Update attempts with the new one
        }
    };

    const renderQuestion = (question: any, index: number) => {
        const userAnswer = userAnswers[question._id];
        const isCorrect = userAnswer === question.correctOption;

        return (
            <div key={question._id} className="quiz-question">
                <div className="question-header">
                    <h5>
                        Question {index + 1} 
                    </h5>
                    <span>{question.points} pts</span>
                </div>
                <div className="question-body">
                    <p>{question.question}</p>

                    {question.type === "Multiple Choice" && (
                        <div className="question-options">
                            {question.options.map((option: string, i: number) => (
                                <div key={i} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`question-${question._id}`}
                                        id={`option-${i}`}
                                        onChange={() => handleAnswerChange(question._id, i)}
                                    />
                                    <label className="form-check-label" htmlFor={`option-${i}`}>
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}

                    {question.type === "True/False" && (
                        <div className="question-options">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name={`question-${question._id}`}
                                    id={`true`}
                                    onChange={() => handleAnswerChange(question._id, "True")}
                                />
                                <label className="form-check-label" htmlFor={`true`}>
                                    True
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name={`question-${question._id}`}
                                    id={`false`}
                                    onChange={() => handleAnswerChange(question._id, "False")}
                                />
                                <label className="form-check-label" htmlFor={`false`}>
                                    False
                                </label>
                            </div>
                        </div>
                    )}

                    {question.type === "Fill in the Blanks" && (
                        <div className="question-options">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your answer"
                                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (selectedAttempt) {
        return (
            <div className="quiz-preview-container">
                <h2>Quiz Attempt Review</h2>
                <p>Score: {selectedAttempt.score}</p>
                {questions.map((question, index) => {
                    const isCorrect = selectedAttempt.answers[question._id] === question.correctOption;
                    const highlightClass = isCorrect ? "correct-answer" : "incorrect-answer";
    
                    return (
                        <div key={question._id} className={`quiz-question ${highlightClass}`}>
                            <h5>Question {index + 1}</h5>
                            <p>{question.question}</p>
                            {isCorrect ? (
                                <span className="text-success"><strong>✔ Correct</strong></span>
                            ) : (
                                <span className="text-danger"><strong>✘ Incorrect</strong></span>
                            )}
                            <p><strong>Your Answer:</strong> {selectedAttempt.answers[question._id]}</p>
                            <p><strong>Correct Answer:</strong> {question.options[question.correctOption ?? -1]}</p>
                            <p>{question.points} pts</p>
                            
                        </div>
                    );
                })}
                <button onClick={() => setSelectedAttempt(null)}>Back to Attempts</button>
            </div>
        );
    }
    

    if (!questions || questions.length === 0) {
        return <div>No questions found for this quiz.</div>;
    }

    const remainingAttempts = attempts.length < quiz?.multipleAttempts;
    const canSeeCorrectAnswers = attempts.length > 0 && (!remainingAttempts || quiz.showCorrectAnswers);

    return (
        <div className="quiz-preview-container">
            <div className="quiz-header">
                <h2>Quiz Preview</h2>
                {currentUser.role !== "STUDENT" && (
                    <p className="bg-danger"><i>This is a preview of the published version of the quiz</i></p>
                )}
                <p>Started: {new Date().toLocaleString()}</p>
            </div>

            {attempts.length > 0 && (
                <div className="previous-attempts">
                    <h3>Previous Attempts</h3>
                    {attempts.map((attempt, index) => (
                        <div key={index} className="attempt-summary">
                            <p>Attempt {index + 1} - Score: {attempt.score}</p>
                            <button onClick={() => setSelectedAttempt(attempt)}>View Attempt</button>
                        </div>
                    ))}
                </div>
            )}<br />

            {remainingAttempts ? (
                questions.map((question, index) => renderQuestion(question, index))
            ) : (
                <p>You have exhausted your attempts for this quiz.</p>
            )}

            {remainingAttempts && (
                <button onClick={submitQuiz}>Submit Quiz</button>
            )}

            {score !== null && (
                <div className="quiz-score">
                    <h3>Your Score: {score}</h3>
                    {canSeeCorrectAnswers && (
                        <div>
                            <h4>Correct Answers:</h4>
                            {questions.map((question, index) => (
                                <div key={question._id} className="quiz-question">
                                    <p>Question {index + 1}: {question.question}</p>
                                    <p><strong>Correct Answer:</strong> {question.options[question.correctOption ?? -1]}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
