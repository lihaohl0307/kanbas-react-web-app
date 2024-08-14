import { BsCheckCircle, BsGripVertical, BsXCircle } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { TbNotebook } from "react-icons/tb";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteQuiz, setQuizzes, updateQuiz } from "./reducer";
import * as client from "./client";

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzes = await client.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(quizzes));
    };
    fetchQuizzes();
  }, [cid, dispatch]);

  const handleDelete = (quizId: string) => {
    setSelectedQuizId(quizId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedQuizId) {
      await client.deleteQuiz(selectedQuizId);
      dispatch(deleteQuiz(selectedQuizId));
      setShowDeleteDialog(false);
    }
  };

  const togglePublish = async (quiz: any) => {
    const updatedQuiz = { ...quiz, isPublished: !quiz.isPublished };
    await client.updateQuiz(cid as string, updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
  };

  const getQuizAvailability = (quiz: any) => {
    const currentDate = new Date();
    const availableFrom = new Date(quiz.availableFrom);
    const availableUntil = new Date(quiz.availableUntil);

    if (currentDate < availableFrom) {
      return `Not available until ${availableFrom.toLocaleDateString()}`;
    } else if (currentDate >= availableFrom && currentDate <= availableUntil) {
      return "Available";
    } else {
      return "Closed";
    }
  };

  const stripHtmlTags = (html: string) => {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  };
  

  // const getQuizPoints = (quiz: any) => {
  //   const totalPoints = quiz.questions?.reduce((sum: number, question: any) => sum + question.points, 0) || 0;
  //   return totalPoints;
  // };

  // console.log("67")
  // console.log(quizzes)

  const isStudent = currentUser?.role === "STUDENT"; // Check if the current user is a student
  // console.log(currentUser)
  // console.log(isStudent)

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
        {!isStudent && (
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
        )}
      </div>
      <br /><br />
      <div id="wd-quizzes">
        <ul id="wd-quizzes" className="list-group rounded-0">
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary fw-bold">
              <BsGripVertical className="me-2 fs-3" />
              QUIZZES
            </div>
            <ul id="wd-quiz-list" className="list-group rounded-0 border-5 border-start border-success">
              {quizzes && 
                quizzes
                  .filter((quiz: any) => cid === quiz.course && (!isStudent || quiz.isPublished))
                  .map((quiz: any) => (
                    <li className="wd-quiz-list-item list-group-item p-3 d-flex align-items-center" key={quiz._id}>
                      <BsGripVertical className="me-3 fs-4" style={{flexShrink: "0"}}/>
                      <TbNotebook className="me-3 fs-2" style={{ color: quiz.isPublished ? 'green' : 'red', flexShrink: "0"}} />
                      <div className="flex-grow-1">
                        <Link 
                          to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/details`} 
                          className="wd-quiz-link fw-bold text-black" >
                          {quiz._id} : {quiz.title}
                        </Link>
                        <div className="fs-6">
                          <span className={quiz.isPublished ? "text-success" : "text-danger"}>
                            {quiz.isPublished ? (
                              <>
                                <BsCheckCircle /> Published
                              </>
                            ) : (
                              <>
                                <BsXCircle /> Unpublished
                              </>
                            )}
                          </span>
                          <span> | <b>{getQuizAvailability(quiz)}</b> | Due {new Date(quiz.dueDate).toLocaleDateString()} | {quiz.points} pts</span><br />
                          <span> <b>Description: </b>   
                            {stripHtmlTags(quiz.description)}
                          </span>
                        </div>
                      </div>
                      {!isStudent && (
                      <div className="dropdown">
                        <IoEllipsisVertical className="fs-4 dropdown-toggle" style={{cursor: 'pointer'}} data-bs-toggle="dropdown" />
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li><a className="dropdown-item" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/details`)}>Edit</a></li>
                          <li><a className="dropdown-item" onClick={() => handleDelete(quiz._id)} data-bs-toggle="modal" data-bs-target="#wd-delete-quiz-dialog">Delete</a></li>
                          <li><a className="dropdown-item" onClick={() => togglePublish(quiz)}>
                            {quiz.isPublished ? "Unpublish" : "Publish"}
                          </a></li>
                        </ul>
                      </div>
                      )}
                    </li>
                  ))}
            </ul>
          </li>
        </ul>
      </div>
      {/* Delete Dialog */}
      <div id="wd-delete-quiz-dialog" className="modal fade"
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
              <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
