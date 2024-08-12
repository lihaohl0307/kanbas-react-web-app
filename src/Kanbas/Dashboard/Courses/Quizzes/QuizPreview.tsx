import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./QuizPreview.css";  // Assuming you have created a CSS file for styling

export default function QuizPreview() {
    const { cid, qid } = useParams(); // cid = Course ID, qid = Quiz ID
    const [questions, setQuestions] = useState([]);

    const COURSES_API = process.env.REACT_APP_REMOTE_SERVER + "/api/courses";

    // Directly defined findQuestionsForQuiz function
    const findQuestionsForQuiz = async (courseId: string, quizId: string) => {
        const response = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions`);
        return response.data;
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const fetchedQuestions = await findQuestionsForQuiz(cid as string, qid as string);
                setQuestions(fetchedQuestions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, [cid, qid]);

    if (!questions || questions.length === 0) {
        return <div>No questions found for this quiz.</div>;
    }

    return (
        <div className="quiz-preview-container">
            <div className="quiz-header">
                <h2>Quiz Preview</h2>
                <p><i>This is a preview of the published version of the quiz</i></p>
                <p>Started: {new Date().toLocaleString()}</p>
            </div>

            {questions.map((question: any, index: number) => (
                <div key={question._id} className="quiz-question">
                    <div className="question-header">
                        <h5>Question {index + 1}</h5>
                        <span>{question.points} pts</span>
                    </div>
                    <div className="question-body">
                        {question.question && (
                            <p>{question.question}</p>  // Render question content if it exists
                        )}

                        <p>{question.title}</p>

                        {question.type === "Multiple Choice" && (
                            <div className="question-options">
                                {question.options.map((option: string, i: number) => (
                                    <div key={i} className="form-check">
                                        <input className="form-check-input" type="radio" name={`question-${question._id}`} id={`option-${i}`} />
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
                                    <input className="form-check-input" type="radio" name={`question-${question._id}`} id={`true`} />
                                    <label className="form-check-label" htmlFor={`true`}>
                                        True
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name={`question-${question._id}`} id={`false`} />
                                    <label className="form-check-label" htmlFor={`false`}>
                                        False
                                    </label>
                                </div>
                            </div>
                        )}

                        {question.type === "Fill in the Blanks" && (
                            <div className="question-options">
                                <input type="text" className="form-control" placeholder="Enter your answer" />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
