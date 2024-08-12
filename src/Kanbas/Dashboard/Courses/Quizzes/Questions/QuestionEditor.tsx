import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles
import { addQuestion, updateQuestion } from "./reducer";
import * as client from "./client";

export default function QuestionEditor() {
    const { cid, qid, qsid } = useParams(); // cid = Course ID, qid = Quiz ID, qsid = Question ID
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { questions } = useSelector((state: any) => state.questionsReducer);
    
    // Find the existing question in the questions state
    const existingQuestion = questions?.find((question: any) => question._id === qsid) ?? null;

    // Local state for the question being edited or created
    const [title, setTitle] = useState(existingQuestion?.title || "");
    const [questionType, setQuestionType] = useState(existingQuestion?.type || "Multiple Choice");
    const [questionText, setQuestionText] = useState(existingQuestion?.questionText || "");
    const [options, setOptions] = useState(existingQuestion?.options || ["", "", "", ""]);
    const [correctOption, setCorrectOption] = useState(existingQuestion?.correctOption || 0);
    const [points, setPoints] = useState(existingQuestion?.points || 0);
    const [fillInBlankAnswers, setFillInBlankAnswers] = useState(existingQuestion?.options || [""]);

    useEffect(() => {
        if (!existingQuestion && qsid) {
            const fetchQuestion = async () => {
                const questionData = await client.findQuestionForQuiz(cid as string, qid as string, qsid as string);
                if (questionData) {
                    setTitle(questionData.title);
                    setQuestionType(questionData.type);
                    setQuestionText(questionData.questionText);
                    setOptions(questionData.options);
                    setPoints(questionData.points);
                    setCorrectOption(questionData.correctOption);
                    setFillInBlankAnswers(questionData.options);
                }
            };
            fetchQuestion();
        }
    }, [existingQuestion, cid, qid, qsid]);

    const saveQuestion = async () => {
        const question = {
            title,
            type: questionType,
            questionText,
            options: questionType === "Fill in the Blanks" ? fillInBlankAnswers : options,
            correctOption,
            points,
        };

        if (existingQuestion) {
            await client.updateQuestion(cid as string, qid as string, { ...question, _id: existingQuestion._id });
            dispatch(updateQuestion({ quizId: qid, updatedQuestion: { ...question, _id: existingQuestion._id } }));
        } else {
            const newQuestion = await client.createQuestion(cid as string, qid as string, question);
            dispatch(addQuestion({ quizId: qid, question: newQuestion }));
        }

        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
    };

    const handleOptionChange = (index: number, value: string) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const handleFillInBlankChange = (index: number, value: string) => {
        const updatedAnswers = [...fillInBlankAnswers];
        updatedAnswers[index] = value;
        setFillInBlankAnswers(updatedAnswers);
    };

    const addNewOption = () => {
        setOptions([...options, ""]);
    };

    const removeOption = (index: number) => {
        setOptions(options.filter((_: any, i: any) => i !== index));
    };

    const addNewBlankAnswer = () => {
        setFillInBlankAnswers([...fillInBlankAnswers, ""]);
    };

    const removeBlankAnswer = (index: number) => {
        setFillInBlankAnswers(fillInBlankAnswers.filter((_: any, i: any) => i !== index));
    };

    return (
        <div id="wd-questions-editor">
            <div className="form-group mb-3">
                <label htmlFor="wd-title" className="form-label"><b>Question Title</b></label>
                <input 
                    id="wd-title" 
                    className="form-control" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="wd-question-type" className="form-label"><b>Question Type</b></label>
                <select 
                    id="wd-question-type" 
                    className="form-select" 
                    value={questionType} 
                    onChange={(e) => setQuestionType(e.target.value)}
                >
                    <option value="Multiple Choice">Multiple Choice</option>
                    <option value="True/False">True/False</option>
                    <option value="Fill in the Blanks">Fill in the Blanks</option>
                </select>
            </div>

            <div className="form-group mb-3">
                <label className="form-label"><b>Question</b></label>
                <ReactQuill theme="snow" value={questionText} onChange={setQuestionText} />
            </div>

            {questionType === "Multiple Choice" && (
                <div>
                    {options.map((option: any, index: any) => (
                        <div className="input-group mb-2" key={index}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                            <input
                                type="radio"
                                name="correctOption"
                                className="form-check-input"
                                checked={correctOption === index}
                                onChange={() => setCorrectOption(index)}
                            />
                            <button className="btn btn-secondary float-end me-1" onClick={() => removeOption(index)}>Remove</button>
                        </div>
                    ))}
                    <button className="btn btn-secondary float-end me-1" 
                        onClick={addNewOption}>Add Option</button>
                </div>
            )}

            {questionType === "True/False" && (
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="trueFalse"
                        id="true"
                        value="True"
                        onChange={() => setOptions(["True"])}
                        checked={options.includes("True")}
                    />
                    <label className="form-check-label" htmlFor="true">True</label>
                    <br />
                    <input
                        className="form-check-input"
                        type="radio"
                        name="trueFalse"
                        id="false"
                        value="False"
                        onChange={() => setOptions(["False"])}
                        checked={options.includes("False")}
                    />
                    <label className="form-check-label" htmlFor="false">False</label>
                </div>
            )}

            {questionType === "Fill in the Blanks" && (
                <div>
                    {fillInBlankAnswers.map((answer: any, index: any) => (
                        <div className="input-group mb-2" key={index}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={`Answer ${index + 1}`}
                                value={answer}
                                onChange={(e) => handleFillInBlankChange(index, e.target.value)}
                            />
                            <button type="button" onClick={() => removeBlankAnswer(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addNewBlankAnswer}>Add Answer</button>
                </div>
            )}

            <div className="form-group row mb-3">
                <label htmlFor="wd-points" className="col-form-label col-4" style={{textAlign: 'right'}}>Points</label>
                <div className="col-8">
                    <input 
                        id="wd-points"
                        className="form-control"
                        type="number"
                        value={points}
                        onChange={(e) => setPoints(Number(e.target.value))}
                    />
                </div>
            </div>

            <br />
            <hr />
            <button className="btn btn-danger float-end" onClick={saveQuestion}>
                Save
            </button>
            <button className="btn btn-secondary float-end me-1" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)}>
                Cancel
            </button>
        </div>
    );
}
