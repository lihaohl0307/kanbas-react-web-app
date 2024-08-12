import { BsGripVertical, BsPlus, BsTrash } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { TbNotebook } from "react-icons/tb";
import { MdCheckCircle } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteQuestion, setQuestions } from "./reducer"; // Assuming questionReducer is correctly set up
import * as client from "./client"; // Assuming these client functions are defined

export default function Questions() {
  const { cid, qid } = useParams();
  const { questions } = useSelector((state: any) => state.questionsReducer);

//   console.log("Questions State:", questions);  // Add this to see the value of questions

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
        const questions = await client.findQuestionsForQuiz(cid as string, qid as string);
        console.log("28")
        console.log(questions)

        dispatch(setQuestions(questions));
        
        console.log("30")
        console.log(questions)

    };

    console.log("Questions State 0 :", questions);
    fetchQuestions();
    console.log("Questions State 1 :", questions);
  }, [qid, dispatch]);

  const handleDelete = (questionId: string) => {
    setSelectedQuestionId(questionId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedQuestionId) {
      removeQuestion(selectedQuestionId);
    }
    setShowDeleteDialog(false);
    setSelectedQuestionId(null);
  };

  // Send delete request to server
  const removeQuestion = async (questionId: string) => {
    await client.deleteQuestion(questionId);
    dispatch(deleteQuestion(questionId));
  };
  
  return (
      <div id="wd-questions">
        <br />
        <div id="wd-question">
          <ul id="wd-question" className="list-group rounded-0">
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary fw-bold">
                    <BsGripVertical className="me-2 fs-3" />
                      QUESTIONS
                    <div className="float-end">
                      <BsPlus className="fs-2"/>
                      <IoEllipsisVertical className="fs-4"/>
                    </div>
                </div>
              <ul id="wd-question-list" className="list-group rounded-0 border-5 border-start border-success">
                {questions && 
                  questions.
                    filter((question: any) => qid === question.quizId)
                    .map((question: any) => (
                      <li className="wd-question-list-item list-group-item p-3 d-flex align-items-center">
                        <BsGripVertical className="me-3 fs-4" style={{flexShrink: "0"}}/>
                        <TbNotebook className="me-3 fs-2" style={{ color: 'green', flexShrink: "0"}} />
                        <div className="flex-grow-1">
                            <Link 
                              to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/${question._id}`} 
                              className="wd-question-link fw-bold text-black" >
                              {question._id}: {question.title}
                            </Link>
                            <div className="fs-6">
                                <span className="text-danger me-1">Type: {question.type}</span>
                                <span>| {question.points} pts</span><br />
                                <span> <b>Description: </b> {question.description}</span>
                            </div>
                        </div>
                        <MdCheckCircle className="fs-4 text-success me-2" style={{flexShrink: "0"}} />
                        <IoEllipsisVertical className="fs-4" style={{flexShrink: "0"}}/>
                        <BsTrash
                        className="fs-4 text-danger ms-3"
                        data-bs-toggle="modal" data-bs-target="#wd-delete-question-dialog"
                        style={{ cursor: 'pointer', flexShrink: '0' }}
                        onClick={() => handleDelete(question._id)}
                      />
                      </li>
                    )
                )}
              </ul>
            </li>
          </ul>
        </div>
        {/* Delete Dialog */}
        <div id="wd-delete-question-dialog" className="modal fade"
          data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fs-5" id="deleteQuestionLabel">Delete Question</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>              
              </div>
              <div className="modal-body">
                Are you sure you want to delete this question?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                  onClick={() => setShowDeleteDialog(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                  onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
);}
