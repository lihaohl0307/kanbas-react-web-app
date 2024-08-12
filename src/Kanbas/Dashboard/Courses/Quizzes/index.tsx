import { BsGripVertical, BsPlus, BsTrash } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import ModulesControlButtons from "../Modules/ModuleControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import { GiNotebook } from "react-icons/gi";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { TbNotebook } from "react-icons/tb";
import { MdCheckCircle } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Editor from "./QuizEditor";
import QuizEditor from "./QuizEditor";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteQuiz, setQuizzes } from "./reducer";
import * as client from "./client";

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(quizzes)

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    fetchQuizzes();
    console.log("35")
    console.log(quizzes)
  }, [cid, dispatch]);

  const handleDelete = (quizId: string) => {
    setSelectedQuizId(quizId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedQuizId) {
      removeQuiz(selectedQuizId);
    }
    setShowDeleteDialog(false);
    setSelectedQuizId(null);
  };

  // send delete request to server
  const removeQuiz = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };
  
  console.log("quiz 58")
  console.log(quizzes)

  return (
      <div id="wd-quizzes">
        <div className="d-flex flex-row">
          <div className="input-group" style={{ width: '300px' }}>
            <span className="input-group-text bg-white border-end-0">
                <FaSearch />
            </span>
            <input
                id="wd-search-quiz"
                placeholder="Search for Quizzes"
                className="form-control border-start-0 fs-5"
            />
          </div>
          <div className="ms-auto">
            <button id="wd-add-quiz-group" className="btn btn-lg btn-light text-nowrap me-2">
              + Group</button>
            <button 
              id="wd-add-quiz" 
              className="btn btn-lg btn-danger text-nowrap"
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/new`)}
            >
              + Quiz
            </button>
          </div>
        </div>
        <br /><br />
        <div id="wd-quizzes">
          <ul id="wd-quizzes" className="list-group rounded-0">
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary fw-bold">
                <BsGripVertical className="me-2 fs-3" />
                QUIZZES
                <div className="float-end">
                  <button className="btn btn-light">
                    40% of Total
                  </button>
                  <BsPlus className="fs-2"/>
                  <IoEllipsisVertical className="fs-4"/>
                </div>
              </div>
              <ul id="wd-quiz-list" className="list-group rounded-0 border-5 border-start border-success">
                {quizzes && 
                  quizzes.
                    filter((quiz: any) => cid === quiz.course)
                    .map((quiz: any) => (
                      <li className="wd-quiz-list-item list-group-item p-3 d-flex align-items-center">
                        <BsGripVertical className="me-3 fs-4" style={{flexShrink: "0"}}/>
                        <TbNotebook className="me-3 fs-2" style={{ color: 'green', flexShrink: "0"}} />
                        <div className="flex-grow-1">
                          <Link 
                            to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/details`} 
                            className="wd-quiz-link fw-bold text-black" >
                            {quiz._id}: {quiz.title}
                          </Link>
                          <div className="fs-6">
                            <span className="text-danger me-1">Multiple Modules</span>
                            <span>| <b>Not available until</b> {quiz.availableFrom} | <b>Due</b> {quiz.dueDate} | {quiz.points} pts</span><br />
                            <span> <b>Description: </b> {quiz.description}</span>
                          </div>
                        </div>
                        <MdCheckCircle className="fs-4 text-success me-2" style={{flexShrink: "0"}} />
                        <IoEllipsisVertical className="fs-4" style={{flexShrink: "0"}}/>
                        <BsTrash
                        className="fs-4 text-danger ms-3"
                        data-bs-toggle="modal" data-bs-target="#wd-delete-quiz-dialog"
                        style={{ cursor: 'pointer', flexShrink: '0' }}
                        onClick={() => handleDelete(quiz._id)}
                      />
                      </li>
                    )
                )}
              </ul>
            </li>
          </ul>
        </div>
        {/* Delete Dialog */}
        <div id = "wd-delete-quiz-dialog" className="modal fade"
          data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fs-5" id="deleteQuizLabel">Delete Quiz</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>              
              </div>
              <div className="modal-body">
                Are you sure you want to delete this quiz?
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
);
}
