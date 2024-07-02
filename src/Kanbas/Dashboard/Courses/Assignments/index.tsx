import { BsGripVertical, BsPlus, BsTrash } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import ModulesControlButtons from "../Modules/ModuleControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import { GiNotebook } from "react-icons/gi";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { TbNotebook } from "react-icons/tb";
import { MdCheckCircle } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
// import { assignments } from "../../../Database";
import { Link } from "react-router-dom";
import Editor from "./AssignmentEditor";
import AssignmentEditor from "./AssignmentEditor";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);

  const handleDelete = (assignmentId: string) => {
    setSelectedAssignmentId(assignmentId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedAssignmentId) {
      dispatch(deleteAssignment(selectedAssignmentId));
    }
    setShowDeleteDialog(false);
    setSelectedAssignmentId(null);
  };
  return (
      <div id="wd-assignments">
        <div className="d-flex flex-row">
          <div className="input-group" style={{ width: '300px' }}>
            <span className="input-group-text bg-white border-end-0">
                <FaSearch />
            </span>
            <input
                id="wd-search-assignment"
                placeholder="Search for Assignments"
                className="form-control border-start-0 fs-5"
            />
          </div>
          <div className="ms-auto">
          {/* "margin-start: auto." It is used to push elements to the far end (right) of a flex container by applying automatic left margin */}
            <button id="wd-add-assignment-group" className="btn btn-lg btn-light text-nowrap me-2">
              + Group</button>
            <button 
              id="wd-add-assignment" 
              className="btn btn-lg btn-danger text-nowrap"
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments/new`)}
            >
              + Assignment
              </button>
          </div>
        </div>
        <br /><br />
        <div id="wd-assignment">
          <ul id="wd-assignment" className="list-group rounded-0">
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary fw-bold">
                    <BsGripVertical className="me-2 fs-3" />
                      ASSIGNMENTS
                    <div className="float-end">
                      <button className="btn btn-light">
                        40% of Total
                      </button>
                      <BsPlus className="fs-2"/>
                      <IoEllipsisVertical className="fs-4"/>
                    </div>
                </div>
              <ul id="wd-assignment-list" className="list-group rounded-0 border-5 border-start border-success">
                {assignments && 
                  assignments.
                    filter((assignment: any) => cid === assignment.course)
                    .map((assignment: any) => (
                      <li className="wd-assignment-list-item list-group-item p-3 d-flex align-items-center">
                        <BsGripVertical className="me-3 fs-4" style={{flexShrink: "0"}}/>
                        <TbNotebook className="me-3 fs-2" style={{ color: 'green', flexShrink: "0"}} />
                        <div className="flex-grow-1">
                            <Link 
                              to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} 
                              className="wd-assignment-link fw-bold text-black" >
                              {assignment._id}: {assignment.title}
                            </Link>
                            <div className="fs-6">
                                <span className="text-danger me-1">Multiple Modules</span>
                                <span>| <b>Not available until</b> {assignment.availableFrom} | <b>Due</b> {assignment.dueDate} | {assignment.points} pts</span>
                            </div>
                        </div>
                        <MdCheckCircle className="fs-4 text-success me-2" style={{flexShrink: "0"}} />
                        <IoEllipsisVertical className="fs-4" style={{flexShrink: "0"}}/>
                        <BsTrash
                        className="fs-4 text-danger ms-3"
                        data-bs-toggle="modal" data-bs-target="#wd-delete-assignment-dialog"
                        style={{ cursor: 'pointer', flexShrink: '0' }}
                        onClick={() => handleDelete(assignment._id)}
                      />
                      </li>
                    )
                )}
              </ul>
            </li>
          </ul>
        </div>
        {/* Delete Dialog */}
        <div id = "wd-delete-assignment-dialog" className="modal fade"
          data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fs-5" id="deleteAssignmentLabel">Delete Assignment</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>              
              </div>
              <div className="modal-body">
                Are you sure you want to delete this assignment?
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

